export interface CompetitiveTiersResponse {
    status: number;
    data:   CompetitiveTier[];
}

export interface CompetitiveTier {
    uuid:            string;
    assetObjectName: string;
    tiers:           Tier[];
    assetPath:       string;
}

export interface Tier {
    tier:                 number;
    tierName:             string;
    division:             Division;
    divisionName:         string;
    color:                Color;
    backgroundColor:      BackgroundColor;
    smallIcon:            null | string;
    largeIcon:            null | string;
    rankTriangleDownIcon: null | string;
    rankTriangleUpIcon:   null | string;
}

export enum BackgroundColor {
    D1D1D1Ff = "d1d1d1ff",
    Eec56Aff = "eec56aff",
    Ff5551Ff = "ff5551ff",
    Ffedaaff = "ffedaaff",
    The00000000 = "00000000",
    The00C7C0Ff = "00c7c0ff",
    The1C7245Ff = "1c7245ff",
    The763Bafff = "763bafff",
    The7C5522Ff = "7c5522ff",
    The828282Ff = "828282ff",
}

export enum Color {
    A5855Dff = "a5855dff",
    B489C4Ff = "b489c4ff",
    Bb3D65Ff = "bb3d65ff",
    Bbc2C2Ff = "bbc2c2ff",
    Eccf56Ff = "eccf56ff",
    Ffffaaff = "ffffaaff",
    Ffffffff = "ffffffff",
    The4F514Fff = "4f514fff",
    The59A9B6Ff = "59a9b6ff",
    The6Ae2Afff = "6ae2afff",
}

export enum Division {
    ECompetitiveDivisionASCENDANT = "ECompetitiveDivision::ASCENDANT",
    ECompetitiveDivisionBRONZE = "ECompetitiveDivision::BRONZE",
    ECompetitiveDivisionDIAMOND = "ECompetitiveDivision::DIAMOND",
    ECompetitiveDivisionGOLD = "ECompetitiveDivision::GOLD",
    ECompetitiveDivisionIMMORTAL = "ECompetitiveDivision::IMMORTAL",
    ECompetitiveDivisionINVALID = "ECompetitiveDivision::INVALID",
    ECompetitiveDivisionIRON = "ECompetitiveDivision::IRON",
    ECompetitiveDivisionPLATINUM = "ECompetitiveDivision::PLATINUM",
    ECompetitiveDivisionRADIANT = "ECompetitiveDivision::RADIANT",
    ECompetitiveDivisionSILVER = "ECompetitiveDivision::SILVER",
    ECompetitiveDivisionUNRANKED = "ECompetitiveDivision::UNRANKED",
}
