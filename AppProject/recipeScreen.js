import { StyleSheet, Text, View, Image } from 'react-native';

export default function RecipeScreen({ route }) {
  const { recipe } = route.params;
  const imgURL = recipe.image;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Title:</Text>
      <Text style={styles.label}>{recipe.title}</Text>
      <Image source={{ uri: imgURL }} style={styles.image} />
      {/* Display additional recipe details */}
      <Text style={styles.label}>Additional Details:</Text>
      <View style={styles.detailContainer}>
        <Text style={[styles.text, styles.boldText]}>Preparation Time: </Text>
        <Text style={[styles.text, styles.normalText]}>{recipe.readyInMinutes} minutes</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.text, styles.boldText]}>Servings: </Text>
        <Text style={[styles.text, styles.normalText]}>{recipe.servings}</Text>
      </View>
      <Text style={styles.label}>Instructions:</Text>
      <Text style={[styles.text, styles.normalText, styles.instructionsText]}>{recipe.instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontFamily: 'playfair-display-extrabold',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'playfair-display-extrabold',
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'playfair-display',
    flexWrap: 'wrap',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'playfair-display-semibolditalic',
  },
  normalText: {
    fontWeight: 'normal',
  },
  instructionsText: {
    flexWrap: 'wrap',
    fontSize: 14, 
  },
});