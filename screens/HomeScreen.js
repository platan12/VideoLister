import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>VidioLister</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Page1")}> 
          <Text style={styles.buttonText }>Login In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Page1")}> 
          <Text style={styles.buttonText }>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3E0C43', // Fons fosc
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      backgroundColor: '#E70467', // Blau fosc
      padding: 20,
      borderRadius: 10, // Arrodonir les puntes
      marginBottom: 300,
    },
    titleText: {
      color: '#FFFFFF', // Lletra blanca
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#D9D9D9', // Fons blanc
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10, // Botó arrodonit
      marginBottom: 50,
      width: 300,
    },
    buttonText: {
      color: '#630032', // Color del text del botó (a joc amb el títol)
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });


