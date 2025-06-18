import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const CARD_MARGIN = 10;
const CARD_WIDTH = (Dimensions.get('window').width - 3 * CARD_MARGIN) / 2;

export default function TramitesScreen({ navigation }) {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/main/public/json/info/data.json')
      .then(res => res.json())
      .then(json => {
        setTramites(Array.isArray(json.tramites) ? json.tramites : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los trámites');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {tramites.map((tramite, i) => (
          <TouchableOpacity
            key={tramite.id || i}
            style={styles.card}
            onPress={() => navigation.navigate('TramiteDetalle', { tramite })}
            activeOpacity={0.85}
          >
            <Text style={styles.cardTitle} numberOfLines={4} ellipsizeMode="tail">{tramite.nombre || tramite.titulo || `Trámite ${tramite.id || i+1}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CARD_MARGIN,
    paddingTop: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: CARD_MARGIN,
    marginHorizontal: CARD_MARGIN / 2,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 126,
    height: 146,
    flexGrow: 1,
    width: '45%',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
});
