import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import {IUser} from '../../types/user';
import IMatchDetails from '../../types/pvp/match-details';

class MatchDetailsEndpoint extends CachedEndpoint<IMatchDetails, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public matchID: string;

    public constructor(user: IUser, matchID: string) {
        super();

        this.user = user;
        this.matchID = matchID;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://pd.${shard}.a.pvp.net`));
    }

    public endpoint(): string {
        return `match-details/v1/matches/${this.matchID}`;
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

    public refreshTimeoutDuration(_data: IMatchDetails): number {
        return 1000 * 60 * 5;
    }
}

export default MatchDetailsEndpoint;
