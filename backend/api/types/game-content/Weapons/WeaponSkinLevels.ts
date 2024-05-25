export interface WeaponSkinLevelsResponse {
    status: number;
    data:   WeaponSkinLevel[];
}

export interface WeaponSkinLevel {
    uuid:          string;
    displayName:   string;
    levelItem:     LevelItem | null;
    displayIcon:   null | string;
    streamedVideo: null | string;
    assetPath:     string;
}

export enum LevelItem {
    EEquippableSkinLevelItemAnimation = "EEquippableSkinLevelItem::Animation",
    EEquippableSkinLevelItemAttackerDefenderSwap = "EEquippableSkinLevelItem::AttackerDefenderSwap",
    EEquippableSkinLevelItemFinisher = "EEquippableSkinLevelItem::Finisher",
    EEquippableSkinLevelItemFishAnimation = "EEquippableSkinLevelItem::FishAnimation",
    EEquippableSkinLevelItemHeartbeatAndMapSensor = "EEquippableSkinLevelItem::HeartbeatAndMapSensor",
    EEquippableSkinLevelItemInspectAndKill = "EEquippableSkinLevelItem::InspectAndKill",
    EEquippableSkinLevelItemKillBanner = "EEquippableSkinLevelItem::KillBanner",
    EEquippableSkinLevelItemKillCounter = "EEquippableSkinLevelItem::KillCounter",
    EEquippableSkinLevelItemKillEffect = "EEquippableSkinLevelItem::KillEffect",
    EEquippableSkinLevelItemRandomizer = "EEquippableSkinLevelItem::Randomizer",
    EEquippableSkinLevelItemSoundEffects = "EEquippableSkinLevelItem::SoundEffects",
    EEquippableSkinLevelItemTopFrag = "EEquippableSkinLevelItem::TopFrag",
    EEquippableSkinLevelItemTransformation = "EEquippableSkinLevelItem::Transformation",
    EEquippableSkinLevelItemVFX = "EEquippableSkinLevelItem::VFX",
    EEquippableSkinLevelItemVoiceover = "EEquippableSkinLevelItem::Voiceover",
}
