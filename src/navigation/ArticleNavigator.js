import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import AccountScreen from "../screens/AccountScreen";
import AddNewScreen from '../screens/AddNewScreen';
import AddProjectScreen from '../screens/AddProjectScreen';
import ArticleCategoryScreen from "../screens/ArticleCategoryScreen";
import ToolsMaterialScreen from "../screens/ToolsMaterialScreen";
import ListingEditScreen from '../screens/ListingEditScreen'

const Stack = createStackNavigator();

const ArticleNavigator = () => (
  // when set to true the header title blocks the "contact seller" button 
  // this is a feature that will be hidden in Phase 1 and used in Phase 2 
  <Stack.Navigator  screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Home" component={ArticleCategoryScreen} />
    <Stack.Screen name="ArticleSub" component={ArticlesScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="AddNew" component={AddNewScreen} />
    <Stack.Screen name="AddProject" component={AddProjectScreen} />
    <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
    <Stack.Screen name="ToolsMaterial" component={ToolsMaterialScreen} />
    <Stack.Screen name="AddNewList" component={ListingEditScreen} />
  </Stack.Navigator>
);

export default ArticleNavigator;
