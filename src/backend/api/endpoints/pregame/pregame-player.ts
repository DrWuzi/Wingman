import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IPreGamePlayer from '../../types/pregame/pregame-player';

class PreGamePlayerEndpoint extends CachedEndpoint<IPreGamePlayer, EnumError<ValorantClientError>, ValorantClient> {
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
        return `pregame/v1/players/${puuid}`;
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

    public refreshTimeoutDuration(_data: IPreGamePlayer): number {
        return 1000 * 5;
    }
}

export default PreGamePlayerEndpoint;
