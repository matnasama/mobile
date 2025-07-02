import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
    <View style={{width:'100%', flex:1, backgroundColor:'#fff'}}>
      <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flexGrow:1}}>
        {/* Botones principales */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tramites')}
          accessible={true}
          accessibilityLabel="Trámites"
          accessibilityHint="Ver y gestionar trámites de alumnos"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Trámites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Consultas')}
          accessible={true}
          accessibilityLabel="Consultas"
          accessibilityHint="Ver consultas frecuentes de alumnos"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home', { screen: 'Sitios' })}
          accessible={true}
          accessibilityLabel="Sitios"
          accessibilityHint="Ver sitios y enlaces útiles para alumnos"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Sitios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home', { screen: 'Reglamentos' })}
          accessible={true}
          accessibilityLabel="Reglamento"
          accessibilityHint="Ver reglamento de alumnos"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Reglamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home', { screen: 'Busca tu aula' })}
          accessible={true}
          accessibilityLabel="Busca tu aula"
          accessibilityHint="Buscar el aula asignada para tus materias"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Busca tu aula</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendario Academico')}
          accessible={true}
          accessibilityLabel="Calendario Académico"
          accessibilityHint="Ver el calendario académico de la universidad"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Calendario Académico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProgramasDepto')}
          accessible={true}
          accessibilityLabel="Programas de asignatura"
          accessibilityHint="Ver programas de asignaturas por departamento"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Programas de asignatura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PlanesEstudio')}
          accessible={true}
          accessibilityLabel="Planes de estudio"
          accessibilityHint="Ver los planes de estudio disponibles"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Planes de estudio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Correlatividades')}
          accessible={true}
          accessibilityLabel="Correlatividades"
          accessibilityHint="Ver información sobre correlatividades de materias"
        >
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={true}>Correlatividades</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#384d9f',
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
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
});
