import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('')
  const [ingredientList, setIngredientList] = useState('');

  function addIngredientHandler() {
    if(ingredient) {
      setIngredientList(prevList => [...prevList, ingredient]);
      setIngredient('');
    }
  };

  function handleSearchRecipies() {
    //liv this is the API thingy

    setIngredientList([])
  }


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
        onPress={handleSearchRecipies}
      />
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
  }
});
