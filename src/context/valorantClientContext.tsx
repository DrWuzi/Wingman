import React, {createContext, ReactNode, useContext} from 'react';
import ValorantClient from '../../backend/api/clients/valorant-client';

interface ValorantClientContextProps {
    client: ValorantClient;
}

const ValorantClientContext = createContext<ValorantClientContextProps | undefined>(undefined);

export const ValorantClientProvider: React.FC<{client: ValorantClient; children: ReactNode}> = ({client, children}) => {
    return <ValorantClientContext.Provider value={{client}}>{children}</ValorantClientContext.Provider>;
};

export const useValorantClient = () => {
    const context = useContext(ValorantClientContext);
    if (!context) {
        throw new Error('useValorantClient must be used within an ValorantClientProvider');
    }
    return context.client;
};
