import {HttpMethod, ILocation} from '../request-types';
import {AxiosHeaders} from 'axios';
import {fetchApi, getGlzUrl} from '../request-helpers';

async function pregame_fetchPlayer(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/players/${puuid}`, HttpMethod.GET, null, headers);
}

async function pregame_fetchMatch(location: ILocation, headers: AxiosHeaders, matchID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}`, HttpMethod.GET, null, headers);
}

async function pregame_fetchMatchLoadouts(location: ILocation, headers: AxiosHeaders, matchID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/loadouts`, HttpMethod.GET, null, headers);
}

async function pregame_fetchChatToken(location: ILocation, headers: AxiosHeaders, matchID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/chattoken`, HttpMethod.GET, null, headers);
}

async function pregame_fetchVoiceToken(location: ILocation, headers: AxiosHeaders, matchID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/voicetoken`, HttpMethod.GET, null, headers);
}

async function pregame_selectCharacter(location: ILocation, headers: AxiosHeaders, matchID: string, agentID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/select/${agentID}`, HttpMethod.POST, null, headers);
}

async function pregame_lockCharacter(location: ILocation, headers: AxiosHeaders, matchID: string, agentID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/lock/${agentID}`, HttpMethod.POST, null, headers);
}

async function pregame_quitMatch(location: ILocation, headers: AxiosHeaders, matchID: string) {
    return fetchApi(`${getGlzUrl(location)}/pregame/v1/matches/${matchID}/quit`, HttpMethod.POST, null, headers);
}

export {
    pregame_fetchPlayer,
    pregame_fetchMatch,
    pregame_fetchMatchLoadouts,
    pregame_fetchChatToken,
    pregame_fetchVoiceToken,
    pregame_selectCharacter,
    pregame_lockCharacter,
    pregame_quitMatch,
};
