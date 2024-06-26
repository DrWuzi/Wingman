interface IPlayerLoadout {
    /** Player UUID */
    Subject: string;
    Version: number;
    Guns: {
        /** UUID */
        ID: string;
        /** UUID */
        CharmInstanceID?: string | undefined;
        /** UUID */
        CharmID?: string | undefined;
        /** UUID */
        CharmLevelID?: string | undefined;
        /** UUID */
        SkinID: string;
        /** UUID */
        SkinLevelID: string;
        /** UUID */
        ChromaID: string;
        Attachments: unknown[];
    }[];
    Sprays: {
        /** UUID */
        EquipSlotID: string;
        /** UUID */
        SprayID: string;
        SprayLevelID: null;
    }[];
    Identity: {
        /** UUID */
        PlayerCardID: string;
        /** UUID */
        PlayerTitleID: string;
        AccountLevel: number;
        /** UUID */
        PreferredLevelBorderID: string;
        HideAccountLevel: boolean;
    };
    Incognito: boolean;
}

export default IPlayerLoadout;
