import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Panier() {
  const [userId, setUserId] = useState(null);
  const [panier, setPanier] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      setUserId(id);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchPanier = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://192.168.1.8:8080/api/panier/${userId}`);
          setPanier(response.data);
          //AsyncStorage.setItem('panierId', panier.id.toString());
        } catch (error) {
          console.error("Erreur lors de la récupération du panier:", error);
          Alert.alert("Erreur", "Impossible de charger le panier.");
        } finally {
          setLoading(false);
        }
      };

      fetchPanier();
    }
  }, [userId]);

  const calculerTotal = () => {
    if (!panier || !panier.panierMenuItemDtos) return 0;
    return panier.panierMenuItemDtos.reduce(
      (total, item) => total + item.menuItem.prix * item.quantite,
      0
    ).toFixed(2);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!panier || panier.panierMenuItemDtos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={panier.panierMenuItemDtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.menuItem.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.menuItem.nom}</Text>
              <Text style={styles.description}>{item.menuItem.description}</Text>
              <Text style={styles.price}>{item.menuItem.prix} €</Text>
              <Text style={styles.quantity}>Quantité: {item.quantite}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total : {calculerTotal()} €</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ConfirmerCommande', { userId })}
      >
        <Text style={styles.buttonText}>Transformer en Commande</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
   
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
