import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoPlayerPage({ route, navigation }) {
  const { video } = route.params; // Obté el vídeo des de la navegació

  return (
    <View style={styles.container}>
      {/* Botó per tornar enrere */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Torna Enrere</Text>
      </TouchableOpacity>

      {/* WebView per reproduir el vídeo */}
      <WebView
        source={{ uri: video.link }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E0C43',
  },
  webview: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#E70467',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10, // Assegura que el botó estigui per sobre de la WebView
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
