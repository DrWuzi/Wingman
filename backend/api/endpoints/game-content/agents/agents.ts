import {Method} from '../../../http/http';
import {AgentsResponse} from '../../../types/game-content/Agents/Agents';
import {CachedGameContentVersionEndpoint} from '../endpoint';

class AgentsEndpoint extends CachedGameContentVersionEndpoint<AgentsResponse> {
    public endpoint(): string {
        return '/v1/agents';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default AgentsEndpoint;
