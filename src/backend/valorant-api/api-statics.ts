export default {
    api: {
        client_platform: {
            platformType: 'PC',
            platformOS: 'Windows',
            platformOSVersion: '10.0.19043.1.256.64bit',
            platformChipset: 'Unknown',
        },
    },

    authApi: {
        apiEndpoints: {
            authUrl: 'https://auth.riotgames.com/api/v1/authorization',
            entitlementsUrl: 'https://entitlements.auth.riotgames.com/api/token/v1',
            userInfoUrl: 'https://auth.riotgames.com/userinfo',
            reAuthUrl:
                'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1',
        },

        filePaths: {
            users: 'users',
        },

        authCookiesBody: {
            client_id: 'play-valorant-web-prod',
            nonce: '1',
            redirect_uri: 'https://playvalorant.com/opt_in',
            response_type: 'token id_token',
            scope: 'account openid',
        },
    },

    gameContentApi: {
        defaultClientVersions: {
            riotClientBuild: 'release-07.09-shipping-8-1022235',
            riotClientVersion: '75.0.9.703.1813',
        },

        filePaths: {
            gameContent: 'game-content',
        },

        mapUuidBlackList: [
            'ee613ee9-28b7-4beb-9666-08db13bb2244', // training range
        ],

        gameContentApiEndpoints: {
            version: 'https://valorant-api.com/v1/version',

            agents: 'https://valorant-api.com/v1/agents',
            buddies: 'https://valorant-api.com/v1/buddies',
            bundles: 'https://valorant-api.com/v1/bundles',
            ceremonies: 'https://valorant-api.com/v1/ceremonies',
            competitiveTiers: 'https://valorant-api.com/v1/competitivetiers',
            contentTiers: 'https://valorant-api.com/v1/contenttiers',
            contracts: 'https://valorant-api.com/v1/contracts',
            currencies: 'https://valorant-api.com/v1/currencies',
            events: 'https://valorant-api.com/v1/events',
            gameModes: 'https://valorant-api.com/v1/gamemodes',
            gear: 'https://valorant-api.com/v1/gear',
            levelBorders: 'https://valorant-api.com/v1/levelborders',
            maps: 'https://valorant-api.com/v1/maps',
            playerCards: 'https://valorant-api.com/v1/playercards',
            playerTitles: 'https://valorant-api.com/v1/playertitles',
            seasons: 'https://valorant-api.com/v1/seasons',
            sprays: 'https://valorant-api.com/v1/sprays',
            themes: 'https://valorant-api.com/v1/themes',
            weapons: 'https://valorant-api.com/v1/weapons',
            ranks: 'https://valorant-api.com/v1/ranks',
        },
    },
};
