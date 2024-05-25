import {fetchApi, getGlzUrl} from '../request-helpers';
import {HttpMethod, ILocation} from '../request-types';
import {AxiosHeaders} from 'axios';

async function session_fetchPuuid(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return await fetchApi(`${getGlzUrl(location)}/session/v1/sessions/${puuid}`, HttpMethod.GET, null, headers);
}

async function session_reconnect(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return await fetchApi(`${getGlzUrl(location)}/session/v1/sessions/${puuid}/reconnect`, HttpMethod.GET, null, headers);
}

export {session_fetchPuuid, session_reconnect};
