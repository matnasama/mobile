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
const AlumnosStack = createStackNavigator();
const MainStack = createStackNavigator();

function AlumnosStackScreen() {
  return (
    <AlumnosStack.Navigator>
      <AlumnosStack.Screen name="AlumnosMain" component={AlumnosScreen} options={{ title: 'Alumnos' }} />
      <AlumnosStack.Screen name="Tramites" component={TramitesScreen} />
      <AlumnosStack.Screen name="Consultas" component={ConsultasScreen} options={{ title: 'Consultas frecuentes' }}/>
      <AlumnosStack.Screen name="Sitios" component={SitiosScreen} />
      <AlumnosStack.Screen name="Reglamentos" component={ReglamentosScreen} options={{ title: 'Reglamento de Alumnos' }}/>
      <AlumnosStack.Screen name="Busca tu aula" component={BuscaAulaScreen} />
      <AlumnosStack.Screen name="AsignaturasPorCarrera" component={AsignaturasPorCarreraScreen} options={{ title: 'Asignaturas' }} />
      <AlumnosStack.Screen name="ComisionesAsignatura" component={ComisionesAsignaturaScreen} options={{ title: 'Comisiones' }} />
      <AlumnosStack.Screen name="Calendario Academico" component={CalendarioAcademicoScreen} />
      <AlumnosStack.Screen name="SitioDetalle" component={SitioDetalleScreen} options={{ title: 'Detalle del sitio' }} />
      <AlumnosStack.Screen name="ProgramasDepto" component={ProgramasDeptoScreen} options={{ title: 'Programas de asignatura' }} />
      <AlumnosStack.Screen name="ProgramasCarrera" component={ProgramasCarreraScreen} options={{ title: 'Carreras' }} />
      <AlumnosStack.Screen name="ProgramasAsignatura" component={ProgramasAsignaturaScreen} options={{ title: 'Asignaturas' }} />
      <AlumnosStack.Screen name="PlanesEstudio" component={PlanesEstudioScreen} options={{ title: 'Planes de estudio' }} />
      <AlumnosStack.Screen name="TramiteDetalle" component={TramiteDetalleScreen} options={{ title: 'Detalle del trámite' }} />
      <AlumnosStack.Screen name="Correlatividades" component={CorrelatividadesScreen} options={{ title: 'Correlatividades' }} />
    </AlumnosStack.Navigator>
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
        component={HomeScreen} 
        options={{
          tabBarAccessibilityLabel: 'Inicio',
          tabBarAccessibilityHint: 'Ir a la pantalla principal de inicio',
        }}
      />
      <Tab.Screen 
        name="Novedades" 
        component={NovedadesScreen} 
        options={{
          tabBarAccessibilityLabel: 'Novedades',
          tabBarAccessibilityHint: 'Ver novedades y noticias importantes',
        }}
      />
      <Tab.Screen 
        name="Contactos" 
        component={ContactosScreen} 
        options={{
          tabBarAccessibilityLabel: 'Contactos',
          tabBarAccessibilityHint: 'Ver contactos y redes sociales',
        }}
      />
      <Tab.Screen 
        name="Ayuda" 
        component={AyudaScreen} 
        options={{
          tabBarAccessibilityLabel: 'Ayuda',
          tabBarAccessibilityHint: 'Acceder a la sección de ayuda y contacto',
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={TabsScreen} />
      <MainStack.Screen name="Tramites" component={TramitesScreen} options={{ title: 'Trámites' }} />
      <MainStack.Screen name="Consultas" component={ConsultasScreen} options={{ title: 'Consultas frecuentes' }} />
      <MainStack.Screen name="Sitios" component={SitiosScreen} options={{ title: 'Sitios' }} />
      <MainStack.Screen name="Reglamentos" component={ReglamentosScreen} options={{ title: 'Reglamento de Alumnos' }} />
      <MainStack.Screen name="Busca tu aula" component={BuscaAulaScreen} options={{ title: 'Busca tu aula' }} />
      <MainStack.Screen name="Calendario Academico" component={CalendarioAcademicoScreen} options={{ title: 'Calendario Académico' }} />
      <MainStack.Screen name="ProgramasDepto" component={ProgramasDeptoScreen} options={{ title: 'Programas de asignatura' }} />
      <MainStack.Screen name="PlanesEstudio" component={PlanesEstudioScreen} options={{ title: 'Planes de estudio' }} />
      <MainStack.Screen name="Correlatividades" component={CorrelatividadesScreen} options={{ title: 'Correlatividades' }} />
      <MainStack.Screen name="AlumnosMain" component={AlumnosScreen} options={{ title: 'Alumnos' }} />
      <MainStack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: 'Enlace' }} />
      <MainStack.Screen name="EmailScreen" component={EmailScreen} options={{ title: 'Contacto' }} />
      <MainStack.Screen name="EncontranosScreen" component={EncontranosScreen} options={{ title: 'Dónde estamos' }} />
      <MainStack.Screen name="Redes" component={RedesScreen} options={{ title: 'Redes sociales' }} />
      <MainStack.Screen name="MapaScreen" component={MapaScreen} options={{ title: 'Mapa del campus' }} />
      <MainStack.Screen name="CorreosScreen" component={CorreosScreen} options={{ title: 'Correos de contacto' }} />
    </MainStack.Navigator>
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
          <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#fff', paddingTop: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#384d9f', textAlign: 'center', marginBottom: 8 }}>Mi Universidad</Text>
          </View>
          <MainStackScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
