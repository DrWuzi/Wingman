import ValorantApiState from './api-state';
import {ApiResult, ApiResultType, createApiResult} from './api-result';
import Base64 from 'react-native-base64';
import ApiStatics from './api-statics';
import GameContentApi from './game-content-api/game-content-api';
import UserApi from './user-api/user-api';

export default class ValorantApi {
    private readonly apiState: ValorantApiState;
    private readonly userApi: UserApi;
    private readonly gameContentApi: GameContentApi;

    public constructor() {
        this.apiState = {headers: {}, cookies: {}};
        this.userApi = new UserApi(this.apiState);
        this.gameContentApi = new GameContentApi();
    }

    public async init(): Promise<ApiResult<null, ApiResultType>> {
        await this.gameContentApi.init();
        this.apiState.headers = this.getDefaultHeaders();
        await this.userApi.init(this.gameContentApi.getGameContent());

        return createApiResult(null, ApiResultType.SUCCESS);
    }

    public getUserApi(): UserApi {
        return this.userApi;
    }

    public getGameContentApi(): GameContentApi {
        return this.gameContentApi;
    }

    private getDefaultHeaders(): Record<string, string> {
        let riotClientBuild =
            this.gameContentApi.getGameContent().version?.riotClientBuild ||
            ApiStatics.gameContentApi.defaultClientVersions.riotClientBuild;
        let riotClientVersion =
            this.gameContentApi.getGameContent().version?.riotClientVersion ||
            ApiStatics.gameContentApi.defaultClientVersions.riotClientVersion;

        return {
            'User-Agent': `RiotClient/${riotClientBuild} (Windows NT 10.0; Win64; x64)`,
            'Content-Type': 'application/json',
            'X-Riot-ClientVersion': riotClientVersion,
            'X-Riot-ClientPlatform': Base64.encode(JSON.stringify(ApiStatics.api.client_platform)),
        };
    }
}
