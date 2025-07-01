import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [alumnosData, setAlumnosData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/matnasama/depto-alumnos/refs/heads/main/src/data/data.json')
      .then(res => res.json())
      .then(data => {
        setAlumnosData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  const cardColors = [
    '#b5458d',
    '#5aaa31',
    '#66b2d6',
    '#f59c00',
    '#d32a17',
  ];

  const cardIcons = [
    <MaterialIcons name="assignment" size={38} color="#fff" />, // Trámites
    <Ionicons name="help-circle" size={38} color="#fff" />, // Consultas
    <Entypo name="link" size={38} color="#fff" />, // Sitios
    <MaterialIcons name="gavel" size={38} color="#fff" />, // Reglamento
    <FontAwesome5 name="chalkboard-teacher" size={38} color="#fff" />, // Busca tu aula
    <MaterialIcons name="event" size={38} color="#fff" />, // Calendario Académico
    <MaterialIcons name="menu-book" size={38} color="#fff" />, // Programas de asignatura
    <MaterialIcons name="school" size={38} color="#fff" />, // Planes de estudio
    <MaterialIcons name="compare-arrows" size={38} color="#fff" />, // Correlatividades
  ];

  if (loading) return <ActivityIndicator size="large" color="#333" />;
  if (error) return <Text style={{color:'red'}}>{error}</Text>;
  if (!alumnosData) return null;

  // Debug: mostrar datos y estructura de botones
  const botones = [
    { label: 'Trámites', onPress: () => navigation.navigate('Tramites', { data: alumnosData.tramites }) },
    { label: 'Consultas', onPress: () => navigation.navigate('Consultas', { data: alumnosData.consultas }) },
    { label: 'Sitios', onPress: () => navigation.navigate('Sitios', { data: alumnosData.sitios }) },
    { label: 'Reglamento', onPress: () => navigation.navigate('Reglamentos') },
    { label: 'Busca tu aula', onPress: () => navigation.navigate('Busca tu aula', { reset: true }) },
    { label: 'Calendario Académico', onPress: () => navigation.navigate('Calendario Academico') },
    { label: 'Programas de asignatura', onPress: () => navigation.navigate('ProgramasDepto') },
    { label: 'Planes de estudio', onPress: () => navigation.navigate('PlanesEstudio') },
    { label: 'Correlatividades', onPress: () => navigation.navigate('Correlatividades') },
  ];

  return (
    <View style={{width:'100%', flex:1, backgroundColor:'#fff'}}>
      <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flexGrow:1}}>
        <View style={styles.cardsContainer}>
          {botones.map((btn, idx) => (
            <TouchableOpacity
              key={btn.label}
              style={[
                styles.card,
                { backgroundColor: cardColors[idx % cardColors.length] },
              ]}
              onPress={btn.onPress}
              activeOpacity={0.85}
              accessibilityLabel={btn.label}
              accessibilityHint={`Acceso a la sección ${btn.label}`}
            >
              {cardIcons[idx]}
              <Text style={styles.cardText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    gap: 16,
  },
  card: {
    width: 140,
    height: 140,
    borderRadius: 70,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 2,
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
});
