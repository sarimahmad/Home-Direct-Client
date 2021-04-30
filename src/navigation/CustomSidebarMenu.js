// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Fontisto } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import ListItem from '../components/lists/ListItem'
import colors from '../config/colors';
import Icon from "../components/Icon";

const CustomSidebarMenu = (props) => {

  const { user, logOut } = useAuth();
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(247, 242,242, 1)' }}>
      <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: 100, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(247, 242,242, 1)' }}>
        {/*Top Large Image */}
        <View style={styles.customItem}>
          <TouchableOpacity style={styles.RowView} activeOpacity={0.8} onPress={() => props.navigation.navigate('Account')}>
            <View style={styles.UserImageWrapper}>
              <FontAwesome name="user-circle-o" size={20} color={colors.white} />
            </View>
            <View style={styles.NameDetailWrapper}>
              <Text style={styles.Nametext}>
                Joseph
            </Text>
              <Text style={styles.EmailText}>
                Joseph@gmail.com
            </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.AbsoluteRightIcon}>
            <Fontisto name="angle-right" color={'black'} size={20} />
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <View style={{ backgroundColor: colors.white }}>
            <DrawerItemList {...props} />
          </View>
          <View style={styles.customItem}>
            <Icon
              name="logout"
              backgroundColor="#858585" />
            <View style={styles.NameDetailWrapper}>
              <Text style={styles.Nametext}>Logout</Text>
            </View>

            <View style={styles.AbsoluteRightIcon}>
              <Fontisto name="angle-right" color={'black'} size={20} />
            </View>
          </View>
        </DrawerContentScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 40,
  },
  RowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserImageWrapper: {
    height: 40,
    width: 40,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  NameDetailWrapper: {
    marginLeft: 15,
  },
  Nametext: {
    fontSize: 16,
    color: 'rgba(120, 120, 120, 1)',
    fontWeight: '400',
  },
  EmailText: {
    fontSize: 14,
    color: 'rgba(120, 120, 120, 1)',
    marginTop: 10,
  },
  AbsoluteRightIcon: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomSidebarMenu;
