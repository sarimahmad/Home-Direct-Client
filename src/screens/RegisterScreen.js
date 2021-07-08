import React, { useState,useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';
import routes from "../navigation/routes";
export const isAndroid = () => Platform.OS === 'android';






const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

var firebaseConfig = {
  apiKey: "AIzaSyAs6ssK5TSFiLpXWzPO-XToFQ9ZFtTbMrk",
  authDomain: "home-direct-6d6d7.firebaseapp.com",
  projectId: "home-direct-6d6d7",
  storageBucket: "home-direct-6d6d7.appspot.com",
  messagingSenderId: "506238442675",
  appId: "1:506238442675:web:70c53d456e05ffe393a4c6",
  measurementId: "G-3TKGHBP8RE"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}




  
function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();


  useEffect(()=>{

  firebase.auth().onAuthStateChanged(user => {
    if (user!=null) {
      console.log("we are here ")
    }
    else{
      console.log("we are not here ")
    }
  })})
  

  async function signupGoogle () {

    const result = await Google.logInAsync({
      androidClientId:"506238442675-bpog1br5p76vh6h72haalp7mdtl9iiv0.apps.googleusercontent.com",
    iosClientId:"506238442675-1kv817kf4fl3st8g018u9uiib5abngil.apps.googleusercontent.com",
    scopes: ["profile", "email"]
  });
  if (result.type === "success") {
    const { idToken, accessToken, user } = result;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(response =>{
        console.log("SuccessFUll")
      })              
  }
  else{
  console.log("Error Again")
  }
  }
  
   async function loginWithFacebook() {

      await Facebook.initializeAsync({
        appId: '2863282947257393',
      });
    const { type, token } = await  Facebook.logInWithReadPermissionsAsync(
     {permissions: ['public_profile'] });
  
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch(error => {
          console.log(error)
        });
    }
    
  }
  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
      <TouchableOpacity
      onPress={()=> loginWithFacebook()} 
      style={{backgroundColor:'lightblue', width:320, alignSelf:'center', alignItems:"center", justifyContent:'center', height:50, borderRadius:22, marginBottom:200}}>
          <Text>FaceBook Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> signupGoogle()}
           style={{backgroundColor:'lightblue', width:320, alignSelf:'center', alignItems:"center", justifyContent:'center', height:50, borderRadius:22, marginBottom:150}}>
          <Text>Google Login</Text>


      </TouchableOpacity>
     
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
