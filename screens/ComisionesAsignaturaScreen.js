import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ComisionesAsignaturaScreen({ route }) {
  const { asignatura } = route.params;
  const comisiones = asignatura["Comisiones"] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{asignatura["Asignatura-Actividad"]}</Text>
      <Text style={styles.subtitle}>Código: {asignatura["Código"]}</Text>
      <FlatList
        data={comisiones}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
          <View style={styles.comisionItem}>
            <Text style={{fontWeight:'bold'}}>Comisión: {item["Comisión"]}</Text>
            {item["Docente/s (1)"] && <Text>Docente: {item["Docente/s (1)"]}</Text>}
            {item["Día/s y horario/s"] && <Text>Día y horario: {item["Día/s y horario/s"]}</Text>}
            {item["Turno"] && <Text>Turno: {item["Turno"]}</Text>}
            {item["Aula/s"] && <Text>Aula: {item["Aula/s"]}</Text>}
            {item["Aula"] && <Text>Aula: {item["Aula"]}</Text>}
            {item["Modalidad Cursada"] && <Text>Modalidad: {item["Modalidad Cursada"]}</Text>}
            {item["Clase presencial"] && <Text>Clase presencial: {item["Clase presencial"]}</Text>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>No hay comisiones para esta asignatura.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',     // Centrado horizontal
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 16, textAlign: 'center' },
  comisionItem: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center', // Centrado horizontal de los items
  },
  noResult: { textAlign: 'center', color: '#888', marginTop: 10 },
});
