import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, setDoc } from "@firebase/firestore";
import { defaultStyles } from "@/constants/Styles";

export default function AuthScreen() {
  const { type } = useLocalSearchParams<{type: string}>();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const router = useRouter();
  const db = FIREBASE_DB;

  const signIn = async () => {
    setLoading(true)
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/(tabs)')
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
    setLoading(false)
  }

  const signUp = async () => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        if (userCredential.user) {
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, {
            userId: userCredential.user.uid,
            userName: displayName,
            email: userCredential.user.email,
            profilePicture: userCredential.user.photoURL,
            createdAt: new Date().toISOString(),
          });
          await updateProfile(userCredential.user, {
            displayName: displayName,
          });
        }
      });
      router.replace('/profile');
    } catch (error: any) {
      console.log(error)
      alert('Sign up failed: ' + error.message);
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === 'login' ? 'Welcome back' : 'Create your account'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        autoCapitalize='none'
        placeholder='Pseudo'
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {type === 'login' ? (
        <TouchableOpacity onPress={signIn} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Connexion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signUp} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Créer le compte</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  }
});
