import { StyleSheet, Text, View, Image} from 'react-native';


export default function HistoryScreen({ route }) {
  const {recentSearches} = route.params;
  console.log(recentSearches)
  return(
      <View>
        {recentSearches.map((searchTerm, index) => (
          <Text style={styles.label} key={index}>{searchTerm}</Text>
        ))}
      </View>
  );
  }

const styles = StyleSheet.create({
  title: {
    fontFamily: 'playfair-display',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'playfair-display',
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
    fontFamily: 'playfair-display',
    fontSize: 14,
    marginBottom: 8,
  },
});

