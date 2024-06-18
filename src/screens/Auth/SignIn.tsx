import React from 'react';
import WebView from 'react-native-webview';
import {logDebug, logError, logInfo} from '../../../backend/utils/log-system/log-system';
import {useApi} from '../../context/apiContext';
import {ApiResultType} from '../../../backend/valorant-api/api-result.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigator.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export interface SignInProps {
    changeIsLoggedIn: (v: boolean) => void;
}

export default function SignIn({navigation, route}: Readonly<Props>) {
    const api = useApi();

    if (api.getUserApi().getActiveUser()) {
        logInfo('SignIn: User already found');
        route.params.changeIsLoggedIn(true);
        return;
    }

    const webViewUrl =
        'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in%2F&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';

    async function handleNavigationStateChange(newNavState: {url: string}) {
        try {
            logDebug(newNavState.url);

            if (!newNavState.url.includes('#access_token')) {
                logDebug('SignIn: Access Token missing in url');
                return;
            }

            let userResult = await api.getUserApi().createUser(newNavState.url, '');

            if (userResult.type === ApiResultType.FAILURE || !userResult.value) {
                logError('Rso: Failed to create user: ' + userResult.errorMessage);
                return;
            }

            api.getUserApi().setActiveUser(userResult.value);
            logInfo('Rso: Created user and set to active');

            // TODO: Navigate to main screen but with Context
            //navigation.navigate('Main');
            route.params.changeIsLoggedIn(true);
        } catch (e) {
            logError('SignIn: Skill issue detected: ' + e);
        }
    }

    return <WebView source={{uri: webViewUrl}} onNavigationStateChange={handleNavigationStateChange} />;
}
