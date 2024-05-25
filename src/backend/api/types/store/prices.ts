interface IPrices {
    Offers: {
        OfferID: string;
        IsDirectPurchase: boolean;
        /** Date in ISO 8601 format */
        StartDate: string;
        Cost: {
            [x: string]: number;
        };
        Rewards: {
            /** Item Type ID */
            ItemTypeID: string;
            /** Item ID */
            ItemID: string;
            Quantity: number;
        }[];
    }[];
}

export default IPrices;
