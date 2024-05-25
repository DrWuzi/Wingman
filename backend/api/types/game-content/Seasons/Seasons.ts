export interface SeasonsResponse {
    status: number;
    data:   Season[];
}

export interface Season {
    uuid:        string;
    displayName: string;
    type:        Type | null;
    startTime:   Date;
    endTime:     Date;
    parentUuid:  null | string;
    assetPath:   string;
}

export enum Type {
    EAresSeasonTypeAct = "EAresSeasonType::Act",
}
