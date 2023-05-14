import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator} from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [recipe, setRecipe] = useState('');

  function addIngredientHandler() {
    if(ingredient) {
      setIngredientList(prevList => [...prevList, ingredient]);
      setIngredient('');
    }
  };


  function addIngredientHandler() {
    if (ingredient) {
      setIngredientList(prevList => [...prevList, ingredient]);
      setIngredient('');
    }
  }

  function handleSearchRecipes() {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    const ingredientsQueryParam = ingredientList.join(',');
    console.log(ingredientsQueryParam);
    fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryParam}&sort=min-missing-ingredients&apiKey=ee66ebf2dd10409fbea005df1b091143')
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            setRecipe(result[0]);
          }
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
      console.log(recipe);
      setIngredientList([]);
  }

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    if (recipe) {
      return (
        <View>
          <Text>Recipe found: {recipe.title}</Text>
          <Text>Details: {recipe.id} - {recipe.image}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Ingredients' 
          style={styles.textInput} 
          value={ingredient}
          onChangeText={text => setIngredient(text)}
        />
        <Button title='Add Ingredient' onPress={addIngredientHandler}/>
      </View>

      <FlatList 
        style={styles.listContainer}
        data={ingredientList}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button
        title='Search Recipies'
        onPress={handleSearchRecipes}
      />

      <View style={styles.resultContainer}>
        {getContent()}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,

  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
    padding: 8
  },
  listContainer: {
    //flex: 5,
    padding: 8,
  },
});
