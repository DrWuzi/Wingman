export type Region = 'na' | 'latem' | 'br' | 'eu' | 'ap' | 'kr';
export type Shard = 'na' | 'pbe' | 'eu' | 'ap' | 'kr';

export interface ILocation {
    region: Region;
    shard: Shard;
}
