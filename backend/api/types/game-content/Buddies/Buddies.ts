export interface BuddiesResponse {
    status: number;
    data:   Buddy[];
}

export interface Buddy {
    uuid:               string;
    displayName:        string;
    isHiddenIfNotOwned: boolean;
    themeUuid:          null | string;
    displayIcon:        string;
    assetPath:          string;
    levels:             Level[];
}

export interface Level {
    uuid:           string;
    charmLevel:     number;
    hideIfNotOwned: boolean;
    displayName:    string;
    displayIcon:    string;
    assetPath:      string;
}
