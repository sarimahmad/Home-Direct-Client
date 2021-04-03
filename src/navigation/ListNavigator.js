import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const ListNavigator = () => (
  // when set to true the header title blocks the "contact seller" button 
  // this is a feature that will be hidden in Phase 1 and used in Phase 2 
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default ListNavigator;
