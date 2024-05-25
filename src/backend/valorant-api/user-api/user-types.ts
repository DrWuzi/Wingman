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

export interface IWallet {
    nextFetchTime?: number;
    Balances: {
        [x: string]: number;
    };
}

export interface IStore {
    nextFetchTime?: number;
    storeFront: IStorefrontResponse;
    prices: IPricesResponse;
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

export interface IPricesResponse {
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

export interface IStorefrontResponse {
    FeaturedBundle: {
        Bundle: {
            /** UUID */
            ID: string;
            /** UUID */
            DataAssetID: string;
            /** Currency ID */
            CurrencyID: string;
            Items: {
                Item: {
                    /** Item Type ID */
                    ItemTypeID: string;
                    /** Item ID */
                    ItemID: string;
                    Amount: number;
                };
                BasePrice: number;
                /** Currency ID */
                CurrencyID: string;
                DiscountPercent: number;
                DiscountedPrice: number;
                IsPromoItem: boolean;
            }[];
            ItemOffers:
                | {
                      /** UUID */
                      BundleItemOfferID: string;
                      Offer: {
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
                      };
                      DiscountPercent: number;
                      DiscountedCost: {
                          [x: string]: number;
                      };
                  }[]
                | null;
            TotalBaseCost: {
                [x: string]: number;
            } | null;
            TotalDiscountedCost: {
                [x: string]: number;
            } | null;
            TotalDiscountPercent: number;
            DurationRemainingInSeconds: number;
            WholesaleOnly: boolean;
        };
        Bundles: {
            /** UUID */
            ID: string;
            /** UUID */
            DataAssetID: string;
            /** Currency ID */
            CurrencyID: string;
            Items: {
                Item: {
                    /** Item Type ID */
                    ItemTypeID: string;
                    /** Item ID */
                    ItemID: string;
                    Amount: number;
                };
                BasePrice: number;
                /** Currency ID */
                CurrencyID: string;
                DiscountPercent: number;
                DiscountedPrice: number;
                IsPromoItem: boolean;
            }[];
            ItemOffers:
                | {
                      /** UUID */
                      BundleItemOfferID: string;
                      Offer: {
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
                      };
                      DiscountPercent: number;
                      DiscountedCost: {
                          [x: string]: number;
                      };
                  }[]
                | null;
            TotalBaseCost: {
                [x: string]: number;
            } | null;
            TotalDiscountedCost: {
                [x: string]: number;
            } | null;
            TotalDiscountPercent: number;
            DurationRemainingInSeconds: number;
            WholesaleOnly: boolean;
        }[];
        BundleRemainingDurationInSeconds: number;
    };
    SkinsPanelLayout: {
        SingleItemOffers: string[];
        SingleItemStoreOffers: {
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
        SingleItemOffersRemainingDurationInSeconds: number;
    };
    UpgradeCurrencyStore: {
        UpgradeCurrencyOffers: {
            /** UUID */
            OfferID: string;
            /** Item ID */
            StorefrontItemID: string;
            Offer: {
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
            };
            DiscountedPercent: number;
        }[];
    };
    AccessoryStore: {
        AccessoryStoreOffers: {
            Offer: {
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
            };
            /** UUID */
            ContractID: string;
        }[];
        AccessoryStoreRemainingDurationInSeconds: number;
        /** UUID */
        StorefrontID: string;
    };
    /** Night market */
    BonusStore?:
        | {
              BonusStoreOffers: {
                  /** UUID */
                  BonusOfferID: string;
                  Offer: {
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
                  };
                  DiscountPercent: number;
                  DiscountCosts: {
                      [x: string]: number;
                  };
                  IsSeen: boolean;
              }[];
              BonusStoreRemainingDurationInSeconds: number;
          }
        | undefined;
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
