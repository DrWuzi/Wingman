export interface SprayLevelsResponse {
    status: number;
    data:   SprayLevel[];
}

export interface SprayLevel {
    uuid:        string;
    sprayLevel:  number;
    displayName: string;
    displayIcon: null | string;
    assetPath:   string;
}
