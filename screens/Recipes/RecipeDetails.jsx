import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";

const RecipeDetails = ({ route }) => {
  const recipe = route.params.recipe;
  console.log(recipe);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: recipe.imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{recipe.name}</Text>
          <View style={styles.detail}>
            <Text style={styles.detail_header}>Ingredientes</Text>
            <Text>{recipe.ingredients}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detail_header}>Pasos</Text>
            <Text>{recipe.steps}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    gap: 10,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    marginTop: -35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20
  },
  detail: {
    marginTop: 20,
    borderColor: "#000000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  detail_header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 350,
    justifyContent: "center",
  },
});
