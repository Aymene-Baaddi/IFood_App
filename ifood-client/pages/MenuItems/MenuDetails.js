import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function MenuDetails({ route }) {
  const { menu } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const navigation =useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userId').then((id) => {
      setUserId(id);
    });

    axios
      .get(`http://192.168.1.8:8080/api/menuitem`)
      .then((response) => {
        const items = response.data.filter(item => item.categorie === menu.categorie && item.id !== menu.id);
        setRelatedItems(items);
      })
      .catch((error) => console.error('Erreur lors de la récupération des éléments similaires:', error));
  }, [menu.categorie, menu.id]);

  const handleAddToCart = () => {
    if (!userId) {
      Alert.alert('Erreur', 'Veuillez vous connecter pour ajouter des éléments au panier.');
      return;
    }

    axios
      .post(`http://192.168.1.8:8080/api/panier/${userId}/Addmenuitems/${menu.id}`, null, {
        params: { quantite: quantity },
      })
      .then(() => {
        Alert.alert('Succès', 'Menu ajouté au panier !');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout au panier', error);
        Alert.alert('Erreur', 'Erreur lors de l\'ajout au panier');
      });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: menu.image }} style={styles.image} />
      <Text style={styles.title}>{menu.nom}</Text>
      <Text style={styles.description}>{menu.description}</Text>
      <Text style={styles.price}>{menu.prix} €</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Button title="Ajouter au panier" color="#4caf50" onPress={handleAddToCart} />

      <Text style={styles.sectionTitle}>Éléments similaires</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
        {relatedItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('MenuDetails', { menu: item })}
            style={styles.relatedCard}
          >
            <Image source={{ uri: item.image || 'https://via.placeholder.com/100' }} style={styles.relatedImage} />
            <Text style={styles.relatedName}>{item.nom}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'justify',
    marginVertical: 15,
  },
  price: {
    fontSize: 24,
    color: '#4caf50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'left',
  },
  relatedScroll: {
    marginVertical: 10,
  },
  relatedCard: {
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
