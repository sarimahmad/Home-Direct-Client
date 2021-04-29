import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleCategoryScreen from "../screens/ArticleCategoryScreen";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import ListingEditScreen from '../screens/ListingEditScreen'
import useNotifications from "../hooks/useNotifications";
import CustomSidebarMenu from './CustomSidebarMenu';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const TabStack = () => {
  return (
    <Tab.Navigator>
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

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Stack.Screen
        name="TabStack"
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
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="home" color={focused ? '#e03c1f' : '#0a0808' } size={size} />
          )
        }}
        component={HomeScreenStack} />
      <Drawer.Screen
        name="Lists"
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={focused ? '#e03c1f' : '#0a0808'} size={size} />
          )
        }}
        component={firstScreenStack} />
    </Drawer.Navigator>

  );
};

export default AppNavigator;
