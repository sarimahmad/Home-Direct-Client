import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ToolsMaterialScreen from "../screens/ToolsMaterialScreen";
import ListingEditScreen from '../screens/ListingEditScreen';
import AddNewScreen from '../screens/AddNewScreen';

const Stack = createStackNavigator();

const ListNavigator = () => (
  // when set to true the header title blocks the "contact seller" button 
  // this is a feature that will be hidden in Phase 1 and used in Phase 2 
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ToolsMaterial" component={ToolsMaterialScreen} />
    <Stack.Screen name="AddNewList" component={ListingEditScreen} />
    <Stack.Screen name="AddNew" component={AddNewScreen} />
  </Stack.Navigator>
);

export default ListNavigator;
