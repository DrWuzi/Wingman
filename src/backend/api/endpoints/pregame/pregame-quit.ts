import {Endpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Headers, Method} from '../../http/http';
import {IUser} from '../../types/user';

class PreGameQuitEndpoint extends Endpoint<void, EnumError<ValorantClientError>, ValorantClient> {
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
        return `pregame/v1/matches/${this.pregameMatchId}/quit`;
    }

    public method(): Method {
        return Method.POST;
    }

    public headers(): Headers | undefined {
        return new Headers({
            'X-Riot-Entitlements-JWT': `${this.user.authData.entitlementsToken}`,
            Authorization: `Bearer ${this.user.authData.idToken}`,
        });
    }
}

export default PreGameQuitEndpoint;
