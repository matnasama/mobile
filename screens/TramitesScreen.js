import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TramitesScreen({ route }) {
  const { data } = route.params;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <ScrollView style={{ flex: 1 }}>
      {Array.isArray(data) && data.map((item, idx) => {
        // Buscar el primer campo que no sea id/ID para usar como título
        const entries = Object.entries(item).filter(([key]) => key !== 'id' && key !== 'ID');
        const titulo = entries.length > 0 ? entries[0][1] : `Opción ${idx+1}`;
        return (
          <View key={idx} style={styles.accordionItem}>
            <TouchableOpacity onPress={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <Text style={[styles.accordionTitle, {textTransform: 'uppercase'}]}>{titulo}</Text>
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
  accordionItem: { marginHorizontal: 16, marginBottom: 8, borderRadius: 8, backgroundColor: '#f5f5f5' },
  accordionTitle: { fontSize: 16, fontWeight: 'bold', padding: 12 },
  accordionContent: { padding: 12, borderTopWidth: 1, borderColor: '#ccc' },
  itemText: { fontSize: 14, marginBottom: 4 },
});
