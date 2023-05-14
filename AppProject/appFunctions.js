import { ActivityIndicator, Text} from "react-native";

const MAX_RECENT_SEARCHES = 2e53;
export function searchRecipes(ingredientList, setIsLoading, setError, setRecipe, setIngredientList,setRecentSearches,recentSearches, navigation) {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    const ingredientsQueryParam = ingredientList.join(",");
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryParam}&apiKey=3ae3434324424397849d93facc227dfa&sort=min-missing-ingredients`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.length > 0) {
            const recipeId = result[0].id;
            fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=3ae3434324424397849d93facc227dfa`)
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoading(false);
                setRecipe(result);
                const newSearchTerm = result.title;
                const updatedRecentSearches = [newSearchTerm, ...recentSearches.slice(0, MAX_RECENT_SEARCHES)];
                console.log(recentSearches);
                setRecentSearches(updatedRecentSearches);
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