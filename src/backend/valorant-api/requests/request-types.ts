/**
 * Region ID   Region Name      Shard(s)
 * na 	       North America    na OR pbe
 * latam       Latin America    na
 * br          Brazil           na
 * eu          Europe           eu
 * ap          Asia Pacific     ap
 * kr          Korea            kr
 **/

export type Region = 'na' | 'latem' | 'br' | 'eu' | 'ap' | 'kr';
export type Shard = 'na' | 'pbe' | 'eu' | 'ap' | 'kr';

export interface ILocation {
    region: Region;
    shard: Shard;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}
