import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IPreGameMatch from '../../types/pregame/pregame-match';

class PreGameMatchEndpoint extends CachedEndpoint<IPreGameMatch, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public pregameMatchId: string;

    public constructor(user: IUser, pregameMatchId: string) {
        super();

        this.user = user;
        this.pregameMatchId = pregameMatchId;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const region = this.user.accountInfo.pp.c;
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://glz-${region}-1.${shard}.a.pvp.net/`));
    }

    public endpoint(): string {
        return `pregame/v1/matches/${this.pregameMatchId}`;
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

    public refreshTimeoutDuration(_data: IPreGameMatch): number {
        return 1000 * 10;
    }
}

export default PreGameMatchEndpoint;
