import React, {createContext, ReactNode, useContext} from 'react';
import GameContentClient from '../../backend/api/clients/game-content-client';

interface GameContentClientContextProps {
  client: GameContentClient;
}

const GameContentClientContext = createContext<
GameContentClientContextProps | undefined
>(undefined);

export const GameContentClientProvider: React.FC<{
  client: GameContentClient;
  children: ReactNode;
}> = ({client, children}) => {
  return (
    <GameContentClientContext.Provider value={{client}}>
      {children}
    </GameContentClientContext.Provider>
  );
};

export const useGameContentClient = () => {
  const context = useContext(GameContentClientContext);
  if (!context) {
    throw new Error(
      'useGameContentClient must be used within an GameContentClientProvider',
    );
  }
  return context.client;
};
