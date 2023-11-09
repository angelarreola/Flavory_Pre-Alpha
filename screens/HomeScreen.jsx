import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome, Entypo } from "@expo/vector-icons";

import AllRecipes from "./Recipes/AllRecipes";
import MyProfile from "./Recipes/MyProfile";
import AddRecipe from "./Recipes/AddRecipe";

import { useAuth } from "../AuthContext"; // Asegúrate de que la ruta sea la correcta

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { currentUser } = useAuth(); // Usa el contexto de autenticación
  const navigation = useNavigation()

  function withUserProp(Component) {
    // Solo renderiza el componente si currentUser no es null
    return (props) => currentUser ? <Component {...props} user={currentUser} /> : null;
  }

  if (!currentUser) {
    // Si no hay un usuario actual, podrías redirigir al login o mostrar un indicador de carga
    console.log('Redirecting to login...');
    navigation.navigate('Login'); // Asegúrate de tener acceso a navigation o usa useNavigation hook.
  }
  console.log("Home");
  return (
    <Tab.Navigator initialRouteName="AllRecipes">
      <Tab.Screen
        name="AllRecipes"
        component={withUserProp(AllRecipes)}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
          title: 'Recetas'
        }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={withUserProp(AddRecipe)}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="pencil" color={color} size={size} />
          ),
          title: 'Agregar Receta'
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={withUserProp(MyProfile)}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
          ),
          title: 'Mi Perfil'
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
