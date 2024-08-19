import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { width } from "@/constants/utils";
import { ColorPalette } from "@/constants/Colors";

const AddToLibraryButton = ({ onPress, disabled, text, iconName }: any) => {
 return (
   <TouchableOpacity style={styles(disabled).sectionAddToLibrary} disabled={disabled} onPress={() => onPress()}>
     <View style={styles(disabled).sectionTextAdd}>
       <Ionicons name={iconName} size={20} color={disabled ? 'white' : 'black'} />
       <Text style={styles(disabled).sectionText}>{text}</Text>
     </View>
   </TouchableOpacity>
 );
}

const styles = (disabled: boolean) => StyleSheet.create({
  sectionAddToLibrary: {
    width: width * 0.9,
    height: 50,
    backgroundColor: disabled ? ColorPalette.green : 'rgba(255,255,255,0.82)',
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
  sectionTextAdd: {
    gap: 10,
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: disabled ? 'white' : '#333',
  },
});

export default AddToLibraryButton;