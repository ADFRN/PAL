import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { width } from "@/constants/utils";

export interface CustomDropDownProps {
  label: string;
  open: boolean;
  value: string;
  items: any;
  setOpen: any;
  setValue: any;
  setItems: any;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({ label, open, value, items, setOpen, setValue, setItems }) => {
return (
<View style={styles.inputContainerDropdown}>
        <Text style={styles.labelDropdown}>{label}</Text>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ right: 0, width: width * 0.4, justifyContent: 'flex-end' }}
              dropDownContainerStyle={{ width: width * 0.4, justifyContent: 'flex-end', zIndex: 10 }}
            />
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  inputContainerDropdown: {
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
  labelDropdown: {
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
  },
  dropdownContainer: {
    zIndex: 10,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
export default CustomDropDown;