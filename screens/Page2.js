import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../context/UserContext'; // Importem el context global

export default function Page2({ navigation }) {
  const [listNames, setListNames] = useState([]); // Estat per emmagatzemar els noms de les llistes
  const { userUID } = useUser(); // Obtenim l'UID de l'usuari loguejat

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos')); // Obtenim tots els documents
        const lists = new Set(); // Fem servir un conjunt per evitar duplicats
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.usuari === userUID && typeof data.llista === 'string') {
            // Afegim el nom de la llista al conjunt només si és una cadena
            lists.add(data.llista);
          }
        });
  
        setListNames(Array.from(lists)); // Convertim el conjunt a una matriu
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };
  
    fetchLists();
  }, [userUID]);

  // Funció per gestionar el clic a una llista
  const handlePress = (listName) => {
    navigation.navigate('PickedList', { listName }); // Naveguem a PickedList amb el nom de la llista
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Listes Úniques</Text>
      <FlatList
        data={listNames}
        keyExtractor={(item, index) => `${item}-${index}`} // Clau única per a cada llista
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item)}>
            <Text style={styles.listName}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E0C43',
    padding: 20,
  },
  titleText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  listName: {
    fontSize: 18,
    color: '#630032',
    fontWeight: 'bold',
  },
});
