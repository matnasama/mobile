import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DATA_URLS = [
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCAYT.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCEYJ.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DHYCS.json',
];
const DEPARTAMENTOS = ['DCAYT', 'DCEYJ', 'DHYCS'];

export default function BuscaAulaPorCarreraScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    Promise.all(DATA_URLS.map(url => fetch(url).then(res => res.json())))
      .then(dataArr => {
        setData(dataArr);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los datos de aulas');
        setLoading(false);
      });
  }, []);

  // Unificar carreras
  const carreras = data.flatMap((arr, idx) =>
    (arr || []).map(carreraObj => ({
      ...carreraObj,
      depto: DEPARTAMENTOS[idx],
    }))
  );

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', textAlign:'center', marginTop: 40}}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elegí una carrera</Text>
      <FlatList
        data={carreras}
        keyExtractor={item => `${item.depto}-${item.codigo}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.carreraItem}
            onPress={() => navigation.navigate('AsignaturasPorCarrera', { carrera: item })}
          >
            <Text style={{fontWeight:'bold', fontSize:16}}>{item.carrera}</Text>
            <Text style={{color:'#888'}}>Departamento: {item.depto}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>No se encontraron carreras.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  carreraItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  noResult: { textAlign: 'center', color: '#888', marginTop: 10 },
});
