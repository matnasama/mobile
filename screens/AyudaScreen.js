import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AyudaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.title}>Horario de atención:</Text>
        <Text style={styles.text}>Lunes a Viernes de 9 a 19hs.</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.title}>¿Necesitás ayuda?</Text>
        <Text style={styles.text}>Si no encontrás respuesta a tu duda, podés comunicarte con nosotros.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmailScreen')}
          accessibilityLabel="Escribir consulta por email"
          accessibilityHint="Abre el formulario para enviar una consulta por correo electrónico"
        >
          <Text style={styles.buttonText} allowFontScaling={true}>Escribinos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block}>
        <Text style={styles.title}>¿Dónde estamos?</Text>
        <Text style={styles.text}>Si querés buscar atención personal.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EncontranosScreen')}
          accessibilityLabel="Ver ubicación de la universidad"
          accessibilityHint="Abre la pantalla con la ubicación y el mapa de la universidad"
        >
          <Text style={styles.buttonText} allowFontScaling={true}>Acercate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  block: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
    textAlign: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#384d9f',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    maxWidth: 350,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
