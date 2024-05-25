import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import { CompetitiveTiersResponse } from '../../../types/game-content/CompetitiveTiers/CompetitiveTiers';

class CompetitiveTiersEndpoint extends CachedGameContentVersionEndpoint<CompetitiveTiersResponse> {
    public endpoint(): string {
        return '/v1/competitivetiers';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default CompetitiveTiersEndpoint;
