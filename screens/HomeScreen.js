import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const opciones = [
  { label: 'Soy estudiante', icon: <MaterialIcons name="school" size={28} color="#fff" style={{marginRight: 8}} /> },
  { label: 'Quiero estudiar en la UNM', icon: <FontAwesome5 name="user-graduate" size={26} color="#fff" style={{marginRight: 8}} /> },
  { label: 'Carreras', icon: <MaterialIcons name="menu-book" size={28} color="#fff" style={{marginRight: 8}} /> },
  { label: 'Accesibilidad', icon: <MaterialIcons name="accessibility" size={28} color="#fff" style={{marginRight: 8}} /> },
  { label: 'Redes', icon: <Entypo name="network" size={28} color="#fff" style={{marginRight: 8}} /> },
  { label: 'Mapa', icon: <Feather name="map-pin" size={28} color="#fff" style={{marginRight: 8}} /> },
];

const cardColors = [
  '#b5458d', // Soy estudiante
  '#5aaa31', // Quiero estudiar en la UNM
  '#66b2d6', // Carreras
  '#f59c00', // Accesibilidad
  '#d32a17', // Redes
  '#0a2447', // Mapa
];

const iconos = [
  <MaterialCommunityIcons name="account-school" size={28} color="#fff" />,
  <FontAwesome5 name="university" size={26} color="#fff" />,
  <MaterialCommunityIcons name="book-multiple" size={28} color="#fff" />,
  <Ionicons name="accessibility" size={28} color="#fff" />,
  <Entypo name="social" size={28} color="#fff" />,
  <Entypo name="map" size={28} color="#fff" />,
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Universidad</Text>
      <View style={styles.cardsContainer}>
        {opciones.map((op, idx) => (
          <TouchableOpacity
            key={op.label}
            style={[styles.card, { backgroundColor: cardColors[idx % cardColors.length] }]}
            activeOpacity={0.8}
            accessibilityLabel={op.label}
            accessibilityHint={`Acceso a la sección ${op.label}`}
            // onPress={() => {}}
          >
            <View style={styles.cardContent}>
              {iconos[idx]}
              <Text style={styles.cardText} allowFontScaling={true}>{op.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Calcula el ancho de cada card para que entren 3 por fila y ocupen el 99% del ancho disponible
const GAP = 8;
const CARDS_PER_ROW = 3;
const CONTAINER_WIDTH = Dimensions.get('window').width;
const CARD_SIZE = Math.floor((CONTAINER_WIDTH - GAP * (CARDS_PER_ROW + 1)) / CARDS_PER_ROW);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#384d9f',
    textAlign: 'center',
    marginBottom: 28,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: CONTAINER_WIDTH,
    paddingHorizontal: GAP,
    gap: GAP,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 100,
    marginBottom: GAP,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.38,
    shadowRadius: 100,
    padding: 14,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
