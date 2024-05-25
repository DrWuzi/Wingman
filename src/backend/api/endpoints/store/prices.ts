import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IPrices from '../../types/store/prices';

class PricesEndpoint extends CachedEndpoint<IPrices, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;

    public constructor(user: IUser) {
        super();

        this.user = user;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        return 'store/v1/offers';
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

    public refreshTimeoutDuration(_data: IPrices): number {
        return 1000 * 60 * 60;
    }
}

export default PricesEndpoint;
