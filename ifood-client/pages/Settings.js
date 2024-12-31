import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const [isEnabled_loc, setIsEnabled_loc] = useState(false);
  const [isEnabled_notify, setIsEnabled_notify] = useState(false);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation=useNavigation();
  
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      setUserId(id);
    });
  }, []);

  const fetchClientData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.8:8080/api/client/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données du client :", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchClientData();
    }
  }, [userId]);

  const toggleSwitch_loc = () => setIsEnabled_loc((prevState) => !prevState);
  const toggleSwitch_notify = () => setIsEnabled_notify((prevState) => !prevState);
  return (
    <>

      <ScrollView style={styles.scrollView}>
       
      <TouchableOpacity style={styles.button2} activeOpacity={0.5}>
  <Image source={require("../assets/profile.png")} style={styles.buttonImage1} />

 
  {user ? (
  <View> 
    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 15 }}>
      {user.nom}
    </Text>
    <Text style={{ fontWeight: "600", fontSize: 15, marginBottom: 15, marginTop: -15 }}>
      {user.email}
    </Text>
  </View>
) : (
  <Text>Aucun utilisateur trouvé</Text>
)}

</TouchableOpacity>


        <View style={{  top: "7%", width: "100%", flex: 1 }}>
          <Text style={{fontWeight: 600,fontSize: 18,marginBottom:15,marginTop:5,marginLeft:10,color:"#928C8A"}}>PREFERENCES</Text>


          <TouchableOpacity style={styles.container} activeOpacity={0.5}>
            <Image source={require("../assets/localis.png")} style={styles.icon} />
            <Text style={styles.textLabel}>Localisation</Text>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#DDDDDD", true: "#1FCF2F" }}
                thumbColor={isEnabled_loc ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#DDDDDD"
                onValueChange={toggleSwitch_loc}
                value={isEnabled_loc}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.container} activeOpacity={0.5}>
            <Image source={require("../assets/notification.png")} style={styles.icon} />
            <Text style={styles.textLabel}>Notifications</Text>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#DDDDDD", true: "#1FCF2F" }}
                thumbColor={isEnabled_notify ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#DDDDDD"
                onValueChange={toggleSwitch_notify}
                value={isEnabled_notify}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} activeOpacity={0.5}>
                <Image source={require("../assets/supprimer.png")} style={styles.icon}/>
                <Text style={{fontWeight: 600,fontSize: 18,marginTop:5,marginLeft:10,alignItems:'center' }}>Fermer-compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} activeOpacity={0.5}
            onPress={() => { navigation.navigate('Historique'); }}>
                <Image source={require("../assets/supprimer.png")} style={styles.icon}/>
                <Text style={{fontWeight: 600,fontSize: 18,marginTop:5,marginLeft:10,alignItems:'center' }}>historique des commande</Text>
            </TouchableOpacity>

            </View>  
            <View style={{  top: "12%",width:"100%",flex:1,}} >
            <Text style={{fontWeight: 600,fontSize: 18,marginBottom:15,marginTop:5,marginLeft:10,color:"#928C8A"}}>Help</Text>
            <TouchableOpacity style={styles.container} activeOpacity={0.5}>
                <Image source={require("../assets/help.png")} style={styles.icon}/>
                <Text style={{fontWeight: 600,fontSize: 18,marginTop:5,marginLeft:10,alignItems:'center' }}>Assistance</Text>
                 
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} activeOpacity={0.5}>
                <Image source={require("../assets/contact.png")} style={styles.icon}/>
                <Text style={{fontWeight: 600,fontSize: 18,marginTop:5,marginLeft:10,alignItems:'center' }}>Contact-us</Text>
           
           </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "white",
      backgroundColor: "white",
      borderRadius: 10,
      marginVertical: 5,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,


    },
    icon: {
      width: 30,
      height: 30,
      tintColor: "#1FCF2F",
    },
    button2: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 20,
      backgroundColor: "#fff",
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 10,
      shadowColor: "#000",
    
    },
    buttonImage1: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 20,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    sectionHeader: {
      fontSize: 24,
      fontWeight: "700",
      color: "#333",
      marginBottom: 10,
    },
    textLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
      marginLeft: 15,
    },
    switchContainer: {
      flex: 1,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    switchText: {
      fontSize: 16,
      color: "#888",
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 15,
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15,
      paddingHorizontal: 20,  // Added padding inside each section to maintain spacing.
    },
    profileName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    profileEmail: {
      fontSize: 15,
      fontWeight: "600",
      color: "#555",
      marginTop: -10,
    },
    helpText: {
      fontSize: 18,
      fontWeight: "600",
      marginTop: 10,
      color: "#928C8A",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      paddingHorizontal: 20,
    },
    footerButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F9F9F9",
      padding: 10,
      borderRadius: 8,
      width: "48%",
      justifyContent: "center",
    },
    footerButtonText: {
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 10,
      color: "#333",
    },
    scrollView: {
        backgroundColor: "white", 
        flex: 1,
      },
  });
  