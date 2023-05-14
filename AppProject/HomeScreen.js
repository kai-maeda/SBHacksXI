import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {searchRecipes, getContent} from './appFunctions';
import { createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import { AppRegistry} from "react-native";


const Tab = createMaterialTopTabNavigator();

TouchableOpacity.defaultProps = { activeOpacity: 0.7 };


const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

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
             <View style={styles.inputContainer}>
             <TextInput 
                placeholder='Ingredients' 
                style={styles.textInput} 
                value={ingredient}
                onChangeText={text => setIngredient(text)}
                onSubmitEditing={addIngredientHandler}
                />
            <AppButton title='Add Ingredient' onPress={addIngredientHandler}/>
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
              <AppButton
              title='history'
              onPress={()=>{navigation.navigate('History',{recentSearches: recentSearches})}}/>
                {/* onPress={()=>{console.log(recentSearches)}}/> */}
            </View>

            <AppButton
            title='Search Recipes'
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
    borderBottomColor: '#cccccc',
    gap: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
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
    fontFamily: 'playfair-display',

  },
  historyPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 16,
    marginRight: 16,
  },
  appButtonContainer: {
    elevation:10,
    backgroundColor: "#ed7117",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
AppRegistry.registerComponent("App", ()=>App);