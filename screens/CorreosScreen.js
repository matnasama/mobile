import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CorreosScreen() {
  const navigation = useNavigation();
  const [correos, setCorreos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/contactos.json')
      .then(res => res.json())
      .then(data => {
        setCorreos(data);
        setLoading(false);
      })
      .catch(() => {
        setCorreos([]);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#1976d2"
          style={{ marginRight: 12 }}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Volver"
        />
        <Text style={styles.title}>Correos de contacto</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#384d9f" style={{marginTop: 24}} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {correos.length === 0 ? (
            <Text style={{ color: '#333', marginTop: 8 }}>No hay correos disponibles.</Text>
          ) : (
            correos.map((item, idx) => (
              <View key={idx} style={styles.correoItem}>
                <Text style={styles.correoNombre}>{item.nombre}</Text>
                <Text style={styles.correoContacto}>{item.contacto}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  correoItem: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '95%',
    maxWidth: 400,
  },
  correoNombre: {
    fontWeight: 'bold',
    color: '#384d9f',
    fontSize: 16,
    marginBottom: 2,
  },
  correoContacto: {
    color: '#222',
    fontSize: 15,
    marginLeft: 4,
  },
});
