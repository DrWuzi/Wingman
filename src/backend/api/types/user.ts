import IWallet from './store/wallet';
import IPrices from './store/prices';
import IStorefront from './store/storefront';

export interface IUser {
    accountInfo: IAccountInfo;
    authData: IAuthData;

    accountXp?: IAccountXp;
    wallet?: IWallet;
    store?: IStore;
    ownedItems?: IOwnedItems;
}

export interface IAuthData {
    cookies: string;
    accessToken: string;
    entitlementsToken: string;
    idToken: string;
    ssid: string;
    expiresAt: string;
}

export interface IAccountXp {
    nextFetchTime?: number;
    Version: number;
    /** Player UUID */
    Subject: string;
    Progress: {
        Level: number;
        XP: number;
    };
    History: {
        /** Match ID */
        ID: string;
        /** Date in ISO 8601 format */
        MatchStart: string;
        StartProgress: {
            Level: number;
            XP: number;
        };
        EndProgress: {
            Level: number;
            XP: number;
        };
        XPDelta: number;
        XPSources: {
            ID: 'time-played' | 'match-win' | 'first-win-of-the-day';
            Amount: number;
        }[];
        XPMultipliers: unknown[];
    }[];
    /** Date in ISO 8601 format */
    LastTimeGrantedFirstWin: string;
    /** Date in ISO 8601 format */
    NextTimeFirstWinAvailable: string;
}

export interface IStore {
    nextFetchTime?: number;
    storeFront: IStorefront;
    prices: IPrices;
}

export interface IOwnedItems {
    nextFetchTime?: number;
    agents: string[];
    contracts: string[];
    sprays: string[];
    gunBuddies: string[];
    cards: string[];
    skins: string[];
    skinVariants: string[];
    titles: string[];
}

export interface IAccessTokenInfo {
    pp: {
        c: string;
    };
    sub: string;
    scp: string[];
    clm: string[];
    dat: {
        p: string | null;
        r: string;
        c: string;
        u: number;
        lid: string;
    };
    iss: string;
    plt: {
        dev: string;
        id: string;
    };
    exp: number;
    iat: number;
    jti: string;
    cid: string;
}

export interface IIdTokenInfo {
    at_hash: string;
    sub: string;
    country: string;
    player_plocale: string | null;
    country_at: number;
    amr: string[];
    iss: string;
    lol: {
        cuid: number;
        cpid: string;
        uid: number;
        uname: string;
        ptrid: string | null;
        pid: string;
        state: string;
    }[];
    phone_number_verified: boolean;
    locale: string;
    nonce: string;
    account_verified: boolean;
    aud: string;
    acr: string;
    lol_region: string | null;
    player_locale: string;
    exp: number;
    iat: number;
    acct: {
        game_name: string;
        tag_line: string;
    };
    age: number;
    jti: string;
    login_country: string;
}

export interface IAccountInfo extends IAccessTokenInfo, IIdTokenInfo {}
