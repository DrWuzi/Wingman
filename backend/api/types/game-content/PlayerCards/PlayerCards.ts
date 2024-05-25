export interface PlayerCardsResponse {
    status: number;
    data:   PlayerCard[];
}

export interface PlayerCard {
    uuid:               string;
    displayName:        string;
    isHiddenIfNotOwned: boolean;
    themeUuid:          null | string;
    displayIcon:        string;
    smallArt:           string;
    wideArt:            string;
    largeArt:           string;
    assetPath:          string;
}
