import axios from 'axios';
import * as FileSystem from '../../utils/file-system/file-system';
import ApiStatics from '../api-statics';
import {IGameContent} from './game-content-types';

export default class GameContentApi {
    private gameContent: IGameContent;

    public constructor() {
        this.gameContent = {};
    }

    public getGameContent(): IGameContent {
        return this.gameContent;
    }

    public async init() {
        if (!this.gameContent) {
            this.gameContent = {};
        }

        const version = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.version)).data.data;

        const fetchNewGameContent = async () => {
            if (!this.gameContent) {
                this.gameContent = {};
            }

            this.gameContent = await this.fetchGameContent();
            this.gameContent.version = version;

            await FileSystem.writeFile(ApiStatics.gameContentApi.filePaths.gameContent, this.gameContent!);
        };

        await FileSystem.readFile(ApiStatics.gameContentApi.filePaths.gameContent)
            .then(async (fileContent: any) => {
                if (!this.gameContent) {
                    this.gameContent = {};
                }

                if (fileContent.version.riotClientBuild === version.riotClientBuild) {
                    Object.assign(this.gameContent, fileContent);
                } else {
                    await fetchNewGameContent();
                }
            })
            .catch(async error => {
                await fetchNewGameContent();
            });
    }

    private async fetchGameContent(): Promise<IGameContent> {
        let gameContent: IGameContent = {};

        const agents = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.agents)).data.data;
        gameContent.agents = agents.filter((agent: {[x: string]: any}) => agent.isPlayableCharacter);

        gameContent.buddies = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.buddies)).data.data;
        gameContent.bundles = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.bundles)).data.data;
        gameContent.ceremonies = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.ceremonies)).data.data;
        gameContent.competitiveTiers = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.competitiveTiers)).data.data;
        gameContent.contentTiers = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.contracts)).data.data;
        gameContent.contracts = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.contracts)).data.data;
        gameContent.currencies = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.currencies)).data.data;
        gameContent.events = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.events)).data.data;
        gameContent.gameModes = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.gameModes)).data.data;
        gameContent.gears = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.gear)).data.data;
        gameContent.levelBorders = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.levelBorders)).data.data;

        const maps = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.maps)).data.data;
        gameContent.maps = maps.filter((map: {uuid: string}) => !ApiStatics.gameContentApi.mapUuidBlackList.includes(map.uuid));

        gameContent.playerCards = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.playerCards)).data.data;
        gameContent.playerTitles = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.playerTitles)).data.data;
        gameContent.seasons = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.seasons)).data.data;
        gameContent.sprays = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.sprays)).data.data;
        gameContent.themes = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.themes)).data.data;
        gameContent.weapons = (await axios.get(ApiStatics.gameContentApi.gameContentApiEndpoints.weapons)).data.data;

        return gameContent;
    }
}
