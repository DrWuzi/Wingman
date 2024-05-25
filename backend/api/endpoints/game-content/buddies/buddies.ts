import {Method} from '../../../http/http';
import {CachedGameContentVersionEndpoint} from '../endpoint';
import {BuddiesResponse} from '../../../types/game-content/Buddies/Buddies';

class BuddiesEndpoint extends CachedGameContentVersionEndpoint<BuddiesResponse> {
  public endpoint(): string {
    return '/v1/buddies';
  }

  public method(): Method {
    return Method.GET;
  }
}

export default BuddiesEndpoint;
