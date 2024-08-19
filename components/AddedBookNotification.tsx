import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { width } from "@/constants/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import { ColorPalette } from "@/constants/Colors";


const BookAddedNotification = ({ visible, onAnimationEnd, text }: any) => {
  return (
    visible && (
      <Animatable.View
        style={styles.container}
        animation="fadeIn"
        duration={500}
        onAnimationEnd={onAnimationEnd}
      >
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          iterationDelay={1000}
        >
          <View style={styles.notificationBox}>
            <FontAwesome6 name="check" size={100} color="white" />
            <Text style={styles.notificationText}>{text}</Text>
          </View>
        </Animatable.View>
      </Animatable.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: width * 0.1,
    right: width * 0.1,
    width: width * 0.8,
    height: "50%",
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBox: {
    width: width * 0.8,
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    backgroundColor: ColorPalette.green,
    padding: 20,
    borderRadius: 10,
  },
  notificationText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 18,
  },
});

export default BookAddedNotification;
