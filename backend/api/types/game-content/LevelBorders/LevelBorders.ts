export interface LevelBordersResponse {
    status: number;
    data:   LevelBorder[];
}

export interface LevelBorder {
    uuid:                      string;
    displayName:               string;
    startingLevel:             number;
    levelNumberAppearance:     string;
    smallPlayerCardAppearance: string;
    assetPath:                 string;
}
