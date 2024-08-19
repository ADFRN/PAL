import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "@/FirebaseConfig";
import { doc, setDoc } from "@firebase/firestore";
import ButtonLogin from "@/components/BottomLoginSheet";

const RatingModal = ({ isVisible, onClose, book }: any) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const user = FIREBASE_AUTH.currentUser;

    const handleSubmit = async () => {
        if (!rating || !comment) return;

        if (!user) return;

        try {
            const bookRef = doc(FIREBASE_DB, 'books', book.industryIdentifiers[0].identifier);
            const reviewData = {
                rating: parseInt(rating),
                review: comment,
                reviewerUserId: user.uid,
                reviewerUserName: user.displayName,
                reviewedBook: { bookId: book.industryIdentifiers[0].identifier, title: book.title, coverUrl: book.imageLinks.thumbnail },
                createdAt: new Date().toISOString(),
            };
            await setDoc(doc(bookRef, 'reviews', user.uid), reviewData);
            console.log('Rating and comment added successfully!');
            onClose();  // Fermer la modal après la soumission
        } catch (error) {
            console.error('Error adding rating and comment: ', error);
        }
    };

    return (
        <Modal visible={isVisible}  animationType="slide" transparent={true}>
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={onClose}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
            {user ? (
              <>
                  <Text style={styles.modalTitle}>Notez ce livre</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Note (1-5)"
                    keyboardType="numeric"
                    value={rating}
                    onChangeText={setRating} />

                  <TextInput
                    style={styles.input}
                    placeholder="Commentaire"
                    value={comment}
                    onChangeText={setComment}
                    multiline />

                    <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Soumettre</Text>
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              </>
                ) : (
              <>
                  <Text style={styles.modalTitle}>Veuillez vous connecter pour noter ce livre</Text>
                  <View style={styles.loginButtonContainer}>
                      <ButtonLogin />
                  </View>
              </>
              )}
                </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
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
        color: '#000',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        color: '#000',
        marginBottom: 20,
        padding: 10,
        fontSize: 16,
    },
    buttonSubmit: {
        backgroundColor: '#123524',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loginButtonContainer: {
        marginTop: 20,
    },
});

export default RatingModal;
