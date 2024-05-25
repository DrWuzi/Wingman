interface ICurrentGameLoadouts {
    Loadouts: {
        /** Character ID */
        CharacterID: string;
        Loadout: {
            /** Player UUID */
            Subject: string;
            Sprays: {
                SpraySelections: {
                    /** UUID */
                    SocketID: string;
                    /** UUID */
                    SprayID: string;
                    /** UUID */
                    LevelID: string;
                }[];
            };
            Expressions: {
                AESSelections: {
                    /** UUID */
                    SocketID: string;
                    /** UUID */
                    AssetID: string;
                    /** UUID */
                    TypeID: string;
                }[];
            };
            Items: {
                [x: string]: {
                    /** Item ID */
                    ID: string;
                    /** Item Type ID */
                    TypeID: string;
                    Sockets: {
                        [x: string]: {
                            /** UUID */
                            ID: string;
                            Item: {
                                /** Item ID */
                                ID: string;
                                /** Item Type ID */
                                TypeID: string;
                            };
                        };
                    };
                };
            };
        };
    }[];
}

export default ICurrentGameLoadouts;
