import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {GamemodeEquippablesResponse} from '../../../types/game-content/Gamemodes/GamemodeEquippables';

class GamemodeEquippablesEndpoint extends CachedGameContentVersionEndpoint<GamemodeEquippablesResponse> {
    public endpoint(): string {
        return '/v1/gamemodes/equippables';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default GamemodeEquippablesEndpoint;
