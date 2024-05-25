export interface BuddyLevelsResponse {
    status: number;
    data:   BuddyLevel[];
}

export interface BuddyLevel {
    uuid:           string;
    charmLevel:     number;
    hideIfNotOwned: boolean;
    displayName:    string;
    displayIcon:    string;
    assetPath:      string;
}
