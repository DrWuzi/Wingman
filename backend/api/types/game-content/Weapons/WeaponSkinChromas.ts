export interface WeaponSkinChromasResponse {
    status: number;
    data:   WeaponSkinChroma[];
}

export interface WeaponSkinChroma {
    uuid:          string;
    displayName:   string;
    displayIcon:   null | string;
    fullRender:    string;
    swatch:        null | string;
    streamedVideo: null | string;
    assetPath:     string;
}
