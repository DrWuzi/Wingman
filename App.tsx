import React from 'react';

import {ThemeProvider} from './src/theme/theme';
import Navigator from './src/navigation/Navigator';
import {CatppuccinTheme} from './src/theme/CatppuccinTheme/Catppuccin.ts';
import {ApiProvider} from './src/context/apiContext.tsx';
import ValorantApi from './backend/valorant-api/api.ts';
import {ValorantClientProvider} from './src/context/valorantClientContext.tsx';
import ValorantClient from './backend/api/clients/valorant-client.ts';
import GameContentClient from './backend/api/clients/game-content-client.ts';
import { GameContentClientProvider } from './src/context/gameContentClientContext.tsx';

function App(): React.JSX.Element {
  const valorantApi = new ValorantApi();
  const gameContentClient = new GameContentClient();
  const valorantClient = new ValorantClient(gameContentClient);

  return (
    <ThemeProvider initialTheme={CatppuccinTheme.Mocha}>
      <ApiProvider api={valorantApi}>
        <GameContentClientProvider client={gameContentClient}>
          <ValorantClientProvider client={valorantClient}>
            <Navigator />
          </ValorantClientProvider>
        </GameContentClientProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
