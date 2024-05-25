import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Loading, Profile, SignIn} from '../screens/Screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignInProps} from '../screens/Auth/SignIn.tsx';
import { logDebug } from '../../backend/utils/log-system/log-system.ts';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  SignIn: SignInProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

interface NavigatorProps {}

export default function Navigator(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  function changeIsLoggedIn(value: boolean): void {
    logDebug("Navigator: Setting is logged in to " + value);
    setIsLoggedIn(value);
  }

  return (
    <NavigationContainer>
      {!isLoading ? (
        <>
          {isLoggedIn ? (
            // Screens for authenticated users
            <Tab.Navigator screenOptions={{headerShown: false}}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          ) : (
            // Auth screens
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Group>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  initialParams={{changeIsLoggedIn}}
                />
                {/*<Stack.Screen name="SignUp" component={SignUp} />*/}
              </Stack.Group>
            </Stack.Navigator>
          )}
        </>
      ) : (
        <Loading onChange={b => setIsLoading(b)} />
      )}
    </NavigationContainer>
  );
}
