import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";

import AllRecipes from "./Recipes/AllRecipes";
import MyProfile from "./Recipes/MyProfile";
import AddRecipe from "./Recipes/AddRecipe";

import { getAuth, onAuthStateChanged } from "../firebase";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  function withUserProp(Component) {
    // Solo renderiza el componente si el usuario no es null y no está cargando
    return (props) => !loading && user ? <Component {...props} user={user} auth={getAuth()} /> : null;
  }

  if (loading) {
    // Aquí puedes retornar un indicador de carga si lo deseas
    console.log('...');
  }

  console.log("Home");
  return (
    <Tab.Navigator initialRouteName="AllRecipes">
      <Tab.Screen
        name="AllRecipes"
        component={withUserProp(AllRecipes, user)}
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
        component={withUserProp(AddRecipe, user)}
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
        component={withUserProp(MyProfile, user)}
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
