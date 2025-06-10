import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function SitioDetalleScreen({ route }) {
  const { sitio } = route.params;
  // Buscar campo imagen
  const imagenKey = Object.keys(sitio).find(k => k.toLowerCase().includes('imagen'));
  const imagenPath = imagenKey ? sitio[imagenKey] : null;
  const baseUrl = 'https://raw.githubusercontent.com/matnasama/depto-alumnos/5fb38fcb1f2c80d345780ed1461100bb7b15023b/public/';
  const imagenUrl = imagenPath ? (imagenPath.startsWith('http') ? imagenPath : baseUrl + imagenPath) : null;
  // Título
  const entries = Object.entries(sitio).filter(([key]) => key !== 'id' && key !== 'ID');
  const titulo = entries.length > 0 ? entries[0][1] : 'Sitio';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imagenUrl && <Image source={{ uri: imagenUrl }} style={styles.image} resizeMode="cover" />}
      <Text style={styles.title}>{titulo}</Text>
      {entries.slice(1).map(([key, value], idx) => (
        typeof value === 'string' && value !== imagenPath ? (
          <Text key={idx} style={styles.text}>{value}</Text>
        ) : null
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 260, height: 260, borderRadius: 18, marginBottom: 18, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  text: { fontSize: 16, marginBottom: 8, textAlign: 'center' },
});
