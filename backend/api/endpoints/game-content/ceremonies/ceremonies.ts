import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {CeremoniesResponse} from '../../../types/game-content/Ceremonies/Ceremonies';

class CeremoniesEndpoint extends CachedGameContentVersionEndpoint<CeremoniesResponse> {
    public endpoint(): string {
        return '/v1/ceremonies';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default CeremoniesEndpoint;
