interface ILeaderboard {
    Deployment: string;
    /** Queue ID */
    QueueID: string;
    /** Season ID */
    SeasonID: string;
    Players: {
        /** Card ID */
        PlayerCardID: string;
        /** Title ID */
        TitleID: string;
        IsBanned: boolean;
        IsAnonymized: boolean;
        /** Player UUID */
        puuid: string;
        gameName: string;
        tagLine: string;
        leaderboardRank: number;
        rankedRating: number;
        numberOfWins: number;
        competitiveTier: number;
    }[];
    totalPlayers: number;
    immortalStartingPage: number;
    immortalStartingIndex: number;
    topTierRRThreshold: number;
    tierDetails: {
        [x: string]: {
            rankedRatingThreshold: number;
            startingPage: number;
            startingIndex: number;
        };
    };
    startIndex: number;
    query: string;
}

export default ILeaderboard;
