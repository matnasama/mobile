import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
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

const Tab = createBottomTabNavigator();
const AlumnosStack = createStackNavigator();

function AlumnosStackScreen() {
  return (
    <AlumnosStack.Navigator>
      <AlumnosStack.Screen name="AlumnosMain" component={AlumnosScreen} options={{ title: 'Alumnos' }} />
      <AlumnosStack.Screen name="Tramites" component={TramitesScreen} />
      <AlumnosStack.Screen name="Consultas" component={ConsultasScreen} />
      <AlumnosStack.Screen name="Sitios" component={SitiosScreen} />
      <AlumnosStack.Screen name="Reglamentos" component={ReglamentosScreen} />
      <AlumnosStack.Screen name="Busca tu aula" component={BuscaAulaScreen} />
      <AlumnosStack.Screen name="AsignaturasPorCarrera" component={AsignaturasPorCarreraScreen} />
      <AlumnosStack.Screen name="ComisionesAsignatura" component={ComisionesAsignaturaScreen} options={{ title: 'Comisiones' }} />
      <AlumnosStack.Screen name="Calendario Academico" component={CalendarioAcademicoScreen} />
    </AlumnosStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Home') {
                  return <Ionicons name="home" size={size} color={color} />;
                } else if (route.name === 'Alumnos') {
                  return <MaterialIcons name="people" size={size} color={color} />;
                } else if (route.name === 'Novedades') {
                  return <FontAwesome5 name="newspaper" size={size-2} color={color} />;
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
                height: Platform.OS === 'android' ? 70 : 90,
                borderTopWidth: 1,
                borderColor: '#eee',
                backgroundColor: '#fafafa',
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Alumnos" component={AlumnosStackScreen} />
            <Tab.Screen name="Novedades" component={NovedadesScreen} />
            <Tab.Screen name="Ayuda" component={AyudaScreen} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
