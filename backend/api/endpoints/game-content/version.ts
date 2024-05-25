import {CachedEndpoint} from '../../endpoint';
import GameContentClient, {
  GameContentClientError,
} from '../../clients/game-content-client';
import EnumError from '../../error';
import Result from '../../result';
import {Headers, Method} from '../../http/http';
import {VersionResponse} from '../../types/game-content/Version/Version';

class VersionEndpoint extends CachedEndpoint<
  VersionResponse,
  EnumError<GameContentClientError>,
  GameContentClient
> {
  public forceRefresh: boolean;

  public constructor(forceRefresh: boolean = false) {
    super();

    this.forceRefresh = forceRefresh;
  }

  public endpoint(): string {
    return '/v1/version';
  }

  public method(): Method {
    return Method.GET;
  }

  public refreshTimeoutDuration(_data: VersionResponse): number {
    if (this.forceRefresh) {
      return 0;
    }

    return 1000 * 60 * 5;
  }
}

export default VersionEndpoint;
