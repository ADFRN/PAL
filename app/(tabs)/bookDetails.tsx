import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import {doc, getDoc, setDoc, updateDoc, arrayUnion, collection, getDocs} from "@firebase/firestore";
import {Ionicons} from "@expo/vector-icons";
import RatingModal from "@/components/RatingModal";

const { width } = Dimensions.get('window');

interface Book {
    bookID: string;
    title: string;
    img: string;
    addedAt: string;
}

export default function Tab() {
    const user = FIREBASE_AUTH.currentUser;
    const db = FIREBASE_DB;
    const route = useRoute();
    const book: any = route.params;
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [ratings, setRatings] = useState<any[]>([]);
    const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const bookID = book.book.volumeInfo.industryIdentifiers[0].identifier;
                const ratingsCollectionRef = collection(db, 'books', bookID, 'ratings');
                const ratingsSnapshot = await getDocs(ratingsCollectionRef);

                const ratingsList = ratingsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRatings(ratingsList);
            } catch (error) {
                console.error('Error fetching ratings: ', error);
            }
        };
        fetchRatings();
    }, [book.book, isFocused]);

    const handleDescription = (data: any) => {
        // @ts-ignore
        navigation.navigate('bookDetailsModal', { data });
    }



    const handleAddToLibrary = async (bookData: any) => {
        if (!user) return;
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            const newBook: Book = {
                bookID: bookData.industryIdentifiers[0].identifier,
                title: bookData.title,
                img: bookData.imageLinks.thumbnail,
                addedAt: new Date().toISOString(),
            };

            if (userDoc.exists()) {
                // Utiliser arrayUnion pour ajouter le nouveau livre à la bibliothèque existante
                await updateDoc(userDocRef, {
                    library: arrayUnion(newBook),
                });
            } else {
                // Si le document n'existe pas, créer un nouveau document avec le livre
                await setDoc(userDocRef, { library: [newBook] });
            }
            console.log('Book added to library successfully!');
        } catch (error) {
            console.error('Error adding book to library: ', error);
        }
    };

    const openRatingModal = () => {
        setIsRatingModalVisible(true);
    };

    const closeRatingModal = () => {
        setIsRatingModalVisible(false);
    };


    return (
        <View style={styles.container}>
            <View style={styles.primaryContent}>
                <Image source={{ uri: book.book.volumeInfo?.imageLinks?.thumbnail }} style={styles.bookImage} resizeMode="contain" />
                <Text style={styles.bookTitle}>{book.book.volumeInfo?.title}</Text>
                <View style={styles.bookAuthorContainer}>
                <Text style={styles.bookAuthor}>par {book.book.volumeInfo?.authors?.join(', ')}</Text>
                <Text style={styles.bookReleaseDate}>{book.book.volumeInfo?.publishedDate}</Text>
                </View>
                <TouchableOpacity style={styles.sectionAddToLibrary} onPress={() => handleAddToLibrary(book.book?.volumeInfo)}>
                    <View style={styles.sectionTextAdd}>
                        <Ionicons name="add" size={20} color="black" />
                        <Text style={styles.sectionText}>Ajouter a ma bibliothèque</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bookActionsContainer}>
                    <TouchableOpacity style={styles.section} onPress={() => handleDescription(book.book.volumeInfo)}>
                        <Text style={styles.sectionText}>Resume</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={openRatingModal}>
                        <Text style={styles.sectionText}>Avis</Text>
                    </TouchableOpacity>
            </View>
                <FlatList
                    data={ratings}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>Note: {item.rating}/5</Text>
                            <Text style={styles.commentText}>{item.comment}</Text>
                            <Text style={styles.dateText}>Posté le: {new Date(item.ratedAt).toLocaleDateString()}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.noRatingsText}>Aucun avis pour ce livre.</Text>}
                />
            </View>

            <RatingModal
                isVisible={isRatingModalVisible}
                onClose={closeRatingModal}
                bookID={book.book.volumeInfo.industryIdentifiers[0].identifier}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    primaryContent: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
    },
    secondaryContent: {
        alignItems: 'center',
        backgroundColor: 'black',
        paddingBottom: 20,
    },
    bookImage: {
        width: 150,
        height: 225,
        marginBottom: 20,
    },
    bookTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    bookSubtitle: {
        fontSize: 18,
        color: '#ccc',
        marginBottom: 5,
    },
    bookAuthorContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },
    bookAuthor: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    bookReleaseDate: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    bookDescription: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    bookPages: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    bookActionsContainer: {
        marginTop: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    section: {
        width: width * 0.4,
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.82)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTextAdd: {
        gap: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionAddToLibrary: {
        width: width * 0.9,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.82)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ratingContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginRight: 10,
        width: width * 0.8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
        marginBottom: 5,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
    },
    noRatingsText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    }
});
