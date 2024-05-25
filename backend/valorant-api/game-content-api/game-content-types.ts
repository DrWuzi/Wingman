import {Weapon} from '../../api/types/game-content/Weapons/Weapons';
import {Spray} from '../../api/types/game-content/Sprays/Sprays';
import {PlayerCard} from '../../api/types/game-content/PlayerCards/PlayerCards';
import {IAgent} from '../../api/types/game-content/Agents/Agents';
import {Buddie} from '../../api/types/game-content/Buddies/Buddies';
import {Bundle} from '../../api/types/game-content/Bundles/Bundles';
import {Ceremonie} from '../../api/types/game-content/Ceremonies/Ceremonies';
import {CompetitiveTier} from '../../api/types/game-content/CompetitiveTiers/CompetitiveTiers';
import {ContentTier} from '../../../frontend/types/Interfaces';
import {Contract} from '../../api/types/game-content/Contracts/Contracts';
import {Currencie} from '../../api/types/game-content/Currencies/Currencies';
import {Gamemode} from '../../api/types/game-content/Gamemodes/Gamemodes';
import {Gear} from '../../api/types/game-content/Gear/Gear';
import {LevelBorder} from '../../api/types/game-content/LevelBorders/LevelBorders';
import {IMap} from '../../api/types/game-content/Maps/Maps';
import {PlayerTitle} from '../../api/types/game-content/PlayerTitles/PlayerTitles';
import {Season} from '../../api/types/game-content/Seasons/Seasons';
import {Theme} from '../../api/types/game-content/Themes/Themes';

export interface IGameContent {
    version?: {
        riotClientBuild: string;
        riotClientVersion: string;
    };

    agents?: IAgent[];
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
    maps?: IMap[];
    playerCards?: PlayerCard[];
    playerTitles?: PlayerTitle[];
    seasons?: Season[];
    sprays?: Spray[];
    themes?: Theme[];
    weapons?: Weapon[];
    ranks?: {};
}
