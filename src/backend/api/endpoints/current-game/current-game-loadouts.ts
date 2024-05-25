import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Headers, Method} from '../../http/http';
import {IUser} from '../../types/user';
import IPreGameLoadouts from '../../types/pregame/pregame-loadouts';
import ICurrentGameLoadouts from '../../types/current-game/current-game-loadouts';

class CurrentGameLoadoutsEndpoint extends CachedEndpoint<
    ICurrentGameLoadouts,
    EnumError<ValorantClientError>,
    ValorantClient
> {
    public user: IUser;
    public currentGameMatchId: string;

    public constructor(user: IUser, currentGameMatchId: string) {
        super();

        this.user = user;
        this.currentGameMatchId = currentGameMatchId;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        const region = this.user.accountInfo.pp.c;
        const shard = this.user.accountInfo.pp.c;
        return Result.ok(new URL(`https://glz-${region}-1.${shard}.a.pvp.net/`));
    }

    public endpoint(): string {
        return `core-game/v1/matches/${this.currentGameMatchId}/loadouts`;
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

    public refreshTimeoutDuration(_data: ICurrentGameLoadouts): number {
        return 1000 * 10;
    }
}

export default CurrentGameLoadoutsEndpoint;
