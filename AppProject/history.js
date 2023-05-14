import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function HistoryScreen({ route }) {
  const { recentSearches } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search History</Text>
      {recentSearches.map((searchTerm, index) => (
        <Text style={styles.label} key={index}>
          {searchTerm}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
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
});