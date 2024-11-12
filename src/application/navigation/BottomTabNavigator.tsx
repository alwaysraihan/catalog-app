import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStack} from './stack/HomeStack';
import {CartScreen, HistoryScreen, LocationScreen} from '@FoodMamaPresentation';
import {useSelector} from 'react-redux';
import {RootState} from '../storage';
import { colors } from '../@global';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const TabIcons = {
  HomeIcon: (props: {color: string; size: number}) => (
    <Icon name="home" size={props.size} color={props.color} />
  ),
  CartIcon: (props: {color: string; size: number}) => (
    <Icon name="cart" size={props.size} color={props.color} />
  ),
  LocationIcon: (props: {color: string; size: number}) => (
    <Icon name="map-marker" size={props.size} color={props.color} />
  ),
  HistoryIcon: (props: {color: string; size: number}) => (
    <Icon name="history" size={props.size} color={props.color} />
  ),
  ProfileIcon: (props: {color: string; size: number}) => (
    <Icon name="account" size={props.size} color={props.color} />
  ),
};

export const BottomTabNavigator = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:colors.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },

        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: TabIcons.HomeIcon,
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          tabBarIcon: TabIcons.LocationIcon,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: TabIcons.CartIcon,
          tabBarBadge: cart.items.length,
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: TabIcons.HistoryIcon,
        }}
      />
    </Tab.Navigator>
  );
};
