import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

export default function SitiosScreen({ route }) {
  const { data } = route.params;
  const [openIndex, setOpenIndex] = useState(null);

  // Base URL de imágenes
  const baseUrl = 'https://raw.githubusercontent.com/matnasama/depto-alumnos/5fb38fcb1f2c80d345780ed1461100bb7b15023b/public/';

  return (
    <ScrollView style={{ flex: 1 }}>
      {Array.isArray(data) && data.map((item, idx) => {
        const entries = Object.entries(item).filter(([key]) => key !== 'id' && key !== 'ID');
        const titulo = entries.length > 0 ? entries[0][1] : `Opción ${idx+1}`;
        // Buscar campo imagen o url de imagen
        const imagenKey = Object.keys(item).find(k => k.toLowerCase().includes('imagen'));
        const imagenPath = imagenKey ? item[imagenKey] : null;
        const imagenUrl = imagenPath ? (imagenPath.startsWith('http') ? imagenPath : baseUrl + imagenPath) : null;
        return (
          <View key={idx} style={styles.accordionItem}>
            <TouchableOpacity onPress={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <Text style={[styles.accordionTitle, {textTransform: 'uppercase'}]}>{titulo}</Text>
            </TouchableOpacity>
            {openIndex === idx && (
              <View style={styles.accordionContent}>
                {imagenUrl && (
                  <Image source={{ uri: imagenUrl }} style={styles.siteImage} resizeMode="contain" />
                )}
                {entries.slice(1).map(([_, value], i) => (
                  typeof value === 'string' && value !== imagenPath ? (
                    <Text key={i} style={styles.itemText}>{value}</Text>
                  ) : null
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accordionItem: { marginHorizontal: 16, marginBottom: 8, borderRadius: 8, backgroundColor: '#f5f5f5' },
  accordionTitle: { fontSize: 16, fontWeight: 'bold', padding: 12 },
  accordionContent: { padding: 12, borderTopWidth: 1, borderColor: '#ccc' },
  itemText: { fontSize: 14, marginBottom: 4 },
  siteImage: { width: '100%', height: 180, marginBottom: 10, borderRadius: 8, backgroundColor: '#eee' },
});
