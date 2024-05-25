import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {BundlesResponse} from '../../../types/game-content/Bundles/Bundles';

class BundlesEndpoint extends CachedGameContentVersionEndpoint<BundlesResponse> {
    public endpoint(): string {
        return '/v1/bundles';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default BundlesEndpoint;
