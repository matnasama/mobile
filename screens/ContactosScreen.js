import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ContactosScreen() {
  const navigation = useNavigation();
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/contactos.json')
      .then(res => res.json())
      .then(data => setCorreos(data))
      .catch(() => setCorreos([]));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.redesBtn}
        onPress={() => navigation.navigate('Redes')}
        accessibilityLabel="Redes sociales"
        accessibilityHint="Ver redes sociales de la universidad"
      >
        <FontAwesome5 name="share-alt" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.redesText}>Redes sociales</Text>
        <Ionicons name="chevron-forward" size={22} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redesBtn}
        onPress={() => navigation.navigate('MapaScreen')}
        accessibilityLabel="Mapa del campus"
        accessibilityHint="Ver el mapa del campus universitario"
      >
        <Ionicons name="map" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.redesText}>Mapa del campus</Text>
        <Ionicons name="chevron-forward" size={22} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redesBtn}
        onPress={() => {/* Aquí puedes navegar a la pantalla de accesibilidad si existe */}}
        accessibilityLabel="Accesibilidad"
        accessibilityHint="Ver opciones de accesibilidad"
      >
        <Ionicons name="accessibility" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.redesText}>Accesibilidad</Text>
        <Ionicons name="chevron-forward" size={22} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redesBtn}
        onPress={() => navigation.navigate('CorreosScreen')}
        accessibilityLabel="Correos"
        accessibilityHint="Ver correos de contacto"
      >
        <Ionicons name="mail" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.redesText}>Correos</Text>
        <Ionicons name="chevron-forward" size={22} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 32,
  },
  redesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#384d9f',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  redesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
