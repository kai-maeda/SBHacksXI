import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import HomeScreen from './screens';
import RecipeScreen from './recipeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'playfair-display': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
        'playfair-display-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
        'playfair-display-extrabold': require('./assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
        'playfair-display-semibolditalic': require('./assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf'),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Render null or a loading indicator while the fonts are being loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fca103',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'playfair-display-bold',
            fontSize: 22,
          },
        }}
      >
        <Stack.Screen
          name="Home Page"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Recipe Details"
          component={RecipeScreen}
          options={{
            title: 'Recipe Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}