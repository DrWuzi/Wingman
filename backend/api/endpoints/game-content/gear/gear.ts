import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {GearResponse} from '../../../types/game-content/Gear/Gear';

class GearEndpoint extends CachedGameContentVersionEndpoint<GearResponse> {
    public endpoint(): string {
        return '/v1/gear';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default GearEndpoint;
