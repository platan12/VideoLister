import React from 'react';
import { View } from 'react-native';
import FButton from './FButton';

export default function FSection({ currentSection, onPress }) {
  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        
    }}>
      <View style={{ 
          flexDirection: 'row', 
          backgroundColor: '#E70467', 
          borderRadius: 15, 
          padding: 10, 
          elevation: 5, // Para sombra en Android
          shadowColor: '#000', // Para sombra en iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          width: 300,
          alignItems: 'center', 
          justifyContent: 'center', 
      }}>
        <FButton 
          selectedIcon="cards-heart" 
          unselectedIcon="cards-heart-outline" 
          id={1} 
          onPress={onPress} 
          isSelected={currentSection == 1}
          color="white"
        />
        
        <FButton 
          selectedIcon="animation" 
          unselectedIcon="animation-outline" 
          id={2} 
          onPress={onPress} 
          isSelected={currentSection == 2}
        />
        
        <FButton 
          selectedIcon="account" 
          unselectedIcon="account-outline" 
          id={3} 
          onPress={onPress} 
          isSelected={currentSection == 3}
        />
      </View>
    </View>
  );
}