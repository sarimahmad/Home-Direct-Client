import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform,
  Text,
  TextInput
} from "react-native";
import Constants from "expo-constants";

import colors from "../../config/colors";

function HeaderWithLeftLogo({ headerText, rightMenuPress, searchPress, searchValue, backPress }) {

  return (
    <View style={styles.wrapper}>
      {searchValue &&  <TouchableHighlight
        style={styles.leftIconWrapper}
        onPress={searchValue ? searchPress : backPress}
        underlayColor={colors.white}>
        <Image source={require('../../assets/left.png')} style={styles.logo} />
      </TouchableHighlight>}
      {!searchValue ? <View style={styles.flex1Wrapper}>
        <View style={styles.headerTextWrapper}>
        <Image style={styles.headerLogoStyle} source={require('../../assets/logo.png')} />
        </View>
        <View style={styles.rightWrapper}>
          <TouchableHighlight
            style={styles.leftIconWrapper}
            onPress={searchPress}
            underlayColor={colors.white}>
            <Image source={require('../../assets/search.png')} style={styles.logo} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.leftIconWrapper}
            onPress={rightMenuPress}
            underlayColor={colors.white}>
            <Image source={require('../../assets/menu.png')} style={styles.menuLogo} />
          </TouchableHighlight>
        </View>
      </View> : <TextInput style={styles.textInputStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 44,
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: Constants.statusBarHeight
  },
  leftIconWrapper: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  logo: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain'
  },
  menuLogo: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  flex1Wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightWrapper: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 20
  },
  headerTextWrapper: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    fontFamily: Platform.OS === "android"
      ? "Roboto"
      : "Avenir"
  },
  textInputStyle: {
    fontSize: 15,
    borderRadius: 20,
    borderWidth: 0.3,
    borderColor: colors.black,
    height: 35,
    width: '80%',
    fontFamily: Platform.OS === "android"
      ? "Roboto"
      : "Avenir",
      paddingHorizontal: 10,
  },
  headerLogoStyle: {
    height: '90%',
    width: 130,
    resizeMode: 'contain',
  }
});

export default HeaderWithLeftLogo;
