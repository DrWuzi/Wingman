import {HttpMethod, ILocation, Shard} from '../request-types';
import {AxiosHeaders} from 'axios';
import {fetchApi, getPdUrl, getSharedUrl} from '../request-helpers';

async function pvp_fetchAccountXp(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/account-xp/v1/players/${puuid}`, HttpMethod.GET, null, headers);
}

async function pvp_fetchConfig(location: ILocation, headers: AxiosHeaders) {
    return fetchApi(`${getSharedUrl(location.shard)}/v1/config/${location.region}`, HttpMethod.GET, null, headers);
}

async function pvp_fetchContent(shard: Shard, headers: AxiosHeaders) {
    return fetchApi(`${getSharedUrl(shard)}/content-service/v3/content`, HttpMethod.GET, null, headers);
}

/**
 * Get recent games and how they changed ranking
 * @param shard The shard is dependent on where the Riot account was created.
 * @param headers Request headers
 * @param puuid The ID of the player
 * @param startIndex The index of the first match to return. Defaults to 0
 * @param endIndex The index of the last match to return. Defaults to 10
 * @param queue The queue to filter by. Defaults to all queues
 */
async function pvp_fetchMmrCompetitiveUpdates(
    shard: Shard,
    headers: AxiosHeaders,
    puuid: string,
    startIndex: number = 0,
    endIndex: number = 10,
    queue?: string,
) {
    return fetchApi(
        `${getPdUrl(shard)}/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${startIndex}&endIndex=${endIndex}${
            queue ? `&queue=${queue}` : ''
        }`,
        HttpMethod.GET,
        null,
        headers,
    );
}

/**
 * Get the leaderboard for a given season
 * @param location The shard and region
 * @param headers Request headers
 * @param seasonId The ID of the season
 * @param startIndex The index of the first entry to return. The client will have this set to 0
 * @param size The number of entries to retrieve. The client will request 510 entries
 * @param query An optional username to search for
 */
async function pvp_fetchMmrLeaderboard(
    location: ILocation,
    headers: AxiosHeaders,
    seasonId: string,
    startIndex: number = 0,
    size: number = 510,
    query?: string,
) {
    return fetchApi(
        `${getPdUrl(location.shard)}/mmr/v1/leaderboards/affinity/${
            location.region
        }/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}${query ? `&${query}` : ''}`,
        HttpMethod.GET,
        null,
        headers,
    );
}

async function pvp_fetchPlayerMmr(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/mmr/v1/players/${puuid}`, HttpMethod.GET, null, headers);
}

async function pvp_fetchMatchDetails(shard: Shard, headers: AxiosHeaders, matchId: string) {
    return fetchApi(`${getPdUrl(shard)}/match-details/v1/matches/${matchId}`, HttpMethod.GET, null, headers);
}

/**
 * Get the match history for the given player
 * @param shard The shard is dependent on where the Riot account was created.
 * @param headers Request headers
 * @param puuid The ID of the player
 * @param startIndex The index of the first match to return. Defaults to 0
 * @param endIndex The index of the last match to return. Defaults to 20
 * @param queue The queue to filter by. Defaults to all queues
 */
async function pvp_fetchMatchHistory(
    shard: Shard,
    headers: AxiosHeaders,
    puuid: string,
    startIndex: number = 0,
    endIndex: number = 20,
    queue?: string,
) {
    return fetchApi(
        `${getPdUrl(shard)}/match-history/v1/history/${puuid}?startIndex=${startIndex}&endIndex=${endIndex}${
            queue ? `&queue=${queue}` : ''
        }`,
        HttpMethod.GET,
        null,
        headers,
    );
}

async function pvp_fetchPlayerRestrictionsV2(shard: Shard, headers: AxiosHeaders) {
    return fetchApi(`${getPdUrl(shard)}/restrictions/v3/penalties`, HttpMethod.GET, null, headers);
}

async function pvp_fetchPlayerLoadout(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/personalization/v2/players/${puuid}/playerloadout`, HttpMethod.GET, null, headers);
}

async function pvp_putPlayerLoadout(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/personalization/v2/players/${puuid}/playerloadout`, HttpMethod.PUT, null, headers);
}

async function pvp_putPlayerNameService(shard: Shard, headers: AxiosHeaders) {
    return fetchApi(`${getPdUrl(shard)}/name-service/v2/players`, HttpMethod.PUT, null, headers);
}

export {
    pvp_fetchAccountXp,
    pvp_fetchConfig,
    pvp_fetchContent,
    pvp_fetchMmrCompetitiveUpdates,
    pvp_fetchMmrLeaderboard,
    pvp_fetchPlayerMmr,
    pvp_fetchMatchDetails,
    pvp_fetchMatchHistory,
    pvp_fetchPlayerRestrictionsV2,
    pvp_fetchPlayerLoadout,
    pvp_putPlayerLoadout,
    pvp_putPlayerNameService,
};
