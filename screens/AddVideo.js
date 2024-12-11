import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../context/UserContext';

export default function AddVideo({ navigation }) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [listName, setListName] = useState('');
  const { userUID } = useUser();

  const handleSave = async () => {
    if (!link || !title || !listName) {
      Alert.alert('Error', 'Tots els camps són obligatoris.');
      return;
    }

    try {
      await addDoc(collection(db, 'videos'), {
        link,
        title,
        llista: listName,
        usuari: userUID,
      });
      Alert.alert('Èxit', 'Vídeo afegit correctament!');
      navigation.goBack(); // Torna a la pàgina anterior
    } catch (error) {
      Alert.alert('Error', `No s'ha pogut afegir el vídeo: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Afegir un nou vídeo</Text>
      <TextInput
        style={styles.input}
        placeholder="Enllaç del vídeo"
        placeholderTextColor="#aaa"
        value={link}
        onChangeText={setLink}
      />
      <TextInput
        style={styles.input}
        placeholder="Títol del vídeo"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de la llista"
        placeholderTextColor="#aaa"
        value={listName}
        onChangeText={setListName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E0C43',
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#E70467',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});