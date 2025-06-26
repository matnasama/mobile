import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const DATA_URLS = [
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCAYT.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCEYJ.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DHYCS.json',
];
const DEPARTAMENTOS_INFO = [
  {
    carpeta: 'DCAYT',
    nombre: 'DEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA',
    color: '#3399cc',
  },
  {
    carpeta: 'DCEYJ',
    nombre: 'DEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS',
    color: '#006400',
  },
  {
    carpeta: 'DHYCS',
    nombre: 'DEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES',
    color: '#ff0000',
  },
];

export default function CorrelatividadesScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepto, setSelectedDepto] = useState(null);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    Promise.all(DATA_URLS.map(url => fetch(url).then(res => res.json())))
      .then(dataArr => {
        setData(dataArr);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los datos de correlatividades');
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBeforeRemove = (e) => {
        if (selectedCarrera !== null) {
          e.preventDefault();
          setSelectedCarrera(null);
        } else if (selectedDepto !== null) {
          e.preventDefault();
          setSelectedDepto(null);
        }
        // Si ambos son null, dejar que navegue normalmente
      };
      navigation.addListener('beforeRemove', onBeforeRemove);
      return () => navigation.removeListener('beforeRemove', onBeforeRemove);
    }, [selectedDepto, selectedCarrera, navigation])
  );

  if (loading) return <ActivityIndicator size="large" color="#384d9f" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', textAlign:'center', marginTop: 40}}>{error}</Text>;

  // Paso 1: Selección de departamento
  if (selectedDepto === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seleccioná un departamento</Text>
        {DEPARTAMENTOS_INFO.map((dep, idx) => (
          <TouchableOpacity
            key={dep.carpeta}
            style={[styles.deptoBtn, { backgroundColor: dep.color }]}
            onPress={() => setSelectedDepto(idx)}
            accessibilityLabel={`Seleccionar ${dep.nombre}`}
            accessibilityHint={`Ver carreras del ${dep.nombre}`}
          >
            <Text style={styles.deptoBtnText}>{dep.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const carreras = data[selectedDepto] || [];
  const deptoColor = DEPARTAMENTOS_INFO[selectedDepto]?.color || '#384d9f';
  const deptoNombre = DEPARTAMENTOS_INFO[selectedDepto]?.nombre || '';

  // Paso 2: Selección de carrera
  if (selectedCarrera === null) {
    if (carreras.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No se encontraron carreras para este departamento.</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deptoNombre}</Text>
        <FlatList
          data={carreras}
          keyExtractor={item => `${item.codigo}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.deptoBtn, { backgroundColor: deptoColor }]}
              onPress={() => setSelectedCarrera(item)}
              accessibilityLabel={`Seleccionar carrera ${item.carrera}`}
              accessibilityHint={`Ver materias de la carrera ${item.carrera}`}
            >
              <Text style={styles.deptoBtnText}>{item.carrera}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // Paso 3: Mostrar materias de la carrera seleccionada
  // Traer todas las asignaturas, sin filtrar por cuatrimestre
  const asignaturasRaw = selectedCarrera.asignaturas || [];
  const asignaturas = Object.values(
    asignaturasRaw.reduce((acc, asig) => {
      if (asig["Código"] && !acc[asig["Código"]]) {
        acc[asig["Código"]] = asig;
      }
      return acc;
    }, {})
  );
  const atributosCorrel = [
    'Correlatividad Débil',
    'Correlatividad Fuerte',
    'Correlatividades',
    'Correlatividad regularizada',
    'Correlatividad aprobada',
  ];

  return (
    <FlatList
      data={asignaturas}
      keyExtractor={item => `${item['Código']}`}
      renderItem={({ item }) => {
        const correl = atributosCorrel.map(attr => item[attr]).find(val => val !== undefined && val !== null && val !== '');
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item['Asignatura-Actividad'] || '-'}</Text>
            <Text style={styles.cardText}><Text style={styles.cardLabel}>Código:</Text> {item['Código'] || '-'}</Text>
            <Text style={styles.cardText}><Text style={styles.cardLabel}>Correlatividades:</Text> {correl ? correl : 'No posee'}</Text>
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{marginTop: 30, color: '#888'}}>No hay correlatividades para esta carrera.</Text>}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>{selectedCarrera.carrera}</Text>
        </View>
      }
      contentContainerStyle={{paddingBottom: 24, paddingTop: 8}}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#384d9f',
    textAlign: 'center',
  },
  deptoBtn: {
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'center',
    width: 320,
    minWidth: 220,
    maxWidth: 320,
  },
  deptoBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#384d9f',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  cardLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
});
