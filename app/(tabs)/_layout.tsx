import {Tabs, useRouter} from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function TabLayout() {

    const navigation = useNavigation();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    height: 60,
                    borderRadius: 50,
                },
                tabBarLabelStyle: {
                    opacity: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarStyle: { backgroundColor: 'black' },
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="recherche"
                options={{
                    tabBarStyle: { backgroundColor: 'black' },
                    headerShown: false,
                    title: 'Recherche',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookDetails"
                options={{
                    headerLeft: () => <Ionicons size={20} style={{marginLeft: 15}} name="arrow-back" color="white" onPress={() => {
                        // @ts-ignore
                        navigation.navigate('recherche')
                    }} />,
                    headerStyle: { backgroundColor: 'black' },
                    tabBarStyle: { backgroundColor: 'black' },
                    headerShown: true,
                    href: null,
                    title: '',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerStyle: { backgroundColor: 'black' },
                    headerTitleStyle: {fontSize: 20, color: 'white'},
                    tabBarStyle: { backgroundColor: 'black' },
                    headerShown: false,
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
                }}
            />
        </Tabs>
    );
}
