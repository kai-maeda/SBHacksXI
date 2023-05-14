export function addIngredientHandler() {
    if(ingredient) {
        setIngredientList(prevList => [...prevList, ingredient]);
        setIngredient('');
    }
};

export function handleSearchRecipes() {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    const ingredientsQueryParam = ingredientList.join(",");
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQueryParam}&apiKey=1206edced7b94e3fa53f1569008bce89&sort=min-missing-ingredients`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result && result.length > 0) {
            const recipeId = result[0].id;
            fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=1206edced7b94e3fa53f1569008bce89`)
              .then(res => res.json())
              .then(
                (result) => {
                  setIsLoading(false);
                  setRecipe(result);
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


  export const getContent = () => {
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