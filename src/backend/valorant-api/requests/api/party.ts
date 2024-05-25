import {HttpMethod, ILocation} from '../request-types';
import {AxiosHeaders} from 'axios';
import {fetchApi, getGlzUrl} from '../request-helpers';

async function party_fetchPlayer(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/players/${puuid}`, HttpMethod.GET, null, headers);
}

async function party_fetchParty(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}`, HttpMethod.GET, null, headers);
}

async function party_fetchCustomGameConfigs(location: ILocation, headers: AxiosHeaders) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/customgameconfigs`, HttpMethod.GET, null, headers);
}

async function party_removePlayer(location: ILocation, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/players/${puuid}`, HttpMethod.DELETE, null, headers);
}

async function party_fetchVoiceToken(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/voicetoken`, HttpMethod.GET, null, headers);
}

async function party_declineRequest(location: ILocation, headers: AxiosHeaders, puuid: string, partyID: string, requestID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/request/${requestID}/decline`, HttpMethod.POST, null, headers);
}

async function party_enterMatchmakingQueue(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/matchmaking/join`, HttpMethod.POST, null, headers);
}

async function party_inviteToPartyByDisplayName(location: ILocation, headers: AxiosHeaders, partyID: string, name: string, tag: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/invites/name/${name}/tag/${tag}`, HttpMethod.POST, null, headers);
}

async function party_leaveMatchmakingQueue(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/matchmaking/leave`, HttpMethod.POST, null, headers);
}

async function party_refreshCompetitiveTier(location: ILocation, headers: AxiosHeaders, partyID: string, puuid: string) {
    return fetchApi(
        `${getGlzUrl(location)}/parties/v1/parties/${partyID}/members/${puuid}/refreshCompetitiveTier`,
        HttpMethod.POST,
        null,
        headers,
    );
}

async function party_refreshPings(location: ILocation, headers: AxiosHeaders, partyID: string, puuid: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/members/${puuid}/refreshPings`, HttpMethod.POST, null, headers);
}

async function party_refreshPlayerIdentity(location: ILocation, headers: AxiosHeaders, partyID: string, puuid: string) {
    return fetchApi(
        `${getGlzUrl(location)}/parties/v1/parties/${partyID}/members/${puuid}/refreshPlayerIdentity`,
        HttpMethod.POST,
        null,
        headers,
    );
}

async function party_requestToJoin(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/request`, HttpMethod.POST, null, headers);
}

async function party_startCustomGame(location: ILocation, headers: AxiosHeaders, partyID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/startcustomgame`, HttpMethod.POST, null, headers);
}

async function party_setMemberReady(location: ILocation, headers: AxiosHeaders, partyID: string, puuid: string, ready: boolean) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/members/${puuid}/setReady`, HttpMethod.POST, {ready}, headers);
}

async function party_setCustomGameSettings(
    location: ILocation,
    headers: AxiosHeaders,
    partyID: string,
    map: string,
    mode: string,
    pod: string,
    useBots: boolean,
    allowGameModifiers: boolean,
    playOutAllRounds: boolean,
    skipMatchHistory: boolean,
    tournamentMode: boolean,
    isOvertimeWinByTwo: boolean,
) {
    const body = {
        Map: map,
        Mode: mode,
        UseBots: useBots,
        GamePod: pod,
        GameRules: {
            AllowGameModifiers: allowGameModifiers,
            PlayOutAllRounds: playOutAllRounds,
            SkipMatchHistory: skipMatchHistory,
            TournamentMode: tournamentMode,
            IsOvertimeWinByTwo: isOvertimeWinByTwo,
        },
    };

    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/customgamesettings`, HttpMethod.POST, body, headers);
}

async function party_setAccessibility(location: ILocation, headers: AxiosHeaders, partyID: string, accessibility: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/accessibility`, HttpMethod.POST, {accessibility}, headers);
}

async function party_changeQueue(location: ILocation, headers: AxiosHeaders, partyID: string, queueID: string) {
    return fetchApi(`${getGlzUrl(location)}/parties/v1/parties/${partyID}/queue`, HttpMethod.POST, {queueID}, headers);
}

export {
    party_fetchPlayer,
    party_fetchParty,
    party_fetchCustomGameConfigs,
    party_removePlayer,
    party_fetchVoiceToken,
    party_declineRequest,
    party_enterMatchmakingQueue,
    party_inviteToPartyByDisplayName,
    party_leaveMatchmakingQueue,
    party_refreshCompetitiveTier,
    party_refreshPings,
    party_refreshPlayerIdentity,
    party_requestToJoin,
    party_startCustomGame,
    party_setMemberReady,
    party_setCustomGameSettings,
    party_setAccessibility,
    party_changeQueue,
};
