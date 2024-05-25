import {Method} from '../../../http/http';
import { ContentTiersResponse } from '../../../types/game-content/ContentTiers/ContentTiers';
import {CachedGameContentVersionEndpoint} from '../endpoint';

class ContentTiersEndpoint extends CachedGameContentVersionEndpoint<ContentTiersResponse> {
    public endpoint(): string {
        return '/v1/contenttiers';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default ContentTiersEndpoint;