import {
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import React, { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, getAuth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const uri =
  "https://isorepublic.com/wp-content/uploads/2018/11/isorepublic-background-kitchen-1100x733.jpg";
import ChefsitoLogo from "../assets/chefsitoLogo.png";

const LogInScreen = () => {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario está logueado, puedes redirigir a la pantalla principal o realizar otras acciones.
        console.log('logueado!');
        navigation.navigate("Home");
      } else {
        // El usuario no está logueado, permanece en la pantalla de inicio de sesión o muestra la pantalla de autenticación.
      }
    });

    // Desmontar el listener cuando el componente se desmonte
    return unsubscribe;
  }, []);



  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Account Created!");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in!");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={80}>
          <View style={styles.login}>
            <Image source={ChefsitoLogo} style={styles.logo} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#FFFFFF",
                letterSpacing: 5,
                marginTop: 5,
                marginBottom: 40,
              }}
            >
              FLAVORY
            </Text>

            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "400", color: "#FFFFFF" }}
              >
                E-mail
              </Text>
              <TextInput
                style={styles.input}
                placeholder="angelarreolagg@gmail.com"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "400", color: "#FFFFFF" }}
              >
                Password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF893C" }]}
              onPress={handleSignIn}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Log In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#263238" }]}
              onPress={handleCreateAccount}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Create New Account
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 500,
    borderColor: "#FFC",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 100,
    marginTop: 8,
  },
  input: {
    width: 270,
    height: 40,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFFFFF90",
    marginBottom: 20,
  },
  button: {
    width: 270,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
