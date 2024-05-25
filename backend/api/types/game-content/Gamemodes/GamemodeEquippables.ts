export interface GamemodeEquippablesResponse {
    status: number;
    data:   GamemodeEquippable[];
}

export interface GamemodeEquippable {
    uuid:           string;
    displayName:    string;
    category:       string;
    displayIcon:    string;
    killStreamIcon: string;
    assetPath:      string;
}
