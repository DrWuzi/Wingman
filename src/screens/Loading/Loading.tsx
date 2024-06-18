import React from 'react';
import {Text, View} from '../../theme/theme';
import {useApi} from '../../context/apiContext';
import CookieManager from '@react-native-cookies/cookies';
import {initLogSystem} from '../../../backend/utils/log-system/log-system';

interface LoadingProps {
    onChange: (v: boolean) => void;
}

export default function Loading(props: Readonly<LoadingProps>): React.JSX.Element {
    const api = useApi();

    React.useEffect(() => {
        async function initAPI() {
            await CookieManager.clearAll();
            await initLogSystem(true, false);
            await api.init();
            setTimeout(() => {
                props.onChange(false);
            }, 1000);
        }

        initAPI();
    }, []);

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}
