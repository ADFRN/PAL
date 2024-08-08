import { Stack } from 'expo-router/stack';
import {TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function Layout() {
    const router = useRouter();
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ title: "Connexion", presentation: 'modal', headerLeft: () => (
                <TouchableOpacity onPress={() => {router.back()}}>
                    <Ionicons name={"close-outline"} size={28}  />
                </TouchableOpacity>
                ) }} />
            <Stack.Screen name="bookDetailsModal" options={{ presentation: 'modal', title: "Détails du livre" }} />
            <Stack.Screen name="settingsUserModal" options={{ presentation: 'modal', title: "Paramètres" }} />
        </Stack>
    );
}
