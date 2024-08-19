import React from 'react';
import { Stack } from "expo-router/stack";


export default function ProfileStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Mon Profil', headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: 'Réglages' }}
      />
    </Stack>
  );
}
