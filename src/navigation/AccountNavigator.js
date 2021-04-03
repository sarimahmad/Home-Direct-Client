import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;


// const Drawer = createDrawerNavigator();

// const AccountNavigator = () => (
//       <Drawer.Navigator mode="modal" screenOptions={{ headerShown: true }}>
//       {/* <Drawer.Navigator initialRouteName="Home"> */}
//          <Drawer.Screen name="Account" component={AccountScreen} />
//          <Drawer.Screen name="Messages" component={MessagesScreen} />
//       </Drawer.Navigator>
// );

// export default AccountNavigator;












