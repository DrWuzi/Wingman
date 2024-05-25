import React, {createContext, ReactNode, useContext} from 'react';
import ValorantApi from '../../backend/valorant-api/api';

interface ApiContextProps {
  api: ValorantApi;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{api: ValorantApi; children: ReactNode}> = ({
  api,
  children,
}) => {
  return <ApiContext.Provider value={{api}}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context.api;
};
