import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import ILeaderboard from '../../types/pvp/leaderboard';

class LeaderboardEndpoint extends CachedEndpoint<ILeaderboard, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public sessionID: string;
    public startIndex: number;
    public size: number;
    public usernameQuery?: string;

    public constructor(
        user: IUser,
        sessionID: string,
        startIndex: number = 0,
        size: number = 510,
        usernameQuery?: string,
    ) {
        super();

        this.user = user;
        this.sessionID = sessionID;
        this.startIndex = startIndex;
        this.size = size;
        this.usernameQuery = usernameQuery;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        return `mmr/v1/leaderboards/affinity/na/queue/competitive/season/${this.sessionID}?startIndex=${
            this.startIndex
        }&size=${this.size}${this.usernameQuery ? `&query=${this.usernameQuery}` : ''}`;
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

    public refreshTimeoutDuration(_data: ILeaderboard): number {
        return 1000 * 60 * 5;
    }
}

export default LeaderboardEndpoint;
