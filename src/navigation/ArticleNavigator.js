import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";

const Stack = createStackNavigator();

const ArticleNavigator = () => (
  // when set to true the header title blocks the "contact seller" button 
  // this is a feature that will be hidden in Phase 1 and used in Phase 2 
  <Stack.Navigator  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={ArticlesScreen} />
    <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
  </Stack.Navigator>
);

export default ArticleNavigator;
