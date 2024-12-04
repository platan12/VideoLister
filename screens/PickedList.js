import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FSection from '../components/FSection';


export default function Page1({ navigation }) {


    return (
      <View style={styles.container}>
        
        <Text style={styles.titleText}>All Lists</Text>
        <View style={styles.listContainer}>
            <FlatList
            />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Page2")}> 
          <Text style={styles.buttonText }>Go Back</Text>
        </TouchableOpacity>
      </View>
      
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3E0C43', // Fons purple
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      flex: 1,
      color: '#FFFFFF', // Lletra blanca
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
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
    listContainer: {
      height:'50%',
  }
  });