import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { User } from "@firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const [user, setUser] = useState<User | null>(FIREBASE_AUTH.currentUser);
    if (!user) return;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
                    <Ionicons name={'settings-sharp'} size={20} color={'#fff'} style={styles.settingsIcon} onPress={() => {
                        //@ts-ignore
                        navigation.navigate('settings');
                    }}/>
                    <Image
                    source={{uri: user.photoURL ? user.photoURL : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'}}
                    style={styles.profilePicture}/>
                        <Text style={{color: '#fff', fontSize: 20, marginBottom: 20}}>Bonjour {user.displayName ? user.displayName : user.email ? user.email.split('@').shift() : ''}</Text>
                    <View style={styles.sectionsContainer}>
                        <TouchableOpacity style={styles.section} onPress={() => console.log('Ma bibliothèque')}>
                            <Text style={styles.sectionText}>BIBLIOTHÈQUE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.section} onPress={() => console.log('Ma wishlist')}>
                            <Text style={styles.sectionText}>WISHLIST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.section} onPress={() => console.log('Mes amis')}>
                            <Text style={styles.sectionText}>AMIS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.section} onPress={() => console.log('Mes avis')}>
                            <Text style={styles.sectionText}>NOTES</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingTop: 100,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 20,
    },
    sectionsContainer: {
        marginTop: 50,
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
    settingsIcon: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
});
