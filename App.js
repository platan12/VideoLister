import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Page1 from './screens/Page1'; // Exemple d'una altra pantalla
import HomeScreen from './screens/HomeScreen'; // Exemple d'una pantalla
import Page2 from './screens/Page2'; // Exemple d'una altra pantalla
import LoginScreen from './screens/LoginScreen'; // Exemple d'una altra pantalla
import RegisterScreen from './screens/RegisterScreen'; // Exemple d'una altra pantalla
import VideoPlayerPage from './screens/VideoPlayerPage';
import PickedList from './screens/PickedList';
import { UserProvider } from './context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false ,  animation: 'none'}}/>
          <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false ,  animation: 'none'}} />
          <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false ,  animation: 'none'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false ,  animation: 'none'}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false ,  animation: 'none'}} />
          <Stack.Screen name="VideoPlayerPage" component={VideoPlayerPage} options={{ headerShown: false ,  animation: 'none'}} />
          <Stack.Screen name="PickedList" component={PickedList} options={{ headerShown: false ,  animation: 'none'}} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
