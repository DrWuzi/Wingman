export interface MapsResponse {
    status: number;
    data:   IMap[];
}

export interface IMap {
    uuid:                    string;
    displayName:             string;
    narrativeDescription:    null;
    tacticalDescription:     TacticalDescription | null;
    coordinates:             null | string;
    displayIcon:             null | string;
    listViewIcon:            string;
    listViewIconTall:        string;
    splash:                  string;
    stylizedBackgroundImage: null | string;
    premierBackgroundImage:  null | string;
    assetPath:               string;
    mapUrl:                  string;
    xMultiplier:             number;
    yMultiplier:             number;
    xScalarToAdd:            number;
    yScalarToAdd:            number;
    callouts:                Callout[] | null;
}

export interface Callout {
    regionName:      string;
    superRegionName: SuperRegionName;
    location:        Location;
}

export interface Location {
    x: number;
    y: number;
}

export enum SuperRegionName {
    A = "A",
    AttackerSide = "Attacker Side",
    B = "B",
    C = "C",
    DefenderSide = "Defender Side",
    Mid = "Mid",
}

export enum TacticalDescription {
    ABCSites = "A/B/C Sites",
    ABSites = "A/B Sites",
}
