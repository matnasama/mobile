import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AyudaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Necesitás ayuda?</Text>
      <Text style={styles.text}>Si no encontrás respuesta a tu duda, podés comunicarte con nosotros.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmailScreen')}>
        <Text style={styles.buttonText}>Escribinos</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 36 }]}>¿Dónde estamos?</Text>
      <Text style={styles.text}>Si querés buscar atención personal.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EncontranosScreen')}>
        <Text style={styles.buttonText}>Acercate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 18,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
