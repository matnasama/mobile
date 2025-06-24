import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AsignaturasPorCarreraScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { carrera } = route.params;

  // Filtrar asignaturas que no sean de cuatrimestre 2
  const asignaturas = (carrera.asignaturas || []).filter(
    asig => asig["Cuatrimestre"] != 2 && asig["Cuatrimestre"] != "2"
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carrera.carrera}</Text>
      <FlatList
        data={asignaturas}
        keyExtractor={(item, idx) => `${carrera.codigo}-${item["Código"] || idx}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.asigItem}
            onPress={() => navigation.navigate('ComisionesAsignatura', {
              asignatura: {
                ...item,
                carreraCodigo: carrera.codigo,
                carreraNombre: carrera.carrera,
              }
            })}
            accessibilityLabel={`Ver comisiones de la asignatura ${item["Asignatura-Actividad"]}`}
            accessibilityHint={`Muestra las comisiones disponibles para la asignatura ${item["Asignatura-Actividad"]}`}
          >
            <Text style={{fontWeight:'bold', fontSize:16}} allowFontScaling={true}>{item["Asignatura-Actividad"]}</Text>
            <Text style={{color:'#888'}} allowFontScaling={true}>Código: {item["Código"]}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>No se encontraron asignaturas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  asigItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  noResult: { textAlign: 'center', color: '#888', marginTop: 10 },
});
