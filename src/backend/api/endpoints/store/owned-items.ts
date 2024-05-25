import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import {Method, Headers} from '../../http/http';
import Result from '../../result';
import {IUser} from '../../types/user';
import IOwnedItems, {ItemTypeID} from '../../types/store/owned-items';

class OwnedItemsEndpoint extends CachedEndpoint<IOwnedItems, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public itemTypeID: ItemTypeID;
    public puuid?: string;

    /**
     * By default, the puuid is taken from the user's account info, but it can be overridden.
     * @param user
     * @param itemTypeID
     * @param puuid PUUID of the user from whom to get the data.
     */
    public constructor(user: IUser, itemTypeID: ItemTypeID, puuid?: string) {
        super();

        this.user = user;
        this.itemTypeID = itemTypeID;
        this.puuid = puuid;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        const puuid = this.puuid ?? this.user.accountInfo.sub;
        return `store/v1/entitlements/${puuid}/${this.itemTypeID}`;
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

    public refreshTimeoutDuration(_data: IOwnedItems): number {
        return 1000 * 60 * 5;
    }
}

export default OwnedItemsEndpoint;
