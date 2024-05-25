import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Headers, Method} from '../../http/http';
import {IUser} from '../../types/user';
import IPartyPlayer from '../../types/party/party-player';

class PartyPlayerEndpoint extends CachedEndpoint<IPartyPlayer, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public puuid?: string;

    public constructor(user: IUser, puuid?: string) {
        super();

        this.user = user;
        this.puuid = puuid;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const region = this.user.accountInfo.pp.c;
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://glz-${region}-1.${shard}.a.pvp.net/`));
    }

    public endpoint(): string {
        const puuid = this.puuid ?? this.user.accountInfo.sub;
        return `parties/v1/players/${puuid}`;
    }

    public method(): Method {
        return Method.GET;
    }

    public headers(): Headers | undefined {
        return new Headers({
            'X-Riot-Entitlements-JWT': `${this.user.authData.entitlementsToken}`,
            Authorization: `Bearer ${this.user.authData.idToken}`,
        });
    }

    public refreshTimeoutDuration(_data: IPartyPlayer): number {
        return 1000 * 5;
    }
}

export default PartyPlayerEndpoint;
