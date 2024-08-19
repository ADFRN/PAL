import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import React, {useEffect, useState} from "react";
import {doc, getDoc} from "@firebase/firestore";
import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import { useIsFocused } from "@react-navigation/native";


export default function Tab() {
    const user = FIREBASE_AUTH.currentUser;
    const isFocused = useIsFocused();
    const [library, setLibrary] = useState<any[]>([]);
    const db = FIREBASE_DB;
    const [isLoading, setIsLoading] = useState(false);

    const getUserInformation = async (userId: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user information: ', error);
            return null;
        }
    };


    useEffect(() => {
        if (!user) return;
        const fetchLibrary = async () => {
            setIsLoading(true);
            try {
                const userInfo = await getUserInformation(user.uid);
                if (userInfo && userInfo.library) {
                    setLibrary(userInfo.library);
                } else {
                    setLibrary([]); // Assurez-vous de ne pas laisser `library` en état indéfini
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations de la bibliothèque :", error);
            }
        }
     fetchLibrary();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            {isLoading ? <Text style={styles.title}>Loading...</Text> : (
                <>
                    <Text style={styles.title}>User Library</Text>
                    <FlatList
                        data={library}
                        keyExtractor={item => item.bookID}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.resultItem} onPress={() => null}>
                                <Image
                                    source={{uri: item.img}}
                                    style={styles.thumbnail}
                                    resizeMode="cover"/>
                                <View style={styles.textContainer}>
                                    <Text style={styles.resultTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={styles.noResultsText}>Aucun résultat</Text>}/>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    bookTitle: {
        fontSize: 18,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
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
    },
    noResultsText: {
        padding: 20,
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
});
