import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import ArticleNavigator from "./ArticleNavigator";
import ListNavigator from "./ListNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator>
    <Tab.Screen
        name="Home"
        component={ArticleNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Listings"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          // tabBarButton: () => (
          //   <NewListingButton
          //     onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          //   />
          // ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;