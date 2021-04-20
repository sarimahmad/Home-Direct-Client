import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer'
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
const Drawer = createDrawerNavigator();


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
    </Tab.Navigator>

    
    //     <Drawer.Screen
    //           name="Account"
    //           component={AccountNavigator}
    //           options={{
    //             tabBarIcon: ({ color, size }) => (
    //               <MaterialCommunityIcons 
    //               name="menu" 
    //               color={color} 
    //               size={size} />
    //             ),
    //           }}
    //     />
    
  
  );
};

export default AppNavigator;
