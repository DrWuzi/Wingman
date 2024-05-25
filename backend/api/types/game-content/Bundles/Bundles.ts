export interface BundlesResponse {
    status: number;
    data:   Bundle[];
}

export interface Bundle {
    uuid:                 string;
    displayName:          string;
    displayNameSubText:   DisplayNameSubText | null;
    description:          string;
    extraDescription:     null | string;
    promoDescription:     null | string;
    useAdditionalContext: boolean;
    displayIcon:          string;
    displayIcon2:         string;
    logoIcon:             null | string;
    verticalPromoImage:   null | string;
    assetPath:            string;
}

export enum DisplayNameSubText {
    Capsule = "CAPSULE",
    CollectorSSet = "COLLECTOR'S SET",
    NowAvailable = "NOW AVAILABLE",
}
