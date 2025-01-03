import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ImageBackground,Alert,} from 'react-native';
import axios from 'axios';
import Svg, { Path, ClipPath, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const [email, setEmail] = useState('');
  const [motdepasse, setmotdepasse] = useState('');
  const navigation=useNavigation();

  const loginUser = async (email, motdepasse) => {
    try {
      const response = await axios.post('http://192.168.1.8:8080/api/client/login', {
        email,
        motdepasse,
      });

      if (response.status === 200) {
        const user = response.data; 
        await AsyncStorage.setItem('userId', user.id.toString());
        Alert.alert('Login Successful', `Welcome, ${user.nom || 'User'}`);
        navigation.navigate('MenuScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.jpg')}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.title}>IFOOD</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.card}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.card}>
            <TextInput placeholder="Password" 
            secureTextEntry={true} 
            style={styles.input} 
            value={motdepasse} 
            onChangeText={(motdepasse) => setmotdepasse(motdepasse)} 
            autoCapitalize="none" 
            autoCorrect={false} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => loginUser(email, motdepasse)}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', marginVertical: 10, color: 'white', fontSize: 20, fontWeight: '600',}}>
            or
          </Text>
          <TouchableOpacity style={styles.cardapi} >
            <View style={styles.socialIconContainer}>
              <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
                <ClipPath id="clip0_4_216">
                  <Rect width={34} height={34} fill="white" />
                </ClipPath>
                <Path
                  d="M34 17C34 7.61115 26.3888 0 17 0C7.61115 0 0 7.61115 0 17C0 25.4851 6.21662 32.5181 14.3438 33.7935V21.9141H10.0273V17H14.3438V13.2547C14.3438 8.99406 16.8818 6.64062 20.7649 6.64062C22.6243 6.64062 24.5703 6.97266 24.5703 6.97266V11.1562H22.4267C20.315 11.1562 19.6562 12.4668 19.6562 13.8125V17H24.3711L23.6174 21.9141H19.6562V33.7935C27.7834 32.5181 34 25.4851 34 17Z"
                  fill="#1877F2"
                  clipPath="url(#clip0_4_216)"
                />
                <Path
                  d="M23.6174 21.9141L24.3711 17H19.6562V13.8125C19.6562 12.4681 20.315 11.1562 22.4267 11.1562H24.5703V6.97266C24.5703 6.97266 22.6249 6.64062 20.7649 6.64062C16.8818 6.64062 14.3438 8.99406 14.3438 13.2547V17H10.0273V21.9141H14.3438V33.7935C16.1039 34.0688 17.8961 34.0688 19.6562 33.7935V21.9141H23.6174Z"
                  fill="white"
                  clipPath="url(#clip0_4_216)"
                />
              </Svg>
            </View>
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardapi}  >
            <View style={styles.socialIconContainer}>
              <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
                <ClipPath id="clip0_4_220">
                  <Rect width={34} height={34} fill="white" />
                </ClipPath>
                <Path
                  d="M33.6686 17.3916C33.6686 16.236 33.5749 15.0741 33.375 13.9373H17.34V20.4836H26.5225C26.1414 22.595 24.9171 24.4627 23.1243 25.6495V29.8972H28.6026C31.8196 26.9363 33.6686 22.5637 33.6686 17.3916Z"
                  fill="#4285F4"
                />
                <Path
                  d="M17.34 34.0012C21.925 34.0012 25.7916 32.4958 28.6088 29.8972L23.1306 25.6496C21.6064 26.6865 19.6387 27.2737 17.3462 27.2737C12.9112 27.2737 9.15077 24.2816 7.80151 20.2588H2.14838V24.6376C5.03429 30.3782 10.9123 34.0012 17.34 34.0012Z"
                  fill="#34A853"
                />
                <Path
                  d="M7.79529 20.2587C7.08318 18.1474 7.08318 15.8611 7.79529 13.7498V9.37097H2.1484C-0.262766 14.1746 -0.262766 19.8339 2.1484 24.6375L7.79529 20.2587Z"
                  fill="#FBBC04"
                />
                <Path
                  d="M17.34 6.72868C19.7637 6.69121 22.1061 7.6032 23.8614 9.27728L28.715 4.42371C25.6417 1.5378 21.5627 -0.0488268 17.34 0.00114561C10.9123 0.00114561 5.03428 3.62415 2.14838 9.37098L7.79526 13.7498C9.13827 9.72079 12.9049 6.72868 17.34 6.72868Z"
                  fill="#EA4335"
                />
              </Svg>
            </View>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center', }} >
            Don't have an account?
            <Text style={{ color: '#8fbc8f', fontWeight: 'bold', fontSize: 16, marginLeft: 10, }} onPress={() => { navigation.navigate('Register');}}>
              Sign up
            </Text>
          </Text>
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
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginTop: '35%',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E5E4',
    color: 'black',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#8fbc8f',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardapi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBFFF7',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#565353',
  },
  socialIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
