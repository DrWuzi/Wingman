import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import ICompetitiveUpdates from '../../types/pvp/competitive-updates';

class CompetitiveUpdatesEndpoint extends CachedEndpoint<
    ICompetitiveUpdates,
    EnumError<ValorantClientError>,
    ValorantClient
> {
    public user: IUser;
    public startIndex: number;
    public endIndex: number;
    public queue?: string;

    public constructor(user: IUser, startIndex: number = 0, endIndex: number = 10, queue?: string) {
        super();

        this.user = user;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.queue = queue;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        const puuid = this.user.accountInfo.sub;
        return `mmr/v1/players/${puuid}/competitiveupdates?startIndex=${this.startIndex}&endIndex=${this.endIndex}${
            this.queue ? `&queue=${this.queue}` : ''
        }`;
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

    public refreshTimeoutDuration(_data: ICompetitiveUpdates): number {
        return 1000 * 60 * 5;
    }
}

export default CompetitiveUpdatesEndpoint;
