import React, { useState } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';

export const isAndroid = () => Platform.OS === 'android';

const validationSchema = Yup.object().shape({
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

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 200,
    height: 42,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
