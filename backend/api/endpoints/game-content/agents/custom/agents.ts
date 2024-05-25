import {Method} from '../../../../http/http';
import {IAgent, AgentsResponse} from '../../../../types/game-content/Agents/Agents';
import {CachedCustomGameContentVersionEndpoint} from '../../endpoint';

class AgentsByUuidEndpoint extends CachedCustomGameContentVersionEndpoint<AgentsResponse, Record<string, IAgent>> {
    public constructor() {
        super();
    }

    public endpoint(): string {
        return '/v1/agents';
    }

    public method(): Method {
        return Method.GET;
    }

    public overwriteCacheFileName(): string | undefined {
        return 'game-content-agents-by-uuid';
    }

    protected convertResponse(data: AgentsResponse): Record<string, IAgent> {
        return data.data.reduce((map: Record<string, IAgent>, agent) => {
            map[agent.uuid] = agent;
            return map;
        }, {});
    }
}

export default AgentsByUuidEndpoint;
