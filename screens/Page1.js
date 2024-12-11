import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../utils/firebaseConfig';
import FSection from '../components/FSection';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Page1({ navigation, route }) {
  const [videos, setVideos] = useState([]);
  const { userUID } = route.params; // Obtenim l'UID de l'usuari passat des de LoginScreen
  
  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log(userUID);
        const videoQuery = query(
          collection(db, 'videos'),
          where('llista', '==', 'Favorits'),
          where('usuari', '==', userUID) // Filtra pels vídeos de l'usuari
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

  const handlePress = (video) => {
    navigation.navigate('VideoPlayerPage', { video });
  };

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