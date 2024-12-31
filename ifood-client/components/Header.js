import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();

  const getTitle = () => {
    switch (route.name) {
      case 'Menu':
        return 'Menu';
      case 'Panier':
        return 'Panier';
      case 'Settings':
        return 'Paramètres';
      default:
        return '';
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Icon name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{getTitle()}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
        <Icon name="shopping-cart" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});