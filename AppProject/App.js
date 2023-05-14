import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {searchRecipes, getContent} from './appFunctions';


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

  function handleSearchRecipes() {
    searchRecipes(ingredientList, setIsLoading, setError, setRecipe, setIngredientList);
  }
  
  const content = getContent(isLoading, error, recipe);

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

      <View style={styles.resultContainer}>
        {content}
      </View>

      <Button
        title='Search Recipies'
        onPress={handleSearchRecipes}
      />

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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
