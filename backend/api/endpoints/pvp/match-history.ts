import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IMatchHistory from '../../types/pvp/match-history';

class MatchHistoryEndpoint extends CachedEndpoint<IMatchHistory, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public startIndex: number;
    public endIndex: number;
    public queue?: string;
    public puuid?: string;

    /**
     * By default, the puuid is taken from the user's account info, but it can be overridden.
     * @param user
     * @param startIndex
     * @param endIndex
     * @param queue
     * @param puuid PUUID of the user from whom to get the data.
     */
    public constructor(user: IUser, startIndex: number = 0, endIndex: number = 20, queue?: string, puuid?: string) {
        super();

        this.user = user;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.queue = queue;
        this.puuid = puuid;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        const puuid = this.puuid ?? this.user.accountInfo.sub;
        return `match-history/v1/history/${puuid}?startIndex=${this.startIndex}&endIndex=${this.endIndex}${
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

    public refreshTimeoutDuration(_data: IMatchHistory): number {
        return 1000 * 60 * 5;
    }
}

export default MatchHistoryEndpoint;
