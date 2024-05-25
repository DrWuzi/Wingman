export interface CurrenciesResponse {
    status: number;
    data:   Currencie[];
}

export interface Currencie {
    uuid:                string;
    displayName:         string;
    displayNameSingular: string;
    displayIcon:         string;
    largeIcon:           string;
    assetPath:           string;
}
