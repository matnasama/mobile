import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function CalendarioAcademicoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/calendarioGrado.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el calendario.');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      {Array.isArray(data) && data.map((item, idx) => (
        <View key={idx} style={styles.accordionItem}>
          <TouchableOpacity onPress={() => setOpenIndex(openIndex === idx ? null : idx)} style={styles.accordionTitleBox} activeOpacity={0.8}>
            <Text style={styles.accordionTitle}>{item.actividad || `Evento ${idx+1}`}</Text>
          </TouchableOpacity>
          {openIndex === idx && (
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>{item.periodo || 'Sin fecha'}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accordionItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  accordionTitleBox: {
    padding: 16,
    backgroundColor: '#1976d2',
  },
  accordionTitle: {
    color: '#fff',
    fontWeight: 'regular',
    fontSize: 14,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionText: {
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
  },
});
