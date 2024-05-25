import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import INameService from '../../types/pvp/name-service';

class NameServiceEndpoint extends CachedEndpoint<INameService[], EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public names: string[];

    public constructor(user: IUser, names: string[]) {
        super();

        this.user = user;
        this.names = names;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        return 'name-service/v2/players';
    }

    public method(): Method {
        return Method.PUT;
    }

    public headers(): Headers | undefined {
        return new Headers({
            'X-Riot-Entitlements-JWT': `${this.user.authData.entitlementsToken}`,
            Authorization: `Bearer ${this.user.authData.idToken}`,
        });
    }

    public body(): Uint8Array | undefined {
        return new TextEncoder().encode(JSON.stringify(this.names));
    }

    public refreshTimeoutDuration(_data: INameService[]): number {
        return 0;
    }
}

export default NameServiceEndpoint;
