import {fetchApi, getPdUrl} from '../request-helpers';
import {HttpMethod, ILocation} from '../request-types';
import {AxiosHeaders} from 'axios';

async function contractsFetchContract(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(location.shard)}/contracts/v1/contracts/${puuid}`, HttpMethod.GET, null, headers);
}

async function contractsFetchActivateContract(location: ILocation, headers: AxiosHeaders, puuid: string, contactID: string) {
    return fetchApi(`${getPdUrl(location.shard)}/contracts/v1/contracts/${puuid}/special/${contactID}`, HttpMethod.POST, null, headers);
}

async function contractsFetchContractDefinitionsActiveStory(location: ILocation, headers: AxiosHeaders) {
    return fetchApi(`${getPdUrl(location.shard)}/contract-definitions/v2/definitions/story`, HttpMethod.GET, null, headers);
}

async function contractsFetchItemUpgrades(location: ILocation, headers: AxiosHeaders) {
    return fetchApi(`${getPdUrl(location.shard)}/contract-definitions/v3/item-upgrades`, HttpMethod.GET, null, headers);
}

export {contractsFetchContract, contractsFetchActivateContract, contractsFetchContractDefinitionsActiveStory, contractsFetchItemUpgrades};
