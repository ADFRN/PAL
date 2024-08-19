import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert} from "react-native";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');


export default function SettingsScreen() {
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sectionLogOutButton} onPress={() => auth.signOut().then(() => router.replace('/login'))}>
        <View>
          <Text style={styles.logOutText}>Déconnexion</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionDeleteAccountButton} onPress={() => {Alert.alert("Êtes-vous sûr de vouloir supprimer votre compte ?", "Cette action est irréversible", [{text: 'Non', style: 'cancel'}, {text: 'Oui', style:'destructive' , onPress: () => {console.log('Delete account')}}])}}>
        <View>
          <Text style={styles.deleteAccountText}>Supprimer mon compte</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLogOutButton: {
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
  },
  sectionDeleteAccountButton: {
    width: width * 0.9,
    height: 50,
    backgroundColor: 'red',
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
  logOutText: {
    gap: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAccountText: {
    gap: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
