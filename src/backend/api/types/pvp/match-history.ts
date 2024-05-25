interface IMatchHistory {
    /** Player UUID */
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: {
        /** Match ID */
        MatchID: string;
        /** Milliseconds since epoch */
        GameStartTime: number;
        /** Queue ID */
        QueueID: string;
    }[];
}

export default IMatchHistory;
