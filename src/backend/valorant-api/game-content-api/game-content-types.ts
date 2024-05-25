import {Weapon} from "../../../types/valorant-api.com/Weapons/Weapons";
import {Spray} from "../../../types/valorant-api.com/Sprays/Sprays"
import {PlayerCard} from "../../../types/valorant-api.com/PlayerCards/PlayerCards";
import {Agent} from "../../../types/valorant-api.com/Agents/Agents";
import {Buddie} from "../../../types/valorant-api.com/Buddies/Buddies";
import {Bundle} from "../../../types/valorant-api.com/Bundles/Bundles";
import {Ceremonie} from "../../../types/valorant-api.com/Ceremonies/Ceremonies";
import {CompetitiveTier} from "../../../types/valorant-api.com/CompetitiveTiers/CompetitiveTiers";
import {ContentTier} from "../../../frontend/types/Interfaces";
import {Contract} from "../../../types/valorant-api.com/Contracts/Contracts";
import {Currencie} from "../../../types/valorant-api.com/Currencies/Currencies";
import {Gamemode} from "../../../types/valorant-api.com/Gamemodes/Gamemodes";
import {Gear} from "../../../types/valorant-api.com/Gear/Gear";
import {LevelBorder} from "../../../types/valorant-api.com/LevelBorders/LevelBorders";
import {Map} from "../../../types/valorant-api.com/Maps/Maps";
import {PlayerTitle} from "../../../types/valorant-api.com/PlayerTitles/PlayerTitles";
import {Season} from "../../../types/valorant-api.com/Seasons/Seasons";
import {Theme} from "../../../types/valorant-api.com/Themes/Themes";

export interface IGameContent {
    version?: {
        riotClientBuild: string;
        riotClientVersion: string;
    };

    agents?: Agent[];
    buddies?: Buddie[];
    bundles?: Bundle[];
    ceremonies?: Ceremonie[];
    competitiveTiers?: CompetitiveTier[];
    contentTiers?: ContentTier[];
    contracts?: Contract[];
    currencies?: Currencie[];
    events?: Event[];
    gameModes?: Gamemode[];
    gears?: Gear[];
    levelBorders?: LevelBorder[];
    maps?: Map[];
    playerCards?: PlayerCard[];
    playerTitles?: PlayerTitle[];
    seasons?: Season[];
    sprays?: Spray[];
    themes?: Theme[];
    weapons?: Weapon[];
    ranks?: {};
}
