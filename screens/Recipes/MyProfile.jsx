import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from "react-native";
import RecipeCard from "./RecipeCard";
import { useAuth } from '../../AuthContext';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { collection, query, where, getDocs, getFirestore } from "../../firebase";

const MyProfile = ({ user, auth }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const navigation = useNavigation();
  const { currentUser, logout } = useAuth()  

  useFocusEffect(
    useCallback(() => {
      if (currentUser && currentUser.uid) {
        const fetchRecipes = async () => {
          const db = getFirestore();
          const q = query(
            collection(db, "recipes"),
            where("userId", "==", currentUser.uid)
          );

          try {
            const querySnapshot = await getDocs(q);
            const recipesArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMyRecipes(recipesArray);
          } catch (error) {
            console.error("Error fetching recipes:", error);
          }
        };

        fetchRecipes();
      }
    }, [currentUser])
  );


  const handleSignOut = async () => {
    try {
      await logout(); // Utiliza la función de logout proporcionada por el contexto
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };


  const handleEditRecipe = (selectedRecipe) => {
    navigation.navigate("EditRecipe", { selectedRecipe });
  };


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.profile_text}>{user.email}</Text>
        <TouchableOpacity
          style={[styles.profile_button, { backgroundColor: "#05258E" }]}
          onPress={handleSignOut}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mis Recetas</Text>

      <SafeAreaView style={styles.list}>
        <FlatList
          data={myRecipes}
          renderItem={({ item }) => <RecipeCard recipe={item} controls={true} handleEditRecipe={handleEditRecipe} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  list: {
    width: "100%",
    padding: 20,
  },
  profile: {
    width: "100%",
    height: 80,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 20,
  },
  profile_text: {
    borderColor: "#05258E",
    color: '#05258E',
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    paddingVertical: 4
  },
  profile_button: {
    width: 120,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    // marginTop: 50 // Esto se ha eliminado para corregir la alineación
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
});
