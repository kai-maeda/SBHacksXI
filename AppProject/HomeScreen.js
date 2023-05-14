import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {searchRecipes, getContent} from './appFunctions';
import { createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import{NavigationContainer} from "@react-navigation/native";
import { AppRegistry} from "react-native";
import HistoryScreen from './history';


const Tab = createMaterialTopTabNavigator();


export default function HomeScreen({navigation}){
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  
  
    const content = getContent(isLoading, error, recipe);


    function addIngredientHandler() {
        if(ingredient) {
            setIngredientList(prevList => [...prevList, ingredient]);
            setIngredient('');
        }
    };

    function handleSearchRecipes() {
        searchRecipes(ingredientList, setIsLoading, setError, setRecipe, setIngredientList, setRecentSearches, recentSearches, navigation);
    }

    return (
        
        <View style={styles.container}>
            {/* <MyApp /> */}
             <View style={styles.inputContainer}>
             <TextInput 
                placeholder='Ingredients' 
                style={styles.textInput} 
                value={ingredient}
                onChangeText={text => setIngredient(text)}
                onSubmitEditing={addIngredientHandler}
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
            <View style = {styles.historyPage}>
              <Button
              title='history'
              onPress={()=>{navigation.navigate('History',{recentSearches: recentSearches})}}/>
                {/* onPress={()=>{console.log(recentSearches)}}/> */}
            </View>

            <Button
            title='Search Recipies'
            onPress={handleSearchRecipes}
            />

            <StatusBar style="auto" />
        </View>
    );
};



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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  historyPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 16,
    marginRight: 16,
  },
});