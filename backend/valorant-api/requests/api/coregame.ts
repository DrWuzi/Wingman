import {getGlzUrl} from '../request-helpers';
import {HttpMethod, ILocation} from '../request-types';
import {AxiosHeaders} from 'axios';
import {fetchApi} from '../request-helpers';

async function coregame_fetchPlayer(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/players/${puuid}`, HttpMethod.GET, null, headers);
}

async function coregame_fetchMatch(location: ILocation, headers: AxiosHeaders, matchId: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/matches/${matchId}`, HttpMethod.GET, null, headers);
}

async function coregame_fetchMatchLoadouts(location: ILocation, headers: AxiosHeaders, matchId: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/matches/${matchId}/loadouts`, HttpMethod.GET, null, headers);
}

async function coregame_fetchAllChatMucToken(location: ILocation, headers: AxiosHeaders, matchId: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/matches/${matchId}/allchatmuctoken`, HttpMethod.GET, null, headers);
}

async function coregame_fetchTeamChatMucToken(location: ILocation, headers: AxiosHeaders, matchId: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/matches/${matchId}/teamchatmuctoken`, HttpMethod.GET, null, headers);
}

async function coregame_fetchDisassociatePlayer(location: ILocation, headers: AxiosHeaders, matchId: string, puuid: string) {
    return await fetchApi(`${getGlzUrl(location)}/core-game/v1/players/${puuid}/disassociate/${matchId}`, HttpMethod.POST, null, headers);
}

export {
    coregame_fetchPlayer,
    coregame_fetchMatch,
    coregame_fetchMatchLoadouts,
    coregame_fetchDisassociatePlayer,
    coregame_fetchTeamChatMucToken,
    coregame_fetchAllChatMucToken,
};
