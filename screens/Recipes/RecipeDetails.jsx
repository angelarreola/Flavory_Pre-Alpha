import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RecipeDetails = ({route}) => {
    const recipe = route.params.recipe
    console.log(recipe);
  return (
    <View>
      <Text>RecipeDetails</Text>
    </View>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
