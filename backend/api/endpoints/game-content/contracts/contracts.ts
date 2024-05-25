import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {ContractsResponse} from '../../../types/game-content/Contracts/Contracts';

class ContractsEndpoint extends CachedGameContentVersionEndpoint<ContractsResponse> {
    public endpoint(): string {
        return '/v1/contracts';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default ContractsEndpoint;
