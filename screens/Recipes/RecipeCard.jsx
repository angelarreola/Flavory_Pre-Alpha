import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import React from "react";

import { useNavigation } from "@react-navigation/native";

export default function RecipeCard({ recipe, controls, handleEditRecipe }) {
  const navigation = useNavigation();

  const showRecipeDetails = () => {
    navigation.navigate("RecipeDetails", {recipe});
  }

  return (
    <TouchableOpacity onPress={!controls ? showRecipeDetails : null} style={{ flex: 1 }} activeOpacity={!controls ? 0.4 : 1}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={{ uri: recipe.imageUrl }}
          resizeMode="cover"
          borderRadius={10}
        >
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTextTitle}>{recipe.name}</Text>
            <Text style={styles.recipeTextDesc}>
              Receta de: {recipe.username}
            </Text>
            <TouchableOpacity
              style={controls ? styles.editBtn : { display: "none" }}
              onPress={() => handleEditRecipe(recipe)}
            >
              <Feather name="edit" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  recipeInfo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000099",
    borderRadius: 10,
  },
  recipeTextTitle: {
    color: "#FF893C",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 10,
  },
  recipeTextDesc: {
    flex: 1,
    bottom: 15,
    marginTop: 50,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  editBtn: {
    position: "absolute",
    top: 8,
    right: 10,
  },
});
