import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

const InventoryButton = ({ onPress, text, imageSource }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={imageSource} style={styles.shopButton} resizeMode="contain"/>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    shopButton: {
    width: 80,
    height: 80,
    
    position: "absolute",
    top: -350,
    left: 110,
    // backgroundColor: "#FF69B4",
    borderRadius: 5,
    zIndex: 10, //
  }})
  export default InventoryButton