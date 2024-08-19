import { Stack } from 'expo-router/stack';
import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged, User } from "@firebase/auth";
import Auth from "@/app/auth";

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return (
    <Auth />
  );

    return (
        <Stack>
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
           <Stack.Screen name="bookDetailsModal" options={{ presentation: "modal", title: "Détails du livre" }} />
           <Stack.Screen name="addToLibraryModal" options={{ presentation: "modal", title: "Ajouter a la bibliothèque" }} />
        </Stack>
    );
}
