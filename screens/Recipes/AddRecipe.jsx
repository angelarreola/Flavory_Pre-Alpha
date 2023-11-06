import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState,useEffect } from "react";
import { Formik } from "formik";
import { MaterialCommunityIcons  } from "@expo/vector-icons";

import { getStorage, storageRef, uploadBytes, getDownloadURL, getFirestore, collection, addDoc, doc, updateDoc, deleteDoc } from '../../firebase';
import { useNavigation } from "@react-navigation/native";


const AddRecipe = ({user, route}) => {
  console.log('ADD');
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false) 
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation();

  const paramsValues = route.params ? route.params.selectedRecipe : null;
  useEffect(() => {
    if (paramsValues) {
      setImage({ uri: paramsValues.imageUrl });
      setEditing(true);
    }
  }, []);
  

  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
};

const uploadImage = async () => {
  if (!image) {
    return null;
  }
  setUploading(true)
  let url = null; // Inicializa la URL como null
  const response = await fetch(image.uri)
  const blob = await response.blob()
  const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)

  const db = getStorage()
  const ref = storageRef(db, filename)
  try {
    // Sube el blob a Firebase Storage
      const snapshot = await uploadBytes(ref, blob, {contentType: 'image/jpeg'})
      // Después de subir el archivo, puedes obtener la URL de descarga si es necesario
      url = await getDownloadURL(snapshot.ref);
      console.log('Photo uploaded!');
  } catch (e){
      console.log(e)
      Alert.alert('Upload failed', e.message);
  }
  finally {
    setUploading(false)
    setImage(null);
    return url
  }
  
} 

const uploadRecipe = async (values, resetForm) => {
  const imageUrl = await uploadImage()
  const newRecipe = await {...values, imageUrl, userId: user.uid, username: user.email}
  
  const db = getFirestore()
  const recipesCollectionRef = collection(db, "recipes")
  try {
    const docRef = await addDoc(recipesCollectionRef, newRecipe)
    console.log('Added Successfully');
    console.log('Document written with ID: ', docRef.id);
    navigation.navigate("AllRecipes");
    resetForm({values: { name: "", ingredients: "", steps: "" }});

  } catch (error) {
    console.log('Error adding document: ', error);
    Alert.alert('Upload failed', error.message);
  }

}

const editRecipe = async (values) => {
  const imageUrlUpdated = await uploadImage()
  console.log('editando');
  console.log(values);
  const {id, userId, imageUrl, ...copyToUpdate} = values;
  const db = getFirestore();
  const recipeRef = doc(db, "recipes" , values.id);
  try {
    await updateDoc(recipeRef, {imageUrl: imageUrlUpdated, ...copyToUpdate});
    console.log('Edited Successfully');
    navigation.goBack();
  } catch (error) {
    console.log('Error updating document: ', error);    
  }
}

const handleDeleteRecipe = (id) => {
  const deleteRecipe = async (id) => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, "recipes", id));
      console.log('Deleted Successfully');
      navigation.goBack();
    } catch (error) {
      console.log('Error deleting document: ', error);  
    }
  }
  
  Alert.alert(
    "Confirmación", // Título
    "¿Estás seguro de que quieres eliminar esta receta?", // Mensaje
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelar presionado"), // Función que se llama al presionar 'Cancelar'
        style: "cancel"
      },
      { 
        text: "Confirmar", 
        onPress: () => deleteRecipe(id) // Función que se llama al presionar 'Confirmar'
      }
    ],
    { cancelable: true } // Esta opción indica si la alerta se puede cerrar tocando fuera de ella
  );
}

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={
            paramsValues ? {...paramsValues} : { name: "", ingredients: "", steps: "" }
          }
          onSubmit={(values, { resetForm }) => editing ? editRecipe(values) : uploadRecipe(values, resetForm)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TouchableOpacity
                style={styles.imgButton}
                onPress={pickImage}
              >
                {
                  image ? (
                    <Image source={{uri: image?.uri}} style={styles.image}  />
                  ) : (
                    <MaterialCommunityIcons 
                      name="file-image-plus"
                      size={72}
                      color="black"
                      style = {{marginTop: 30}}
                    />
                  )
                }
              </TouchableOpacity>

              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}
                >
                  Nombre del plato:
                </Text>
                <TextInput
                  style={[styles.input, {height: 40}]}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}
                >
                  Ingredientes:
                </Text>
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  onChangeText={handleChange("ingredients")}
                  onBlur={handleBlur("ingredients")}
                  value={values.ingredients}
                  editable
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}
                >
                  Pasos:
                </Text>
                <TextInput
                  style={[styles.input, {height: 150}]}
                  onChangeText={handleChange("steps")}
                  onBlur={handleBlur("steps")}
                  value={values.steps}
                  editable
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FF893C" }]}
                onPress={handleSubmit}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#FFFFFF" }}
                >
                  {editing ? 'Editar Receta' : 'Subir Receta'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={ editing ? [styles.button, styles.deleteButton] : {display: 'none'}}
                onPress={() => handleDeleteRecipe(values.id)}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#DA0000" }}
                >
                  Eliminar Receta
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFFFFF90",
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  imgButton: {
    width: 'auto',
    height: 150,
    backgroundColor: '#00000020',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: "#DA0000",
    borderWidth: 2,
  }
});
