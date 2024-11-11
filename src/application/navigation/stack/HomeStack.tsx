import {HomeScreen} from '@FoodMamaPresentation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';

export const HomeStack: FunctionComponent = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
