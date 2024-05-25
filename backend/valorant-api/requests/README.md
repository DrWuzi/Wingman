# Requests

## Pre-game Endpoints
- [x] GET /pregame/v1/players/:puuid
- [x] GET /pregame/v1/matches/:pre-game match id
- [x] GET /pregame/v1/matches/:pre-game match id/loadouts
- [x] POST /pregame/v1/matches/:pre-game match id/select/:agent id
- [x] POST /pregame/v1/matches/:pre-game match id/lock/:agent id
- [x] POST /pregame/v1/matches/:pre-game match id/quit

## CoreGame Endpoints
- [x] GET /core-game/v1/players/:puuid
- [x] GET /core-game/v1/matches/:match id
- [x] GET /core-game/v1/matches/:match id/loadouts
- [x] POST /core-game/v1/players/:puuid/disassociate/:current game match id

## Contract Endpoints
- [x] GET /contract/v1/contracts/:puuid
- [x] GET /contract-definitions/v2/definitions/story
- [x] GET /contract-definitions/v3/item-upgrades
- [x] POST /contracts/v1/contracts/:puuid/special/:contactID

## Session Endpoints
- [x] GET /session/v1/sessions/${puuid}
- [x] GET /session/v1/sessions/${puuid}/reconnect

## Party Endpoints
- [x] GET /parties/v1/players/:puuid
- [x] GET /parties/v1/parties/:partyID
- [x] GET /parties/v1/parties/customgameconfigs
- [x] GET /parties/v1/parties/:partyID/muctoken
- [x] GET /parties/v1/parties/:partyID/voicetoken
- [x] POST /parties/v1/parties/:partyID/request/:requestID/decline
- [x] POST /parties/v1/parties/:partyID/matchmaking/join
- [x] POST /parties/v1/parties/:partyID/invites/name/:name/tag/:tag
- [x] POST /parties/v1/parties/:partyID/matchmaking/leave
- [x] POST /parties/v1/parties/:partyID/members/:puuid/refreshCompetitiveTier
- [x] POST /parties/v1/parties/:partyID/members/:puuid/refreshPings
- [x] POST /parties/v1/parties/:partyID/members/:puuid/refreshPlayerIdentity
- [x] POST /parties/v1/parties/:partyID/request
- [x] POST /parties/v1/parties/:partyID/startcustomgame
- [x] POST /parties/v1/parties/:partyID/members/:puuid/setReady
- [x] POST /parties/v1/parties/:partyID/customgamesetting
- [x] POST /parties/v1/parties/:partyID/accessibility
- [x] POST /parties/v1/parties/:partyID/queue

## Store Endpoints
- [x] GET /store/v1/offers
- [x] GET /store/v2/storefront/:puuid
- [x] GET /store/v1/wallet/:puuid
- [x] GET /store/v1/order/:orderID
- [x] GET /store/v1/entitlements/:puuid/:itemTypeID
