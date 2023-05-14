import { ActivityIndicator, Text} from "react-native";

export function searchRecipes(ingredientList, setIsLoading, setError, setRecipe, setIngredientList, navigation) {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    const ingredientsQueryParam = ingredientList.join(",");
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryParam}&apiKey=ee66ebf2dd10409fbea005df1b091143&sort=min-missing-ingredients`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.length > 0) {
            const recipeId = result[0].id;
            fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ee66ebf2dd10409fbea005df1b091143`)
              .then(res => res.json())
              .then(
                (result) => {
                  setIsLoading(false);
                  setRecipe(result);
                  navigation.navigate('Recipe Details', {recipe: result});
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


  export function getContent(isLoading, error){
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    return null;
  };