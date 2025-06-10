import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AyudaScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <Text style={[styles.title, {marginTop: 32}]}>¿No encontrás respuesta a tu duda?</Text>
      <Text style={styles.text}>Envianos un correo a <Text style={styles.email}>alumnos@unm.edu.ar</Text> para realizar la consulta.</Text>
      <Text style={[styles.text, {marginTop: 18}]}>En el correo mencionado envianos los siguientes datos:</Text>
      <View style={styles.listBox}>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Número de documento</Text></Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Nombre y apellido</Text></Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Carrera que cursás</Text></Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Consulta</Text> que no encontrás en las opciones y sobre la cual querés despejar dudas</Text>
      </View>
      <Text style={[styles.text, {marginTop: 18, color: '#0a2447', fontWeight: 'bold'}]}>¡Estamos para ayudarte!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976d2',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
    textAlign: 'left',
  },
  email: {
    color: '#1976d2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listBox: {
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 14,
    width: '100%',
  },
  listItem: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    color: '#0a2447',
  },
});
