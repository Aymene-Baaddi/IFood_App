import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuScreen from './pages/MenuItems/MenuScreen';
import MenuDetails from './pages/MenuItems/MenuDetails';
import Panier from './pages/Panier';
import Header from './components/Header';
import Settings from './pages/Settings';
import DetailCommande from './pages/DetailCommande';
import ConfirmerCommande from './pages/ConfirmerCommande';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            header: () => <Header />, 
          }}
        />
        <Stack.Screen
          name="MenuDetails"
          component={MenuDetails}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Panier"
          component={Panier}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            header: () => <Header />,
          }}
        />
         <Stack.Screen
          name="ConfirmerCommande"
          component={ConfirmerCommande}
          options={{
            header: () => <Header />,
          }}
        />
         <Stack.Screen
          name="DetailCommande"
          component={DetailCommande}
          options={{
            header: () => <Header />,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
