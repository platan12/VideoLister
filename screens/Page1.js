import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

export default function Page1({ navigation }) {
  const [videos, setVideos] = useState([]);

  // Funció per obtenir vídeos des de Firebase
  useEffect(() => {
    const fetchVideos = async () => {
      const videoList = [];
      const querySnapshot = await getDocs(collection(db, 'videos')); // Assumeix que tens una col·lecció 'videos'
      querySnapshot.forEach((doc) => {
        videoList.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  // Funció per navegar a la pàgina del vídeo
  const handlePress = (video) => {
    navigation.navigate('VideoPlayerPage', { video });
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