import axios, {AxiosHeaders, AxiosRequestConfig, AxiosResponse} from 'axios';
import {HttpMethod, ILocation, Shard} from './request-types';
import {ApiResult, ApiResultType, createApiResult} from '../api-result';

async function fetchApi(
    url: string,
    method: HttpMethod,
    data: any | null = null,
    headers: AxiosHeaders,
): Promise<ApiResult<AxiosResponse | null, ApiResultType>> {
    const config: AxiosRequestConfig = {
        method: method,
        url: url,
        data: data,
        headers: headers,
    };

    try {
        const response = await axios(config);
        return createApiResult(response, ApiResultType.SUCCESS);
    } catch (error: any) {
        let errorMessage = '';

        if (error.response) {
            const regex = /^(.*\/sessions\/)[a-f\d-]+$/i;
            const expectedURL = 'https://glz-eu-1.eu.a.pvp.net/session/v1/sessions/';

            if (!url.match(regex) || url.match(regex)![1] !== expectedURL) {
                errorMessage = `API Error: ${JSON.stringify(error.response.data)}`;
            }
        } else if (error.request) {
            errorMessage = `Network Error: ${error.request}`;
        } else {
            errorMessage = `Error: ${error.message}`;
        }

        return createApiResult(null, ApiResultType.FAILURE, errorMessage);
    }
}

function getAuthorizationUrl() {
    return 'https://auth.riotgames.com/api/v1/authorization';
}

function getCookieReAuthUrl() {
    return 'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';
}

function getEntitlementsUrl() {
    return 'https://entitlements.auth.riotgames.com/api/token/v1';
}

function getUserInfoUrl() {
    return 'https://auth.riotgames.com/userinfo';
}

function getGeoUrl() {
    return 'https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant';
}

function getPasTokenUrl() {
    return 'https://riot-geo.pas.si.riotgames.com/pas/v1/service/chat';
}

function getClientConfigUrl() {
    return 'https://clientconfig.rpg.riotgames.com/api/v1/config/player?app=Riot%20Client';
}

function getGlzUrl(location: ILocation) {
    return `https://glz-${location.region}-1.${location.shard}.a.pvp.net`;
}

function getPdUrl(shard: Shard) {
    return `https://pd.${shard}.a.pvp.net`;
}

function getSharedUrl(shard: Shard) {
    return `https://shared.${shard}.a.pvp.net`;
}

export {
    fetchApi,
    getAuthorizationUrl,
    getGlzUrl,
    getPdUrl,
    getSharedUrl,
    getEntitlementsUrl,
    getUserInfoUrl,
    getGeoUrl,
    getPasTokenUrl,
    getClientConfigUrl,
    getCookieReAuthUrl,
};
