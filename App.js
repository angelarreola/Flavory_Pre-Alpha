import React from 'react'
import { StyleSheet } from 'react-native';

import LogInScreen from './screens/LogInScreen'
import HomeScreen from './screens/HomeScreen'
import AddRecipe from './screens/Recipes/AddRecipe';
import RecipeDetails from './screens/Recipes/RecipeDetails';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EditRecipe" component={AddRecipe} options={{headerShown: false}}/>
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
