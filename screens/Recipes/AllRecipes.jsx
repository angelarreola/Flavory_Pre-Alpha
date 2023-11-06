import { FlatList, StyleSheet, Text, View, StatusBar } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, {useEffect, useState, useCallback} from "react";

import RecipeCard from "./RecipeCard";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const AllRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  console.log(user.email);

  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async () => {
        const db = getFirestore();
        const q = query(collection(db, "recipes"));

        try {
          const querySnapshot = await getDocs(q);

          const recipesArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecipes(recipesArray);

          console.log(recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };

      fetchRecipes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas</Text>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              author={item.userId}
              controls={false}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default AllRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    marginTop: StatusBar.currentHeight + 10 || 0,
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
});
