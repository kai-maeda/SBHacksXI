import { ActivityIndicator , View, Text} from "react-native";

export function searchRecipes(ingredientList, setIsLoading, setError, setRecipe, setIngredientList, navigation) {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    const ingredientsQueryParam = ingredientList.join(",");
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryParam}&apiKey=1206edced7b94e3fa53f1569008bce89&sort=min-missing-ingredients`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.length > 0) {
            const recipeId = result[0].id;
            fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=1206edced7b94e3fa53f1569008bce89`)
              .then(res => res.json())
              .then(
                (result) => {
                  setIsLoading(false);
                  setRecipe(result);
                  navigation.navigate('RecipeDetails', {recipe: result});
                },
                (error) => {
                  setIsLoading(false);
                  setError('Failed to fetch recipe details');
                }
              );
          } else {
            setIsLoading(false);
            setError('No recipes found');
          }
        },
        (error) => {
          setIsLoading(false);
          setError('Failed to fetch recipe IDs');
        }
      );
      setIngredientList([])
  }


  export function getContent(isLoading, error, recipe){
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    if (recipe) {
      return (
        <View>
          <Text>Previous Recipe: {recipe.title}</Text>
        </View>
      );
    }

    return null;
  };