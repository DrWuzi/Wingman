export interface SpraysResponse {
    status: number;
    data:   Spray[];
}

export interface Spray {
    uuid:                string;
    displayName:         string;
    category:            Category | null;
    themeUuid:           null | string;
    isNullSpray:         boolean;
    hideIfNotOwned:      boolean;
    displayIcon:         string;
    fullIcon:            null | string;
    fullTransparentIcon: null | string;
    animationPng:        null | string;
    animationGif:        null | string;
    assetPath:           string;
    levels:              Level[];
}

export enum Category {
    EAresSprayCategoryContextual = "EAresSprayCategory::Contextual",
}

export interface Level {
    uuid:        string;
    sprayLevel:  number;
    displayName: string;
    displayIcon: null | string;
    assetPath:   string;
}
