import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailCommande = ({ route }) => {
  const { commandeId } = route.params;
  const [panier, setPanier] = useState(null);
  const [commande, setCommande] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      setUserId(id);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://192.168.1.8:8080/api/panier/${userId}`)
        .then(response => {
          setPanier(response.data);
        })
        .catch(error => {
          console.error("Erreur lors du chargement du panier :", error);
        });

      axios.get(`http://192.168.1.8:8080/api/commandes/${commandeId}`)
        .then(response => {
          setCommande(response.data);
        })
        .catch(error => {
          console.error("Erreur lors du chargement de la commande :", error);
        });
    }
  }, [userId, commandeId]);

  if (!panier || !commande) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des détails...</Text>
      </View>
    );
  }

  const montantTotal = panier.panierMenuItemDtos.reduce(
    (acc, item) => acc + item.quantite * item.menuItem.prix, 0
  );

  const statusSteps = ["TRAITEMENT", "PREPARATION", "RECUPERATION", "EN_ROUTE"];
  const currentStepIndex = statusSteps.indexOf(commande.statut);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails de la Commande</Text>

     {/* Order Status Path */}
     <View style={styles.statusPathContainer}>
        {statusSteps.map((step, index) => (
          <View key={index} style={styles.statusStepContainer}>
            {/* Cercle du statut */}
            <View
              style={[
                styles.statusCircle,
                index <= currentStepIndex ? styles.statusActive : styles.statusInactive,
              ]}
            >
              <Text style={styles.statusCircleText}>{index + 1}</Text>
            </View>
            {/* Affichage du statut actuel sous le cercle */}
            {index === currentStepIndex && (
              <Text style={styles.statusStepTextCurrent}>{step}</Text>
            )}
          </View>
        ))}
      </View>


      {/* Delivery Address */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Adresse de Livraison</Text>
        <Text style={styles.text}>{commande.adresse_livraison}</Text>
      </View>

      {/* Cart Details */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Détails du Panier</Text>
        {panier.panierMenuItemDtos.map(item => (
          <View key={item.menuItem.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.menuItem.nom}</Text>
            <Text style={styles.itemPrice}>
              {item.quantite} x {item.menuItem.prix}€
            </Text>
          </View>
        ))}
      </View>

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Montant Total : {montantTotal}€</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f9',
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
    statusPathContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusStepContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statusCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  statusActive: {
    backgroundColor: '#4caf50', // Couleur active
  },
  statusInactive: {
    backgroundColor: '#ccc', // Couleur inactive
  },
  statusCircleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusStepTextCurrent: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4caf50',
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: '#4CAF50', 
    paddingVertical: 12, 
    paddingHorizontal: 25,
    borderRadius: 30, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8,
    elevation: 5, 
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', 
    alignSelf: 'center', 
  },
  totalText: {
    fontSize: 20, 
    fontWeight: '600',
    color: '#fff', 
    textAlign: 'center',
    letterSpacing: 1, 
    textTransform: 'uppercase', 
  },
});

export default DetailCommande;
