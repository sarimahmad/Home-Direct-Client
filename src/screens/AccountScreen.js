import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Fontisto } from "@expo/vector-icons";

import colors from "../config/colors";
import Screen from "../components/Screen";


function AccountScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('Joseph@gmail.com');



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.TopImageWrapper} onPress={() => pickImage()}>
          {image ? <Image source={{ uri: image }} style={styles.InnerImage} /> : <Text style={styles.TextStyle}>
            JS
        </Text>}
        </TouchableOpacity>
        <Text style={styles.EditText}>edit</Text>
        <Text style={styles.FieldTitle}>
          Full Name
        </Text>
        <TextInput style={styles.TextInputStyle} placeholder={'Joseph'} onChangeText={(text) => setName(text)} value={name} />
        <Text style={styles.FieldTitle}>
          Email
        </Text>
        <View style={styles.TextInputStyle}>
          <TextInput editable={false} placeholder={'Joseph@gmail.com'} onChangeText={(text) => setEmail(text)} value={email} />
          <View style={styles.AbsoluteRighticon}>
            <Fontisto name="angle-right" color={'black'} size={15} />
          </View>
        </View>
        <Text style={styles.FieldTitle}>
          Password
        </Text>
        <View style={styles.TextInputStyle}>
          <Text style={styles.changePswd}>Change Password</Text>
        </View>

        <View style={[styles.TextInputStyle, {marginTop: 30}]}>
          <Text style={[styles.changePswd, {color: 'red'}]}>Delete Account</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
    flex: 1,
  },
  TopImageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  InnerImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  TextStyle: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  EditText: {
    fontSize: 15,
    color: colors.blue,
    alignSelf: 'center',
    marginTop: 15,
  },
  FieldTitle: {
    fontSize: 15,
    color: 'rgba(120, 120, 120, 1)',
    marginTop: 30,
    marginLeft: 10,
  },
  TextInputStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    marginTop: 5,
    height: 40,
  },
  AbsoluteRighticon: {
    position: 'absolute',
    right: 10,
  },
  changePswd: {
    fontSize: 15,
    color: 'rgba(120, 120, 120, 1)',
    alignSelf: 'center',
    textAlign: 'center',
  }
});

export default AccountScreen;
