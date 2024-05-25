import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {EventsResponse} from '../../../types/game-content/Events/Events';

class EventsEndpoint extends CachedGameContentVersionEndpoint<EventsResponse> {
    public endpoint(): string {
        return '/v1/events';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default EventsEndpoint;
