import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {CurrenciesResponse} from '../../../types/game-content/Currencies/Currencies';

class CurrenciesEndpoint extends CachedGameContentVersionEndpoint<CurrenciesResponse> {
    public endpoint(): string {
        return '/v1/currencies';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default CurrenciesEndpoint;
