export interface ContractsResponse {
    status: number;
    data:   Contract[];
}

export interface Contract {
    uuid:                   string;
    displayName:            string;
    displayIcon:            null | string;
    shipIt:                 boolean;
    useLevelVPCostOverride: boolean;
    levelVPCostOverride:    number;
    freeRewardScheduleUuid: string;
    content:                Content;
    assetPath:              string;
}

export interface Content {
    relationType:              RelationType | null;
    relationUuid:              null | string;
    chapters:                  Chapter[];
    premiumRewardScheduleUuid: null | string;
    premiumVPCost:             number;
}

export interface Chapter {
    isEpilogue:  boolean;
    levels:      Level[];
    freeRewards: Reward[] | null;
}

export interface Reward {
    type:          Type;
    uuid:          string;
    amount:        number;
    isHighlighted: boolean;
}

export enum Type {
    Currency = "Currency",
    EquippableCharmLevel = "EquippableCharmLevel",
    EquippableSkinLevel = "EquippableSkinLevel",
    PlayerCard = "PlayerCard",
    Spray = "Spray",
    Title = "Title",
}

export interface Level {
    reward:                 Reward;
    xp:                     number;
    vpCost:                 number;
    isPurchasableWithVP:    boolean;
    doughCost:              number;
    isPurchasableWithDough: boolean;
}

export enum RelationType {
    Agent = "Agent",
    Event = "Event",
    Season = "Season",
}
