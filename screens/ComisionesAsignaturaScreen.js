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
          <View
            style={styles.comisionItem}
            accessible={true}
            accessibilityLabel={`Comisión ${item["Comisión"]}, Docente: ${item["Docente/s (1)"] || 'No especificado'}, Día y horario: ${item["Día/s y horario/s"] || 'No especificado'}`}
            accessibilityHint="Información detallada de la comisión de la asignatura"
          >
            <Text style={{fontWeight:'bold'}} allowFontScaling={true}>Comisión: {item["Comisión"]}</Text>
            {item["Docente/s (1)"] && <Text allowFontScaling={true}>Docente: {item["Docente/s (1)"]}</Text>}
            {item["Día/s y horario/s"] && <Text allowFontScaling={true}>Día y horario: {item["Día/s y horario/s"]}</Text>}
            {item["Turno"] && <Text allowFontScaling={true}>Turno: {item["Turno"]}</Text>}
            {item["Aula/s"] && <Text allowFontScaling={true}>Aula: {item["Aula/s"]}</Text>}
            {item["Aula"] && <Text allowFontScaling={true}>Aula: {item["Aula"]}</Text>}
            {item["Modalidad Cursada"] && <Text allowFontScaling={true}>Modalidad: {item["Modalidad Cursada"]}</Text>}
            {item["Clase presencial"] && <Text allowFontScaling={true}>Clase presencial: {item["Clase presencial"]}</Text>}
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
