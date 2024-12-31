import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = async (name, email, phone, password) => {
    try {
      const response = await axios.post('http://192.168.1.8:8080/api/client/register', {
        name,
        email,
        phone,
        password,
      });
      Alert.alert('Registration Successful', 'You can now log in');
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        console.error('Registration Error:', error.response.data);
      } else if (error.request) {
        console.error('Network Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      Alert.alert('Registration Failed', 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.jpg')}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.5}
        >
          {/* Optional TouchableOpacity */}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Register</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Create Your Account</Text>
          <View style={styles.card}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
          </View>

          <View style={styles.card}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.card}>
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCorrect={false}
            />
          </View>

          <View style={styles.card}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.termsText}>
            By selecting "Accept and Continue,"{' '}
            <Text style={styles.linkText}>
              you accept the Terms of Service and Privacy Policy.
            </Text>
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await registerUser(name, email, phone, password);
            }}
          >
            <Text style={styles.buttonText}>Accept and Continue</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 100,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -40,
  },
  formContainer: {
    marginHorizontal: 30,
    marginTop: 32,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  formHeader: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 15,
    color: 'white',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
    width: '90%',
    left: '5%',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B0C4DE',
    color: '#333',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#8fbc8f',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  termsText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  linkText: {
    color: '#8fbc8f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
