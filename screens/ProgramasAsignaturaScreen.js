import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function ProgramasAsignaturaScreen({ route }) {
  const { depto, carrera, data } = route.params;
  // Filtrar todos los programas de la carrera seleccionada
  const programasCarrera = Array.isArray(data.programas)
    ? data.programas.filter(item => item.departamento === depto.carpeta && item.carrera === carrera)
    : [];
  // Tomar el primer elemento (la carrera) y mapear su contenido
  const contenidos = programasCarrera[0]?.contenido || [];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={[styles.container, { justifyContent: 'center' }]}> 
      <Text style={styles.title}>{carrera}</Text>
      {contenidos.length > 0 ? (
        contenidos.map((materia) => (
          <View key={materia.codigo} style={styles.card}>
            <Text style={styles.cardTitle}>{materia.materia}</Text>
            <Text style={styles.cardText}><Text style={styles.cardLabel}>Código:</Text> {materia.codigo}</Text>
            <Text style={styles.cardText}><Text style={styles.cardLabel}>Ciclo lectivo:</Text> {materia.ciclo_lectivo}</Text>
            <Text style={styles.cardText}><Text style={styles.cardLabel}>Resolución:</Text> {materia.resolucion}</Text>
            {typeof materia.url === 'string' && materia.url.trim() !== '' && (
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => Linking.openURL(materia.url)}
                accessibilityLabel={`Descargar programa de ${materia.materia}`}
                accessibilityHint={`Abre el PDF del programa de la materia ${materia.materia} en el navegador`}
              >
                <Text style={styles.downloadBtnText} allowFontScaling={true}>Descargar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={{marginTop: 30, color: '#888'}}>No hay programas disponibles para esta carrera.</Text>
      )}
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
    color: '#1976d2',
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
  downloadBtn: {
    marginTop: 10,
    backgroundColor: '#384d9f',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  downloadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
