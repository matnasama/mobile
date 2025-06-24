import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function ConsultasScreen() {
  const [consultas, setConsultas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/main/public/json/info/data.json')
      .then(res => res.json())
      .then(json => {
        setConsultas(Array.isArray(json.consultas) ? json.consultas : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las consultas');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  return (
    <ScrollView style={{ flex: 1 }}>
      {consultas.map((item, idx) => {
        const entries = Object.entries(item).filter(([key]) => key !== 'id' && key !== 'ID');
        const titulo = entries.length > 0 ? entries[0][1] : `Opción ${idx+1}`;
        return (
          <View key={idx} style={styles.accordionItem}>
            <TouchableOpacity 
              onPress={() => setOpenIndex(openIndex === idx ? null : idx)}
              accessible={true}
              accessibilityLabel={titulo}
              accessibilityHint="Expandir o contraer la consulta para ver más información"
            >
              <Text style={[styles.accordionTitle, {textTransform: 'uppercase'}]} allowFontScaling={true}>{titulo}</Text>
            </TouchableOpacity>
            {openIndex === idx && (
              <View style={styles.accordionContent}>
                {entries.slice(1).map(([_, value], i) => (
                  <Text key={i} style={styles.itemText}>{typeof value === 'object' ? JSON.stringify(value) : value}</Text>
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
  accordionItem: { marginHorizontal: 16, marginTop: 8, marginBottom: 8, borderRadius: 8, backgroundColor: '#f5f5f5' },
  accordionTitle: { fontSize: 16, fontWeight: 'regular', padding: 12 },
  accordionContent: { padding: 12, borderTopWidth: 1, borderColor: '#ccc' },
  itemText: { fontSize: 14, marginBottom: 4 },
});
