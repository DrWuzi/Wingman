interface IPartyPlayer {
    /** Player UUID */
    Subject: string;
    Version: number;
    /** Party ID */
    CurrentPartyID: string;
    Invites: null;
    Requests: {
        ID: string;
        /** Party ID */
        PartyID: string;
        /** Player UUID */
        RequestedBySubject: string;
        Subjects: string[];
        /** Date in ISO 8601 format */
        CreatedAt: string;
        /** Date in ISO 8601 format */
        RefreshedAt: string;
        ExpiresIn: number;
    }[];
    PlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}

export default IPartyPlayer;
