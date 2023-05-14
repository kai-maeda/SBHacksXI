import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens';
import RecipeScreen from './recipeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name='Home Page' component={HomeScreen} />
        <Stack.Screen name='Recipe Details' component={RecipeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}