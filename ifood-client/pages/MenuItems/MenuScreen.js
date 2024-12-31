import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function MenuScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryRefs = useRef({});
  const categoryScrollView = useRef(null);

  useEffect(() => {
    axios.get('http://192.168.1.8:8080/api/menuitem')
      .then(response => {
        setMenuItems(response.data);
        const uniqueCategories = [...new Set(response.data.map(item => item.categorie))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error(error));
  }, []);

  const scrollToCategory = (cat) => {
    if (categoryRefs.current[cat]) {
      categoryRefs.current[cat].measureLayout(
        categoryScrollView.current,
        (x, y) => {
          categoryScrollView.current.scrollTo({ y, animated: true });
        },
        () => console.error('Erreur lors de la mesure de la disposition.')
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToCategory(cat)}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView ref={categoryScrollView}>
        {categories.map((cat) => (
          <View
            key={cat}
            ref={(ref) => (categoryRefs.current[cat] = ref)}
          >
            <Text style={styles.categoryTitle}>{cat}</Text>
            {menuItems
              .filter(item => item.categorie === cat)
              .map(menu => (
                <TouchableOpacity
                  key={menu.id}
                  onPress={() => navigation.navigate('MenuDetails', { menu })}
                  style={styles.menuCard}>
                  <Image
                    source={{ uri: menu.image || 'https://via.placeholder.com/50' }} 
                    style={styles.menuImage}
                  />
                  <View style={styles.menuDetails}>
                    <Text style={styles.menuName}>{menu.nom}</Text>
                    <Text>{menu.description}</Text>
                    <Text style={styles.menuPrice}>{menu.prix} €</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Moderne et lumineux
  },
  header: {
    backgroundColor: '#00796b', // Couleur accent moderne
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  categoryText: {
    color: '#00796b',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#e0f2f1',
    borderRadius: 20,
    overflow: 'hidden',
    textAlign: 'center',
  },
  categoryTextActive: {
    backgroundColor: '#004d40',
    color: '#ffffff',
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 15,
    color: '#333333',
    borderBottomWidth: 2,
    borderBottomColor: '#00796b',
    paddingBottom: 5,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  },
  menuCardHover: {
    transform: 'scale(1.05)',
    backgroundColor: '#f9f9f9',
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#f5f5f5',
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 10,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 5,
  },
  footer: {
    backgroundColor: '#004d40',
    padding: 15,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    elevation: 5,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
