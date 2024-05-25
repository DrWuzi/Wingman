import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {GamemodesResponse} from '../../../types/game-content/Gamemodes/Gamemodes';

class GamemodesEndpoint extends CachedGameContentVersionEndpoint<GamemodesResponse> {
    public endpoint(): string {
        return '/v1/gamemodes';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default GamemodesEndpoint;
