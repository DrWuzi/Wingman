import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IAccountXP from '../../types/pvp/account-xp';

class AccountXPEndpoint extends CachedEndpoint<IAccountXP, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public puuid?: string;

    /**
     * Constructor for WalletEndpoint
     * By default, the puuid is taken from the user's account info, but it can be overridden.
     * @param user
     * @param puuid PUUID of the user from whom to get the data.
     */
    public constructor(user: IUser, puuid?: string) {
        super();

        this.user = user;
        this.puuid = puuid;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        const puuid = this.puuid ?? this.user.accountInfo.sub;
        return `account-xp/v1/players/${puuid}`;
    }

    public method(): Method {
        return Method.GET;
    }

    public headers(): Headers | undefined {
        return new Headers({
            'X-Riot-Entitlements-JWT': this.user.authData.entitlementsToken,
            Authorization: `Bearer ${this.user.authData.accessToken}`,
        });
    }

    public refreshTimeoutDuration(_data: IAccountXP): number {
        return 1000 * 60 * 5;
    }
}

export default AccountXPEndpoint;
