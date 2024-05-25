export interface CeremoniesResponse {
    status: number;
    data:   Ceremonie[];
}

export interface Ceremonie {
    uuid:        string;
    displayName: string;
    assetPath:   string;
}
