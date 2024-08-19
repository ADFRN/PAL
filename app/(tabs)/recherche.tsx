import React, { useState } from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from "@expo/vector-icons";


export default function Tab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = (book: any) => {
    // @ts-ignore
    navigation.navigate('bookDetails', { book });
  };

  return (
      <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.headerText}>Recherche</Text>
          </View>
            <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un livre ou un auteur"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={e => handleSearch(e.nativeEvent.text)}/>
          </View>
        <FlatList
              data={searchResults}
              keyExtractor={item => item.id.toString()}

              renderItem={({item}) => (
                  <TouchableOpacity style={styles.resultItem} onPress={() => handlePress(item)}>
                    <Image
                        source={{uri: item.volumeInfo.imageLinks?.thumbnail}}
                        style={styles.thumbnail}
                        resizeMode="cover"/>
                    <View style={styles.textContainer}>
                      <Text style={styles.resultTitle}>{item.volumeInfo.title}</Text>
                      <Text style={styles.resultAuthor}>{item.volumeInfo.authors?.join(', ')}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => navigation.navigate('addToLibraryModal', { data: item.volumeInfo })} // On ajoute une fonction pour gérer l'ajout
                    >
                      <AntDesign name="pluscircleo" size={20} color="#fff" />
                    </TouchableOpacity>
                  </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.noResultsText}>Aucun résultat</Text>}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    color: '#fff',
  },
  resultAuthor: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10, // Pour ajouter un peu d'espace entre le bouton et le texte
  },
  addButtonText: {
    color: '#fff', // Couleur du texte
    fontSize: 14,
  },
  noResultsText: {
    padding: 20,
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
