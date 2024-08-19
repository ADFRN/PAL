import {Tabs} from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ColorPalette } from "@/constants/Colors";

export default function TabLayout() {
    const navigation = useNavigation();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    height: 80,
                    opacity: 0.8,
                    backgroundColor: ColorPalette.green,
                },
                tabBarLabelStyle: {
                    opacity: 0,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="recherche"
                options={{
                    headerShown: false,
                    title: 'Recherche',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookDetails"
                options={{
                    headerShown: true,
                    headerLeft: () => <Ionicons size={20} style={{marginLeft: 15}} name="arrow-back" color="white" onPress={() => {
                        // @ts-ignore
                        navigation.navigate('recherche')
                    }} />,
                    headerStyle: { backgroundColor: 'black' },
                    href: null,
                    title: '',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                  headerShown: false,
                  title: 'Mon profil',
                  tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} /> }}
            />
        </Tabs>
    );
}
