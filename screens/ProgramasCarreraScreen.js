import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProgramasCarreraScreen({ route, navigation }) {
  const { depto, data } = route.params;
  // Obtener carreras únicas por departamento (ignorando POS)
  const programas = Array.isArray(data.programas) ? data.programas : [];
  const carrerasDepto = programas
    .filter(item => item.departamento === depto.carpeta && item.carrera && item.departamento !== 'POS')
    .map(item => item.carrera);
  const carrerasUnicas = Array.from(new Set(carrerasDepto));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{depto.nombre}</Text>
      {carrerasUnicas.map((nombreCarrera, idx) => (
        <TouchableOpacity
          key={nombreCarrera + idx}
          style={[styles.button, { backgroundColor: depto.color }]}
          onPress={() => navigation.navigate('ProgramasAsignatura', { depto, carrera: nombreCarrera, data })}
          activeOpacity={0.85}
          accessible={true}
          accessibilityLabel={nombreCarrera}
          accessibilityHint="Seleccionar carrera para ver programas de asignatura"
        >
          <Text style={styles.buttonText} allowFontScaling={true}>{nombreCarrera}</Text>
        </TouchableOpacity>
      ))}
      {carrerasUnicas.length === 0 && <Text style={{marginTop: 30, color: '#888'}}>No hay carreras para este departamento.</Text>}
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
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
    maxWidth: 400,
    marginHorizontal: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
});
