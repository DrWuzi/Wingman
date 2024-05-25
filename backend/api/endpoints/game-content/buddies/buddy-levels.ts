import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {BuddyLevelsResponse} from '../../../types/game-content/Buddies/BuddyLevels';

class BuddyLevelsEndpoint extends CachedGameContentVersionEndpoint<BuddyLevelsResponse> {
    public endpoint(): string {
        return '/v1/buddies/levels';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default BuddyLevelsEndpoint;
