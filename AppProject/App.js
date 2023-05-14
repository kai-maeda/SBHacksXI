import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import HomeScreen from './screens';
import RecipeScreen from './recipeScreen';


const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'playfair-display': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      });
    }

    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Recipe Details' component={RecipeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}