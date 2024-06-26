export enum ItemTypeID {
    AGENTS = '01bb38e1-da47-4e6a-9b3d-945fe4655707',
    CONTRACTS = 'f85cb6f7-33e5-4dc8-b609-ec7212301948',
    SPRAYS = 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475',
    GUN_BUDDIES = 'dd3bf334-87f3-40bd-b043-682a57a8dc3a',
    CARDS = '3f296c07-64c3-494c-923b-fe692a4fa1bd',
    SKINS = 'e7c63390-eda7-46e0-bb7a-a6abdacd2433',
    SKIN_VARIANTS = '3ad1b2b2-acdb-4524-852f-954a76ddae0a',
    TITLES = 'de7caa6b-adf7-4588-bbd1-143831e786c6',
}

export interface IEntitlement {
    /** UUID of the item type */
    TypeID: ItemTypeID;
    /** Item ID */
    ItemID: string;
    /** UUID */
    InstanceID?: string | undefined;
}

export interface IEntitlementByType {
    ItemTypeID: string;
    Entitlements: IEntitlement[];
}

interface IOwnedItems {
    EntitlementsByTypes: IEntitlementByType[];
}

export default IOwnedItems;
