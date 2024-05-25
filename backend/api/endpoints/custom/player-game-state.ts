import {CachedEndpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Headers, Method} from '../../http/http';
import {IUser} from '../../types/user';
import EPlayerGameState from '../../types/custom/player-game-state';
import {ClientError} from '../../client';
import CurrentGamePlayerEndpoint from '../current-game/current-game-player';
import PreGamePlayerEndpoint from '../pregame/pregame-player';
import PartyPlayerEndpoint from '../party/party-player';

class PlayerGameStateEndpoint extends CachedEndpoint<EPlayerGameState, EnumError<ValorantClientError>, ValorantClient> {
    public user: IUser;
    public puuid?: string;

    public constructor(user: IUser, puuid?: string) {
        super();

        this.user = user;
        this.puuid = puuid;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        return Result.ok(undefined);
    }

    public endpoint(): string {
        return '';
    }

    public method(): Method {
        return Method.GET;
    }

    public headers(): Headers | undefined {
        return undefined;
    }

    public refreshTimeoutDuration(_data: EPlayerGameState): number {
        return 1000;
    }

    public async query(client: ValorantClient): Promise<Result<EPlayerGameState, EnumError<ClientError>>> {
        let preGameResponse = await new PreGamePlayerEndpoint(this.user, this.puuid).query(client);
        if (preGameResponse.isOk()) {
            return Result.ok(EPlayerGameState.PRE_GAME);
        }

        let currentGameResponse = await new CurrentGamePlayerEndpoint(this.user, this.puuid).query(client);
        if (currentGameResponse.isOk()) {
            return Result.ok(EPlayerGameState.IN_GAME);
        }

        let partyResponse = await new PartyPlayerEndpoint(this.user, this.puuid).query(client);
        if (partyResponse.isOk()) {
            return Result.ok(EPlayerGameState.LOBBY);
        }

        return Result.ok(EPlayerGameState.NOT_IN_GAME);
    }
}

export default PlayerGameStateEndpoint;
