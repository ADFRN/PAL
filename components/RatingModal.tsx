import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import { doc, setDoc } from "@firebase/firestore";

const RatingModal = ({ isVisible, onClose, bookID }: any) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        if (!rating || !comment) return;

        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;

        try {
            const bookRef = doc(FIREBASE_DB, 'books', bookID);

            // Enregistrer l'avis de l'utilisateur dans la sous-collection `ratings`
            await setDoc(doc(bookRef, 'ratings', user.uid), {
                rating: parseInt(rating),
                comment: comment,
                ratedAt: new Date().toISOString(),
            });

            console.log('Rating and comment added successfully!');
            onClose();  // Fermer la modal après la soumission
        } catch (error) {
            console.error('Error adding rating and comment: ', error);
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Notez ce livre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Note (1-5)"
                        keyboardType="numeric"
                        value={rating}
                        onChangeText={setRating}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Commentaire"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Soumettre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1a73e8',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default RatingModal;
