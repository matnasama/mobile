import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

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

export default function ProgramasDeptoScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/programas.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar la información.');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Elegí un departamento</Text>
      {DEPARTAMENTOS_INFO.map(dep => (
        <TouchableOpacity
          key={dep.carpeta}
          style={[styles.button, { backgroundColor: dep.color }]}
          onPress={() => navigation.navigate('ProgramasCarrera', { depto: dep, data })}
          activeOpacity={0.85}
          accessible={true}
          accessibilityLabel={dep.nombre}
          accessibilityHint="Seleccionar departamento para ver carreras y programas"
        >
          <Text style={styles.buttonText} allowFontScaling={true}>{dep.nombre}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1976d2',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 0, // se controla con height
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
    maxWidth: 400,
    minHeight: 56, // altura mínima uniforme
    height: 126, // altura fija para simetría
    justifyContent: 'center', // centra el texto verticalmente
    display: 'flex', // asegura flexbox
    marginHorizontal: 'auto', // centra horizontalmente
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
});
