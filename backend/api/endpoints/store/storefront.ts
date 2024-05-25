import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IStorefront from '../../types/store/storefront';

class StorefrontEndpoint extends CachedEndpoint<IStorefront, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public puuid?: string;

    /**
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
        return `store/v2/storefront/${puuid}`;
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

    public refreshTimeoutDuration(data: IStorefront): number {
        let lowestDuration = 60 * 60;

        if (data.FeaturedBundle.Bundle.DurationRemainingInSeconds < lowestDuration) {
            lowestDuration = data.FeaturedBundle.Bundle.DurationRemainingInSeconds;
        }

        if (data.FeaturedBundle.BundleRemainingDurationInSeconds < lowestDuration) {
            lowestDuration = data.FeaturedBundle.BundleRemainingDurationInSeconds;
        }

        data.FeaturedBundle.Bundles.forEach(bundle => {
            if (bundle.DurationRemainingInSeconds < lowestDuration) {
                lowestDuration = bundle.DurationRemainingInSeconds;
            }
        });

        if (data.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds < lowestDuration) {
            lowestDuration = data.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds;
        }

        if (data.AccessoryStore.AccessoryStoreRemainingDurationInSeconds < lowestDuration) {
            lowestDuration = data.AccessoryStore.AccessoryStoreRemainingDurationInSeconds;
        }

        if (data.BonusStore && data.BonusStore.BonusStoreRemainingDurationInSeconds < lowestDuration) {
            lowestDuration = data.BonusStore.BonusStoreRemainingDurationInSeconds;
        }

        // If the time in UTC.nextMidnight - UTC.now() < lowestDuration, set lowestDuration to that time
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setUTCHours(24, 0, 0, 0);
        const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
        if (timeUntilMidnight < lowestDuration * 1000) {
            return timeUntilMidnight;
        }

        return lowestDuration * 1000; // * 1000 to convert to milliseconds
    }
}

export default StorefrontEndpoint;
