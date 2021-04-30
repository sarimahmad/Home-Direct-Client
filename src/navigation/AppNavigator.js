import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from "../screens/AccountScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleCategoryScreen from "../screens/ArticleCategoryScreen";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import ListingEditScreen from '../screens/ListingEditScreen'
import useNotifications from "../hooks/useNotifications";
import CustomSidebarMenu from './CustomSidebarMenu';
import colors from "../config/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        component={ArticleCategoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const HomeScreenStack = ({ props }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Stack.Screen
        name="Home"
        component={TabStack}
      />
      <Stack.Screen
        name="ArticleSub"
        component={ArticlesScreen}
      />
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetailsScreen}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
      />
      <Stack.Screen
        name="AddNewList"
        component={ListingEditScreen}
      />
      <Stack.Screen
        name="Account"
        options={{headerShown: true}}
        component={AccountScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  useNotifications();

  return (

    <Drawer.Navigator
      drawerPosition="right"
      drawerContentOptions={{
        itemStyle: { marginVertical: 5 },
        activeTintColor: colors.white,
        labelStyle: {
          color: 'black',
        },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="home" color={focused ? '#e03c1f' : '#0a0808'} size={size} />
          )
        }}
        component={HomeScreenStack} />
      <Drawer.Screen
        name="Lists"
        options={{
          title: 'Lists',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={focused ? '#e03c1f' : '#0a0808'} size={size} />
          )
        }}
        component={HomeScreenStack} />
    </Drawer.Navigator>

  );
};

export default AppNavigator;
