import ValorantApiState from '../api-state';
import {IAccountInfo, IAccountXp, IAuthData, IOwnedItems, IStore, IUser, IWallet} from './user-types';
import base64 from 'react-native-base64';
import 'react-native-url-polyfill/auto';
import {ApiResult, ApiResultType, createApiResult} from '../api-result';
import {pvp_fetchAccountXp} from '../requests/api/pvp';
import {AxiosHeaders, AxiosResponse} from 'axios';
import {Shard} from '../requests/request-types';
import {store_fetchEntitlements, store_fetchFrontV2, store_fetchOffers, store_fetchWallet} from '../requests/api/store';
import {cookieReAuth} from '../requests/api/authentication';
import {exists, readFile, writeFile} from '../../utils/file-system/file-system';
import {logDebug, logInfo} from '../../utils/log-system/log-system';
import {Cookies} from '@react-native-cookies/cookies';
import ValorantClient from '../../api/clients/valorant-client';
import {IGameContent} from '../game-content-api/game-content-types';
import EntitlementEndpoint from '../../api/endpoints/authentication/entitlement';
import GameContentClient from '../../api/clients/game-content-client.ts';

export default class UserApi {
    private apiState: ValorantApiState;
    private gameContent?: IGameContent;

    private inactiveUsers: IUser[] = [];
    private activeUser: IUser | null = null;

    public constructor(apiState: ValorantApiState) {
        this.apiState = apiState;
    }

    public async init(gameContent: IGameContent): Promise<void> {
        await this.loadFromFile();

        this.gameContent = gameContent;
    }

    public getInactiveUsers(): IUser[] {
        return this.inactiveUsers;
    }

    public getInactiveUser(user: IUser): IUser | null {
        return this.inactiveUsers.find(u => u.accountInfo.sub === user.accountInfo.sub) || null;
    }

    public hasInactiveUser(user: IUser): boolean {
        return this.getInactiveUser(user) !== null;
    }

    public getActiveUser(): IUser | null {
        return this.activeUser;
    }

    public setActiveUserInactive() {
        const user = this.getActiveUser();
        if (user) {
            this.activeUser = null;
            this.addUser(user);
        }
    }

    /*
     * Set active user and move previous active user to inactive users list.
     */
    public setActiveUser(user: IUser): void {
        this.removeInactiveUser(user);

        if (this.activeUser) {
            this.addInactiveUser(this.activeUser);
        }

        this.activeUser = user;

        this.saveToFile().then();
    }

    public getAllUsers(): IUser[] {
        return this.inactiveUsers.concat(this.activeUser || []);
    }

    public isUserAuthenticated(user: IUser): boolean {
        // TODO: Send a request to the valorant api to check if the user is authenticated.
        return user.authData.cookies !== '';
    }

    public async reAuthenticateUser(user: IUser): Promise<ApiResult<null, ApiResultType>> {
        // TODO: Use all cookies instead of just ssid. (https://github.com/techchrism/riot-auth-test)
        let cookies = `ssid=${user.authData.ssid};`;
        let headers = new AxiosHeaders({Cookie: cookies});
        let result = await cookieReAuth(headers);

        if (result.type !== ApiResultType.SUCCESS || !result.value) {
            return createApiResult(
                null,
                ApiResultType.FAILURE,
                `Failed to re-authenticate user: ${result.errorMessage}`,
            );
        }

        // If successful, the response will be a redirect to the following url:
        // https://playvalorant.com/opt_in#access_token={access token}&scope=openid&iss=https%3A%2F%2Fauth.riotgames.com&id_token={id token}&token_type=Bearer&session_state={session state}&expires_in=3600
        // Otherwise, the response will be a redirect to the following url:
        // https://authenticate.riotgames.com/login?client_id=play-valorant-web-prod&nonce=1&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dplay-valorant-web-prod%26nonce%3D1%26redirect_uri%3Dhttps%253A%252F%252Fplayvalorant.com%252Fopt_in%26response_type%3Dtoken%2520id_token&response_type=token%20id_token&method=riot_identity

        let response: AxiosResponse<any, any> = result.value as AxiosResponse<any, any>;
        let redirectUrl: string = response.headers.location || '';

        if (!redirectUrl.includes('access_token=')) {
            return createApiResult(
                null,
                ApiResultType.FAILURE,
                'Failed to re-authenticate user: Invalid redirect url.',
            );
        }

        // TODO: Catch errors when parsing the tokens.
        let tokens = new URL(redirectUrl).hash.split('&');
        let accessToken = tokens[0].split('=')[1];
        let idToken = tokens[1].split('=')[1];
        let expiresAt = tokens[4].split('=')[1];

        // TODO: Figure out where to get the ssid from.
        //user.authData.ssid = '';
        user.authData.accessToken = accessToken;
        user.authData.idToken = idToken;
        user.authData.expiresAt = expiresAt;

        return createApiResult(null, ApiResultType.SUCCESS);
    }

    /*
     * Add user to inactive users list if it doesn't already exist.
     */
    public addUser(user: IUser): void {
        this.addInactiveUser(user);
    }

    /*
     * Remove user from inactive users list or active user.
     */
    public removeUser(user: IUser): void {
        if (this.activeUser && this.activeUser.accountInfo.sub === user.accountInfo.sub) {
            this.activeUser = null;
            this.saveToFile().then();
        } else {
            this.removeInactiveUser(user);
        }
    }

    public async createUser(redirectUrl: string, cookies: string): Promise<ApiResult<IUser | null, ApiResultType>> {
        const authDataResult = this.extractAuthDataFromRedirectUrl(redirectUrl);

        if (authDataResult.type !== ApiResultType.SUCCESS || authDataResult.value === null) {
            return createApiResult(null, ApiResultType.FAILURE, authDataResult.errorMessage);
        }

        const authData = authDataResult.value;
        const accessToken = authData.accessToken;
        const puuid = accessToken.split('.')[1];
        const idToken = authData.idToken.split('.')[1];

        let accessTokenInfo: any;
        let idTokenInfo: any;

        function sanitizeString(str: string) {
            return str.replace(/[^\x20-\x7E]/g, '');
        }

        try {
            accessTokenInfo = JSON.parse(sanitizeString(base64.decode(puuid)));
            idTokenInfo = JSON.parse(sanitizeString(base64.decode(idToken)));
        } catch (e) {
            return createApiResult(null, ApiResultType.FAILURE, `Failed to decode player data: ${e}`);
        }

        const accountInfo: IAccountInfo = {
            ...accessTokenInfo,
            ...idTokenInfo,
        };

        let entitlementsToken: string;
        if (this.gameContent) {
            const client = new ValorantClient(new GameContentClient());
            const entitlementsResult = await new EntitlementEndpoint(accessToken).query(client);
            if (entitlementsResult.isErr()) {
                return createApiResult(
                    null,
                    ApiResultType.FAILURE,
                    `Failed to get entitlement token: ${entitlementsResult.getErr()}`,
                );
            }
            entitlementsToken = entitlementsResult.unwrap().entitlements_token;
        }

        const user: IUser = {
            accountInfo: accountInfo,
            authData: {
                cookies: cookies,
                accessToken: accessToken,
                entitlementsToken: entitlementsToken!,
                idToken: authData.idToken,
                ssid: authData.ssid,
                expiresAt: authData.expiresAt,
            },
        };

        return createApiResult(user, ApiResultType.SUCCESS);
    }

    /*
     * Add user to inactive users list if it doesn't already exist.
     */
    private addInactiveUser(user: IUser): void {
        if (this.hasInactiveUser(user)) {
            return;
        }

        this.inactiveUsers.push(user);
        this.saveToFile().then();
    }

    /*
     * Remove user from inactive users list.
     */
    private removeInactiveUser(user: IUser): void {
        this.inactiveUsers = this.inactiveUsers.filter(u => u.accountInfo.sub !== user.accountInfo.sub);
        this.saveToFile().then();
    }

    private extractAuthDataFromRedirectUrl(redirectUrl: string): ApiResult<IAuthData | null, ApiResultType> {
        const urlObj = new URL(redirectUrl);
        const hashParams = new URLSearchParams(urlObj.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const idToken = hashParams.get('id_token');
        const expiresIn = hashParams.get('expires_in');

        if (!accessToken || !idToken || !expiresIn) {
            return createApiResult(null, ApiResultType.FAILURE, 'Invalid redirect url.');
        }

        return createApiResult(
            {
                accessToken: accessToken,
                idToken: idToken, // TODO: Parse id token and extract user data.
                ssid: '',
                expiresAt: expiresIn,
            } as IAuthData,
            ApiResultType.SUCCESS,
        );
    }

    private getUserDefaultHeaders(user: IUser): AxiosHeaders {
        //X-Riot-Entitlements-JWT: {entitlement token}
        //Authorization: Bearer {auth token}

        return new AxiosHeaders({
            'X-Riot-ClientPlatform':
                'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-08.08-shipping-2-2470575',
            'X-Riot-Entitlements-JWT': user.authData.entitlementsToken,
            Authorization: `Bearer ${user.authData.idToken}`,
        });
    }

    private async loadFromFile() {
        if (!(await exists('users.json'))) {
            await this.saveToFile();
            return;
        }

        let content = (await readFile('users.json')) as {
            users: IUser[];
            user: IUser | null;
        };

        this.inactiveUsers = content.users;
        this.activeUser = content.user;
    }

    private async saveToFile() {
        let content = {
            users: this.inactiveUsers,
            user: this.activeUser,
        };

        await writeFile('users.json', content);
    }
}
