import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../context/UserContext'; // Importem el context global
import FSection from '../components/FSection'; // Reutilitzem el component

export default function Page2({ navigation }) {
  const [listNames, setListNames] = useState([]);
  const { userUID } = useUser(); // Obtenim l'UID de l'usuari loguejat

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos')); // Obtenim tots els documents
        const lists = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.usuari === userUID && typeof data.llista === 'string') {
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

  // Funció per navegar a PickedList
  const handlePress = (listName) => {
    navigation.navigate('PickedList', { listName });
  };

  // Implementació de handlePress2
  const handlePress2 = (id) => {
    console.log('Han clicat al botó ' + id);
    if (id === 1) {
      navigation.navigate('Page1');
    } else if (id === 3) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Llistes disponibles</Text>
      <FlatList
        data={listNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item)}>
            <Text style={styles.listName}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
       <Button
        title="Afegir vídeo"
        onPress={() => navigation.navigate('AddVideo')} // Naveguem a AddVideo
        color="#E70467"
      />
      <FSection styles={{ flex: 3 }} currentSection={2} onPress={handlePress2} />
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
    fontSize: 30,
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
