
import { StatusBar, Modal, Button, ImageBackground } from "react-native"; 
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
//import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'; 
import { TouchableOpacity, Alert} from 'react-native';
import ImageButton from './ImageButton';
import ShopButton from './ShopButton';
import InventoryButton from './InventoryButton';
import {Pedometer} from 'expo-sensors';
import { LoginScreen, RegisterScreen} from "./login";
import axios from 'axios';

// import LoginScreen from './LoginScreen';
import { GestureHandlerRootView} from 'react-native-gesture-handler'




const Stack = createStackNavigator();
function roundToEven(num) {
  return Math.round(num);
}




function WalkScreen({ navigation, PedometerAvailability, stepCount, setStepCount, totalStrawberries, setTotalStrawberries }) {
  const [modalVisible, setModalVisible] = useState(false); 
  // Tracks steps for this session only
  const [sessionStepCount, setSessionStepCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setStepCount(0); // Reset step count to 0 every time WalkScreen is focused
            // Start pedometer sensor
      const subscription = Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
            });
      return () => {
        subscription.remove(); // Cleanup pedometer subscription
      };
    }, [])
  );


  

  const strawberriesEarned = roundToEven(stepCount * 0.025);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/walk_bg.png")} style={styles.backgroundImage}>

        <ImageButton
          onPress={() => {
            setSessionStepCount(0);
            console.log("Stop button pressed"); // Debug log
            setStepCount(0); // Reset step count globally when stopping
            setModalVisible(true);
          }}
          imageSource={require("./assets/button_stop.png")}
        />

        {/* Display session step count */}
        <View style={styles.pedometerContainer}>
          {/* <Text style={styles.headingDesign}>
            Is pedometer available on the device: {PedometerAvailability}
          </Text> */}
          <View style={styles.stepCountBox}>
            <Text style={styles.stepCountText}>{stepCount}</Text>
          </View>
          {/* <Text>Steps in this session: {stepCount}</Text> */}
        </View>
        <StatusBar style="auto" />
          
        <Image style={[styles.image]} source={require('./assets/rockyRefSide.gif')} resizeMode="contain"/>
      </ImageBackground>
        
      {/* Modal component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.textContainer}>
              <Text style={[styles.modalText, { marginBottom: 10 }]}>WALK STATS</Text>
              <Text style={styles.modalText}>Total steps: {stepCount}</Text>
              <Text style={styles.modalText}>Strawberries earned: {strawberriesEarned}</Text>
            </View>
            <Button title="OK!" onPress={() => {
              const updatedTotal = totalStrawberries + strawberriesEarned;
              setTotalStrawberries(updatedTotal);
              console.log('Total Strawberries in WalkScreen:', updatedTotal);
              navigation.navigate('Home');
            }} />
          </View>
        </View>
      </Modal>
    </View>
    
    
  );
  
}


//Inventory
function InventoryScreen({ navigation }) {
  const [StoreItem, setStoreItem] = useState([
    {name: 'Item1', key: '1', image: require('./assets/watermelon_item.png')},
    {name: 'Item2', key: '2', image: require('./assets/strawberry_item.png')},
    {name: 'Item3', key: '3', image: require('./assets/bread_item.png')},
    {name: 'Item4', key: '4', image: require('./assets/cookie_item.png')},
    {name: 'Item5', key: '5', image: require('./assets/chocolate_item.png')},
    {name: 'Item6', key: '6', image: require('./assets/lemon_item.png')},
  ]);

  //use item from inventory
  const handleUseItem = (itemName) => {
    console.log(`${itemName} used!`);
    // Here you can add the logic for using the item
    // For example, update inventory, apply effects, etc.
  };
  
  return (
    <View style={styles.container}>
        <ImageBackground source={require("./assets/lightyellow.png")} style={styles.backgroundImage}>
          {/* <Image style={styles.image_store} source={require('./assets/rockyRefFront.png')} resizeMode="contain"/> */}
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {StoreItem.map((item) => (
                <View style={styles.itemContainer} key={item.key}>
                  <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                  {/* <Text style={styles.itemName}>Strawberry</Text> */}
                  <TouchableOpacity
                  style={styles.useButton}
                  onPress={() => handleUseItem(item.name)}
                >  
                <Text style={styles.useButtonText}>USE</Text>
                </TouchableOpacity>
                </View>
              ))
            }
            </ScrollView>
        </View>
        </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

function StoreScreen({ navigation, totalStrawberries, setTotalStrawberries }) {
  const [StoreItem, setStoreItem] = useState([
    {
      name: 'Watermelon seed', 
      price: 3,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>1</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/watermelon_item.png'), 
      key: '1'
    },

    {
      name: 'Bread', 
      price:5,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>5</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/bread_item.png'), 
      key: '2'
    },
    
    {
      name: 'Strawberry', 
      price:2,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>2</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/strawberry_item.png'), 
      key: '3'
    },
    
    {
      name: 'Cookie', 
      price:5,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>5</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/cookie_item.png'), 
      key: '4'
    },

    {
      name: 'Chocolate', 
      price:4,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>4</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/chocolate_item.png'), 
      key: '5'
    },

    {
      name: 'lemon', 
      price:5,
      description: (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, backgroundColor: '#e9ce1e00', borderColor: '#ffffff', borderRadius: 5, padding: 5, marginTop: 1, marginBottom: 3 }}>
          <Text>5</Text>
          <Image source={require('./assets/strawberry_earned.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
      ), 
      image: require('./assets/lemon_item.png'), 
      key: '6'
    },
    
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleBuyPress = (item) => {
    if (totalStrawberries >= item.price) {
      setSelectedItem(item);
      setModalVisible(true); // Show confirmation modal
    } else {
      // Show alert if not enough strawberries
      Alert.alert("Insufficient Strawberries", "You don't have enough strawberries to buy this item.");
    }
  };
  const handleConfirmation = (buy) => {
    if (buy && selectedItem) {
      // Deduct the price from totalStrawberries
      const newTotal = totalStrawberries - selectedItem.price;
      setTotalStrawberries(newTotal);
      Alert.alert("Purchase Successful", `You have bought ${selectedItem.name}!`);
    }
    setModalVisible(false); // Close modal
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require("./assets/store_bg.png")} style={styles.backgroundImage}>
          {/* <Image style={styles.image_store} source={require('./assets/rockyRefFront.png')} resizeMode="contain"/> */}
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {StoreItem.map((item) => (
                // <View style={styles.item} key={item.key}>
                //   <Text style={styles.item}>{item.name}</Text>
                <View style={styles.itemContainer} key={item.key}>
                  <Image source={item.image} style={styles.itemImage} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  {/* <View style={{marginTop: 10}}>{item.description}</View> */}
                  <Text>{item.description}</Text>
                  <TouchableOpacity style={styles.useButton} onPress={() => handleBuyPress(item)}>
                    <Text style={styles.useButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
            </ScrollView>
        </View>
         {/* Confirmation Modal */}
         <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to buy {selectedItem?.name}?</Text>
              <View style={styles.buttonRow}>
                <Button title="Yes" onPress={() => handleConfirmation(true)} />
                <Button title="No" onPress={() => handleConfirmation(false)} />
              </View>
            </View>
          </View>
        </Modal>
        </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

function HomeScreen({ navigation, totalStrawberries, stepCount, strawberriesEarned, setTotalStrawberries }) {
  
  // useEffect(() => {
  //   const updatedTotal = totalStrawberries + strawberriesEarned;
  //   setTotalStrawberries(updatedTotal);
  //   console.log('Updated Total Strawberries in WalkScreen:', updatedTotal);
  // }, [stepCount]);
  
  return (
    
    <View style={styles.container}>
      {/* ImageBackground component with the source of background image */}
      <ImageBackground source={require("./assets/home_bg.png")} style={styles.backgroundImage}>

      <View style={{ width: '100%', left: 15, justifyContent: 'center' }}>
        
        <ImageButton
          onPress={() => navigation.navigate('Walk', {
    
            // totalStrawberries: totalStrawberries,
            // setTotalStrawberries: setTotalStrawberries,
            
            // setStepCount: 0 // set step count to 0
          })}
        
        
          //onPress={() => navigation.navigate('Second')} //NAVIGATE SECOND SCREEN
          imageSource={require("./assets/button_walk.png")}
          
        />
        </View>
        
        <Image style={styles.image_home} source={require('./assets/rockyRefFront.png')} resizeMode="contain"/>
         {/* Display total strawberries earned */}
         <View style={styles.strawberryContainer}>
          <Image source={require('./assets/strawberry_earned.png')} style={styles.strawberryIcon} />
          <Text style={styles.strawberryText}>Total Strawberries: {totalStrawberries}</Text>
        </View>
      </ImageBackground>
      {/* add pedometer sensor status */}
      <View style={styles.pedometerContainer}>
      
      </View>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
      {/* shop button */}
      <ShopButton 
          style={styles.buttonStyle}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.navigate('Store')}
          //onPress={() => navigation.navigate('Second')} //NAVIGATE SECOND SCREEN
          imageSource={require("./assets/Shop_Button.png")}
        />
      <InventoryButton 
      style={styles.buttonStyle}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}

        onPress={() => navigation.navigate('Inventory')}
        //onPress={() => navigation.navigate('Second')} //NAVIGATE SECOND SCREEN
        imageSource={require("./assets/button_menu.png")}
      />
      </View>

    </View>
    
  );
 
}






export default function App() {
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, updateStepCount] = useState(0);
  const [totalStrawberries, setTotalStrawberries] = useState(0)










  return( 
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Login">
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} totalStrawberries={totalStrawberries} />}
  </Stack.Screen>
    <Stack.Screen name="Store"> 
          {(props) => (
          <StoreScreen
          {...props}
          totalStrawberries={totalStrawberries}
          setTotalStrawberries={setTotalStrawberries}
    /> 
             )} 
    </Stack.Screen>
    <Stack.Screen name="Walk">
          {(props) => (
            <WalkScreen
              {...props}
              PedometerAvailability={PedometerAvailability}
              stepCount={stepCount}
              setStepCount={updateStepCount}
              setTotalStrawberries={setTotalStrawberries} // Pass setter to update total strawberries
              totalStrawberries={totalStrawberries} // Pass current total strawberries
            />
          )}
    </Stack.Screen>
    <Stack.Screen name="Inventory" component={InventoryScreen} />
    

    
  </Stack.Navigator>
</NavigationContainer>
);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: 'center', 
        justifyContent: 'center',
    },
    title: {
        //marginTop: 150,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40
    },
    
    // pedometer status
    headingDesign:{
      color: "black",
      backgroundColor:'rgba(155,89,182,0.5)',
      alignSelf: "center",

    },
    buttonContainer: {
      // flexDirection: 'row',       // Arrange buttons in a row
      justifyContent: 'space-evenly', // Evenly space buttons
      alignItems: 'center',       // Vertically align buttons in the center
      width: '100%',              // Take the full width of the screen
      marginBottom: 10,           // Add margin if needed
    },
    
    
    
    // image for sideview walk
    image: {
        // width: 400,
        // height: 400,
        marginBottom: 2,
        top: 70,
        // justifyContent: 'center',
        left: 15,
    },
    //image for home screen racoon
    image_home: {
      width: 500,
      height: 500,
      marginBottom: 10,
      top:5,
      right:40,
  },
    image_store: {
      
      width: 500,
      height: 500,
      marginBottom: 10,
      top: 100,
      right:40,
    },
  
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: "#FF69B4",
      borderRadius: 5,
      },
      buttonText: {
        fontSize: 18,
        color: '#fff',
        
      },
      settingIcon: {
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
      },
      backgroundImage: {
        position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%', // Cover the entire screen horizontally
        height: '100%', // Cover the entire screen vertically
        
      },
     
      modalContainer: {
        
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      },
      modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-betwween",
        height: 400,
        width: 300,
      },
      textContainer: {
        flex: 1, // Take up remaining space
        justifyContent: "center", // Center text vertically
      },
      modalText: {
        marginBottom: 20, // Adjust as needed
      },
      item: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fdeac1',
        fontSize: 20,
        width: "60%"
      },
      listContainer: {
        // position: 'absolute',
        // top: '60%',
        // left: '60%',
        // transform: [{ translateX: -250 }, { translateY: -150 }], // Adjust according to the size of the list and its desired position
        width: '100%',

        // height: 300,
        zIndex: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        
      },
      scrollContent: {
        //flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 20,
      },
      itemContainer: {
        // width: '30%', // Each item will take 30% of the row width (3 items per row)
        // alignItems: 'center',
        // marginBottom: 20,
        width: '40%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFEB3B',  // Yellow background
        borderRadius: 10,             // Rounded corners
        borderWidth: 2,               // Border width
        borderColor: '#333',          // Border color (dark gray/black)
        padding: 10, 
      },

      itemImage: {
        width: 80,
        height: 80,
        marginBottom: 3,
      },
      itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingBottom: 10,
      },
      pedometerContainer: {
        position: 'absolute',
        top: 40,  // Adjust based on your design
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1, // Ensure it appears on top
      },
      useButton: {
        backgroundColor: '#FF69B4',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
      },
      useButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      strawberryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBF2',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#FF69B4',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
      },
      strawberryIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
      },
      strawberryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF69B4',
        fontFamily: 'Comic Sans MS', 
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
      },
      stepCountBox: {
        backgroundColor: '#ECB069', 
        borderRadius: 20, 
        padding: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginVertical: 10, 
        borderColor: '#8B4513',
        borderWidth: 3,
        marginTop: -30
      },
      stepCountText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
      },
    
    
});
