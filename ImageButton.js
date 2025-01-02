import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

const ImageButton = ({ onPress, text, imageSource }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <Image source={imageSource} style={styles.buttonImage} resizeMode="contain"/>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // const Button_Home = ({ onPress, text, imageSource }) => {
  //   return (
  //     <TouchableOpacity style={styles.button} onPress={onPress}>
  //       <Image source={imageSource} style={styles.buttonImage} resizeMode="contain"/>
  //       <View style={styles.buttonTextContainer}>
  //         <Text style={styles.buttonText}>{text}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // button shop
  
const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 200,
        // justifyContent: "center",
        // alignItems: "center",
        //left: "20%",
        // right: "25%",
        marginTop: 20,
        padding: 10,
        //backgroundColor: "#FF69B4",
        borderRadius: 5,
        //backgroundColor: "transparent", // Set background color to transparent
        //overflow: "hidden",
    },
   
    buttonTextContainer: {
        position: "absolute",
        bottom: 10, // Adjusted the position to be closer to the image
        zIndex: 0,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      position: "absolute", // Position text absolutely within the button
      zIndex: 1, // Ensure text appears above the image
    },
    buttonImage: {
        width: 200,
        height: 200,
        position: "absolute",
        top: 0,
        left: 100,
        zIndex: 0, 
    },
    
});
export default ImageButton; 
