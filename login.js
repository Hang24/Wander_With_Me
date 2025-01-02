import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';


function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      
      const response = await axios.post('http://ip:5000/login', { 
      
        username,
        password
      });

      if (response.data) {
        Alert.alert('Login Successful', `You have ${response.data.totalStrawberries} strawberries`);
        navigation.navigate('Home', { 
          totalStrawberries: response.data.totalStrawberries,
          username  // Pass username to HomeScreen for updating 
        });}
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data.message || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      
      const response = await axios.post('http://ip:5000/register', { 
        username,
        password
      });

      if (response.data) {
        Alert.alert('Registration Successful', 'You can now log in');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data.message || 'Server error');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  }
});

export { LoginScreen, RegisterScreen };
