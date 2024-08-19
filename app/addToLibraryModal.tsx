import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { width } from "@/constants/utils";
import CustomDropDown from "@/components/CustomDropDown";
import { useRoute } from "@react-navigation/native";
import BookAddedNotification from "@/components/AddedBookNotification";
import AddToLibraryButton from "@/components/AddToLibraryButton";

interface Book {
  bookID: string;
  title: string;
  img: string;
  totalPages: number;
  status?: "reading" | "read" | "to-read" | "wishlist";
  isFavorite?: boolean;
  addedAt: string;
}

export default function addToLibraryModal() {
  const route = useRoute();
  const data: any = route.params;
  const user = FIREBASE_AUTH.currentUser;
  const db = FIREBASE_DB;

  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [openFavorite, setOpenFavorite] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<any>(data.data.pageCount);
  const [status, setStatus] = useState<"reading" | "read" | "to-read" | "wishlist">("reading");
  const [isFavorite, setIsFavorite] = useState<"true" | "false">("false");
  const [isNotificationVisible, setNotificationVisible] = useState(false);


  const [statusItems, setStatusItems] = useState([
    { label: "Liste d'envies", value: 'wishlist', icon: () => <Ionicons name="heart" size={18} /> },
    { label: 'À Lire', value: 'to_read', icon: () => <Ionicons name="book" size={18} /> },
    { label: 'Lecture', value: 'reading', icon: () => <Ionicons name="book" size={18} /> },
    { label: 'Terminé', value: 'finished', icon: () => <Ionicons name="checkmark-circle" size={18} /> },
    { label: 'Abandonné', value: 'abandoned', icon: () => <Ionicons name="trash" size={18} /> },
  ]);

  const [isFavoriteItems, setIsFavoriteItems] = useState([
    { label: 'Oui', value: "true" },
    { label: 'Non', value: "false" },
  ]);

  const handleAddToLibrary = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      const newBook: Book = {
        bookID: data.data.industryIdentifiers[0].identifier,
        title: data.data.title,
        img: data.data.imageLinks.thumbnail,
        totalPages: pageCount,
        status: status,
        isFavorite: Boolean(isFavorite),
        addedAt: new Date().toISOString(),
      };

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          library: arrayUnion(newBook),
        });
      } else {
        await setDoc(userDocRef, { library: [newBook] });
      }
      console.log('Book added to library successfully!');
      setNotificationVisible(true);
    } catch (error) {
      console.error('Error adding book to library: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.DropdownContainer}>
        <View style={{ zIndex: 9999 }}>
          <CustomDropDown
            label="Status du livre"
            open={openStatus}
            value={status}
            items={statusItems}
            setOpen={setOpenStatus}
            setValue={setStatus}
            setItems={setStatusItems}
          />
        </View>
        <CustomDropDown
          label="coup de coeur"
          open={openFavorite}
          value={isFavorite.toString()}
          items={isFavoriteItems}
          setOpen={setOpenFavorite}
          setValue={setIsFavorite}
          setItems={setIsFavoriteItems}
        />
        <View style={styles.inputContainerPages}>
          <Text style={styles.inputLabelPages}>Nombre de pages</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="numeric"
            defaultValue={data.data.pageCount.toString()}
            value={pageCount}
            onChangeText={setPageCount}
            style={styles.inputPages}
          />
        </View>
      </View>
      <AddToLibraryButton onPress={() => handleAddToLibrary()} text={"Ajouter a ma bibliothèque"} iconName="add" />
      <BookAddedNotification visible={isNotificationVisible} onAnimationEnd={() => null} text={"Ajouté a la bibliothèque"} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  inputContainerPages: {
    zIndex: -1,
    width: width * 0.9,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'black',
    color: 'white',
  },
  inputLabelPages: {
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
  },
  inputPages: {
    width: width * 0.4,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
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
    zIndex: -1,
  },
  DropdownContainer: {
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
  }
});