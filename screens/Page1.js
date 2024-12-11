import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../context/UserContext'; // Importa el context global
import FSection from '../components/FSection'; // Assumeix que tens aquest component implementat

export default function Page1({ navigation }) {
  const [videos, setVideos] = useState([]);
  const { userUID } = useUser(); // Obtenim l'UID de l'usuari del context global

  // Funció per obtenir vídeos des de Firebase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoQuery = query(
          collection(db, 'videos'),
          where('llista', '==', 'Favorits'),
          where('usuari', '==', userUID) // Filtra per l'usuari loguejat
        );

        const querySnapshot = await getDocs(videoQuery);
        const videoList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [userUID]);

  // Funció per navegar a la pàgina del vídeo
  const handlePress = (video) => {
    navigation.navigate('VideoPlayerPage', { video });
  };

  // Gestió de navegació entre pàgines
  const handlePress2 = (id) => {
    console.log('Han clicat al botó ' + id);
    if (id === 2) {
      navigation.navigate('Page2');
    } else if (id === 3) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Favorites</Text>
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
      <FSection styles={{ flex: 3 }} currentSection={1} onPress={handlePress2} />
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
