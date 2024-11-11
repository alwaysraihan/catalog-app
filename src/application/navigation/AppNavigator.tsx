import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FunctionComponent} from 'react';

import React from 'react';
import {BottomTabNavigator} from './BottomTabNavigator';

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export const AppNavigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="MainApp"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
