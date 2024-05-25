import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {MapsResponse} from '../../../types/game-content/Maps/Maps';

class MapsEndpoint extends CachedGameContentVersionEndpoint<MapsResponse> {
    public endpoint(): string {
        return '/v1/maps';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default MapsEndpoint;
