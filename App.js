import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Platform, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import AlumnosScreen from './screens/AlumnosScreen';
import NovedadesScreen from './screens/NovedadesScreen';
import AyudaScreen from './screens/AyudaScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TramitesScreen from './screens/TramitesScreen';
import ConsultasScreen from './screens/ConsultasScreen';
import SitiosScreen from './screens/SitiosScreen';
import ReglamentosScreen from './screens/ReglamentosScreen';
import BuscaAulaScreen from './screens/BuscaAulaScreen';
import CalendarioAcademicoScreen from './screens/CalendarioAcademicoScreen';
import ComisionesAsignaturaScreen from './screens/ComisionesAsignaturaScreen';
import BuscaAulaPorCarreraScreen from './screens/BuscaAulaPorCarreraScreen';
import AsignaturasPorCarreraScreen from './screens/AsignaturasPorCarreraScreen';
import SitioDetalleScreen from './screens/SitioDetalleScreen';
import WebViewScreen from './screens/WebViewScreen';
import ProgramasAsignaturaScreen from './screens/ProgramasAsignaturaScreen';
import PlanesEstudioScreen from './screens/PlanesEstudioScreen';
import ProgramasDeptoScreen from './screens/ProgramasDeptoScreen';
import ProgramasCarreraScreen from './screens/ProgramasCarreraScreen';
import TramiteDetalleScreen from './screens/TramiteDetalleScreen';
import EmailScreen from './screens/EmailScreen';
import EncontranosScreen from './screens/EncontranosScreen';
import CorrelatividadesScreen from './screens/CorrelatividadesScreen';
import RedesScreen from './screens/RedesScreen';
import MapaScreen from './screens/MapaScreen';
import ContactosScreen from './screens/ContactosScreen';
import CorreosScreen from './screens/CorreosScreen';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const NovedadesStack = createStackNavigator();
const ContactosStack = createStackNavigator();
const AyudaStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Tramites" component={TramitesScreen} />
      <HomeStack.Screen name="Consultas" component={ConsultasScreen} />
      <HomeStack.Screen name="Sitios" component={SitiosScreen} />
      <HomeStack.Screen name="Reglamentos" component={ReglamentosScreen} />
      <HomeStack.Screen name="Busca tu aula" component={BuscaAulaScreen} />
      <HomeStack.Screen name="Calendario Academico" component={CalendarioAcademicoScreen} />
      <HomeStack.Screen name="ProgramasDepto" component={ProgramasDeptoScreen} />
      <HomeStack.Screen name="PlanesEstudio" component={PlanesEstudioScreen} />
      <HomeStack.Screen name="Correlatividades" component={CorrelatividadesScreen} />
      <HomeStack.Screen name="WebViewScreen" component={WebViewScreen} />
      <HomeStack.Screen name="EmailScreen" component={EmailScreen} />
      <HomeStack.Screen name="EncontranosScreen" component={EncontranosScreen} />
      <HomeStack.Screen name="Redes" component={RedesScreen} />
      <HomeStack.Screen name="MapaScreen" component={MapaScreen} />
      <HomeStack.Screen name="CorreosScreen" component={CorreosScreen} />
      <HomeStack.Screen name="ComisionesAsignatura" component={ComisionesAsignaturaScreen} />
      <HomeStack.Screen name="AsignaturasPorCarrera" component={AsignaturasPorCarreraScreen} />
      <HomeStack.Screen name="ProgramasCarrera" component={ProgramasCarreraScreen} />
      <HomeStack.Screen name="ProgramasAsignatura" component={ProgramasAsignaturaScreen} />
      <HomeStack.Screen name="TramiteDetalle" component={TramiteDetalleScreen} />
      <HomeStack.Screen name="SitioDetalle" component={SitioDetalleScreen} />
    </HomeStack.Navigator>
  );
}

function NovedadesStackScreen() {
  return (
    <NovedadesStack.Navigator screenOptions={{ headerShown: false }}>
      <NovedadesStack.Screen name="NovedadesMain" component={NovedadesScreen} />
    </NovedadesStack.Navigator>
  );
}

function ContactosStackScreen() {
  return (
    <ContactosStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactosStack.Screen name="ContactosMain" component={ContactosScreen} />
    </ContactosStack.Navigator>
  );
}

function AyudaStackScreen() {
  return (
    <AyudaStack.Navigator screenOptions={{ headerShown: false }}>
      <AyudaStack.Screen name="AyudaMain" component={AyudaScreen} />
    </AyudaStack.Navigator>
  );
}

function TabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Novedades') {
            return <FontAwesome5 name="newspaper" size={size-2} color={color} />;
          } else if (route.name === 'Contactos') {
            return <Ionicons name="call" size={size} color={color} />;
          } else if (route.name === 'Ayuda') {
            return <Ionicons name="help-circle" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#333',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          paddingBottom: Platform.OS === 'android' ? 0 : 0,
          paddingTop: 8,
          height: Platform.OS === 'android' ? 74 : 94,
          borderTopWidth: 1,
          borderColor: '#eee',
          backgroundColor: '#fafafa',
        },
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 4, width: '100%' }}>
              <View style={{ flex: 1, backgroundColor: '#b5458d' }} />
              <View style={{ flex: 1, backgroundColor: '#5aaa31' }} />
              <View style={{ flex: 1, backgroundColor: '#66b2d6' }} />
              <View style={{ flex: 1, backgroundColor: '#f59c00' }} />
              <View style={{ flex: 1, backgroundColor: '#d32a17' }} />
            </View>
            <View style={{ flex: 1, backgroundColor: '#fafafa' }} />
          </View>
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Home');
          },
        })}
        options={{
          tabBarAccessibilityLabel: 'Inicio',
          tabBarAccessibilityHint: 'Ir a la pantalla principal de inicio',
        }}
      />
      <Tab.Screen 
        name="Novedades" 
        component={NovedadesStackScreen} 
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Novedades');
          },
        })}
        options={{
          tabBarAccessibilityLabel: 'Novedades',
          tabBarAccessibilityHint: 'Ver novedades y noticias importantes',
        }}
      />
      <Tab.Screen 
        name="Contactos" 
        component={ContactosStackScreen} 
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Contactos');
          },
        })}
        options={{
          tabBarAccessibilityLabel: 'Contactos',
          tabBarAccessibilityHint: 'Ver contactos y redes sociales',
        }}
      />
      <Tab.Screen 
        name="Ayuda" 
        component={AyudaStackScreen} 
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            navigation.navigate('Ayuda');
          },
        })}
        options={{
          tabBarAccessibilityLabel: 'Ayuda',
          tabBarAccessibilityHint: 'Acceder a la sección de ayuda y contacto',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1500); // 1.5 segundos
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          {/* Título siempre visible */}
          <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#fff', paddingTop: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#384d9f', textAlign: 'center', marginBottom: 8 }}>Mi Universidad</Text>
          </View>
          {/* Tabs siempre visibles, todas las pantallas deben ser hijas de TabsScreen */}
          <TabsScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
