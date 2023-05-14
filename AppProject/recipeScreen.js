import { StyleSheet, Text, View, Image} from 'react-native';


export default function RecipeScreen({ route }) {
    const { recipe } = route.params;
    const imgURL = recipe.image;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipe Details:</Text>
        <Text style={styles.label}>Title: {recipe.title}</Text>
        <Image source={{ uri: imgURL }} style={styles.image} />
        {/* Display additional recipe details */}
        <Text style={styles.label}>Additional Details:</Text>
        <Text style={styles.text}>Preparation Time: {recipe.readyInMinutes} minutes</Text>
        <Text style={styles.text}>Servings: {recipe.servings}</Text>
        <Text style={styles.text}>Instructions: {recipe.instructions}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});