import React from 'react';
import WebView from 'react-native-webview';
import {logError, logInfo} from 'backend/utils/log-system/log-system';
import {useApi} from 'src/context/apiContext';
import {ApiResultType} from 'backend/valorant-api/api-result.ts';

export default function Login({navigation}: any) {
  const api = useApi();
  const webViewUrl =
    'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in%2F&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';

  async function handleNavigationStateChange(newNavState: {url: string}) {
    logInfo(newNavState.url);
    if (!newNavState.url.includes('#access_token')) {
      return;
    }

    let userResult = await api.getUserApi().createUser(newNavState.url, '');

    if (userResult.type === ApiResultType.FAILURE || !userResult.value) {
      logError('Rso: Failed to create user: ' + userResult.errorMessage);
      return;
    }

    api.getUserApi().setActiveUser(userResult.value);
    logInfo('Rso: Created user and set to active');

    navigation.navigate('Main');
  }

  return (
    <WebView
      source={{uri: webViewUrl}}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
}
