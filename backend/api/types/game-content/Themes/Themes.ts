export interface ThemesResponse {
    status: number;
    data:   Theme[];
}

export interface Theme {
    uuid:               string;
    displayName:        string;
    displayIcon:        null | string;
    storeFeaturedImage: null | string;
    assetPath:          string;
}
