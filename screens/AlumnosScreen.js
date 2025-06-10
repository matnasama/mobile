import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function AlumnosScreen({ navigation }) {
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

  if (loading) return <ActivityIndicator size="large" color="#333" />;
  if (error) return <Text style={{color:'red'}}>{error}</Text>;
  if (!alumnosData) return null;

  return (
    <View style={{width:'100%', flex:1, justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tramites', { data: alumnosData.tramites })}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Trámites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consultas', { data: alumnosData.consultas })}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Consultas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sitios', { data: alumnosData.sitios })}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Sitios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reglamentos')}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Reglamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Busca tu aula', { reset: true })}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Busca tu aula</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendario Academico')}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Calendario Académico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginVertical: 8,
    width: '85%',
    alignItems: 'center',
    elevation: 2,
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
});
