import {
    fetchApi,
    getAuthorizationUrl,
    getCookieReAuthUrl,
    getEntitlementsUrl,
    getGeoUrl,
    getPasTokenUrl,
    getUserInfoUrl,
} from '../request-helpers';
import {HttpMethod} from '../request-types';
import {AxiosHeaders} from 'axios';

async function fetchAuthCookies(headers: AxiosHeaders) {
    const body = {
        client_id: 'play-valorant-web-prod',
        nonce: '1',
        redirect_uri: 'https://playvalorant.com/opt_in',
        response_type: 'token id_token',
        scope: 'account openid',
    };

    return fetchApi(getAuthorizationUrl(), HttpMethod.POST, body, headers);
}

async function login(headers: AxiosHeaders, username: string, password: string, remember: boolean = true) {
    const authRequestBody = {
        type: 'auth',
        username: username,
        password: password,
        remember: remember,
        language: 'en_US',
    };

    return fetchApi(getAuthorizationUrl(), HttpMethod.PUT, authRequestBody, headers);
}

/**
 * @deprecated Not working anymore, due to the recent changes of the auth flow
 */
async function multifactorLogin(headers: AxiosHeaders, code: string, remember: boolean = true) {
    const multiAuthBody = {
        type: 'multifactor',
        code: code.replace(/\n/g, '').trim(),
        rememberDevice: remember,
    };

    return fetchApi(getAuthorizationUrl(), HttpMethod.PUT, multiAuthBody, headers);
}

async function cookieReAuth(headers: AxiosHeaders) {
    return fetchApi(getCookieReAuthUrl(), HttpMethod.GET, null, headers);
}

async function fetchEntitlement(headers: AxiosHeaders) {
    return fetchApi(getEntitlementsUrl(), HttpMethod.GET, null, headers);
}

async function fetchUserInfo(headers: AxiosHeaders) {
    return fetchApi(getUserInfoUrl(), HttpMethod.GET, null, headers);
}

async function fetchGeo(headers: AxiosHeaders) {
    return fetchApi(getGeoUrl(), HttpMethod.GET, null, headers);
}

async function fetchPasToken(headers: AxiosHeaders) {
    return fetchApi(getPasTokenUrl(), HttpMethod.GET, null, headers);
}

export {
    fetchAuthCookies,
    login,
    multifactorLogin,
    fetchEntitlement,
    fetchUserInfo,
    fetchGeo,
    fetchPasToken,
    cookieReAuth,
};
