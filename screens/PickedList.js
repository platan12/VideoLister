import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../context/UserContext'; // Importem el context global

export default function PickedList({ route, navigation }) {
  const { listName } = route.params; // Obtenim el nom de la llista seleccionada
  const [videos, setVideos] = useState([]);
  const { userUID } = useUser(); // Obtenim l'UID de l'usuari loguejat

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, 'videos'),
          where('usuari', '==', userUID), // Només vídeos de l'usuari loguejat
          where('llista', '==', listName) // Filtrar per la llista seleccionada
        );

        const querySnapshot = await getDocs(q);
        const videoList = [];

        querySnapshot.forEach((doc) => {
          videoList.push({ id: doc.id, ...doc.data() });
        });

        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [listName, userUID]);

  const handlePress = (video) => {
    navigation.navigate('VideoPlayerPage', { video });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Vídeos a la llista: {listName}</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={() => handlePress(item)}>
            <Text style={styles.videoTitle}>{item.title}</Text>
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
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  videoItem: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  videoTitle: {
    fontSize: 18,
    color: '#630032',
    fontWeight: 'bold',
  },
});
