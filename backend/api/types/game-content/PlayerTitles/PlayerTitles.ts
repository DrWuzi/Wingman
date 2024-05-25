export interface PlayerTitlesResponse {
    status: number;
    data:   PlayerTitle[];
}

export interface PlayerTitle {
    uuid:               string;
    displayName:        null | string;
    titleText:          null | string;
    isHiddenIfNotOwned: boolean;
    assetPath:          string;
}
