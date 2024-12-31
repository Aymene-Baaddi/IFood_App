import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ConfirmerCommande = ({ route, navigation }) => {
  const { userId } = route.params;
  const [panier, setPanier] = useState(null);
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [montantTotal, setMontantTotal] = useState(0);

  useEffect(() => {
    axios.get(`http://192.168.1.8:8080/api/panier/${userId}`)
      .then(response => {
        setPanier(response.data);
        const total = response.data.panierMenuItemDtos.reduce(
          (acc, item) => acc + item.quantite * item.menuItem.prix, 0
        );
        setMontantTotal(total);
      })
      .catch(error => {
        console.error("Erreur lors du chargement du panier :", error);
      });
  }, [userId]);

  const handleSubmit = () => {
    const commandeDto = {
      panier_id: parseInt(userId, 10),
      adresse_livraison: adresseLivraison,
      statut: 'TRAITEMENT',
    };

    axios.post('http://192.168.1.8:8080/api/commandes', commandeDto)
      .then(response => {
        const commandeId = response.data.id;
        alert('Commande confirmée !');
        navigation.navigate('DetailCommande', { commandeId, userId });
      })
      .catch(error => {
        console.error("Erreur lors de la confirmation de la commande :", error);
      });
  };

  if (!panier) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Confirmation de la commande</Text>
      <View style={styles.invoiceContainer}>
        <Text style={styles.subtitle}>Détails du panier</Text>
        {panier.panierMenuItemDtos.map(item => (
          <View key={item.menuItem.id} style={styles.invoiceItem}>
            <Text style={styles.itemName}>{item.menuItem.nom}</Text>
            <Text style={styles.itemQuantity}>
              {item.quantite} x {item.menuItem.prix}€
            </Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Montant total : {montantTotal}€</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.subtitle}>Adresse de livraison</Text>
        <TextInput
          style={styles.input}
          value={adresseLivraison}
          onChangeText={setAdresseLivraison}
          placeholder="Saisissez votre adresse"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmer la commande</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  invoiceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#777',
  },
  totalContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  addressContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmerCommande;
