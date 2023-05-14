import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RecipeScreen from './recipeScreen';
import HistoryScreen from './history';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator> 
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Recipe Details' component={RecipeScreen}/>
        <Stack.Screen name='History' component={HistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}