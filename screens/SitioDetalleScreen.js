import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function SitioDetalleScreen({ route }) {
  const { sitio } = route.params;
  const [showAnteriores, setShowAnteriores] = useState(false);
  // Si es CAMPUS VIRTUAL y tiene subcategorías, mostrar botones
  if (sitio.nombre && sitio.nombre.toUpperCase().includes('CAMPUS VIRTUAL') && Array.isArray(sitio.subcategorias)) {
    // Separar campus anteriores (2020-2024)
    const campusAnteriores = sitio.subcategorias.filter(sub =>
      sub.titulo && /2020|2021|2022|2023|2024/.test(sub.titulo)
    );
    const campusActuales = sitio.subcategorias.filter(sub =>
      !campusAnteriores.includes(sub)
    );
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{sitio.nombre}</Text>
        <Text style={styles.text}>Accedé a los diferentes campus virtuales según el ciclo lectivo:</Text>
        {campusActuales.map((sub, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.campusBtn}
            onPress={() => Linking.openURL(sub.enlace)}
            activeOpacity={0.85}
            accessibilityLabel={`Acceder a ${sub.nombre}`}
            accessibilityHint={`Abre el campus virtual ${sub.nombre} en el navegador`}
          >
            <Text style={styles.campusBtnText} allowFontScaling={true}>{sub.nombre}</Text>
          </TouchableOpacity>
        ))}
        {/* Botón y acordeón para campus anteriores */}
        {campusAnteriores.length > 0 && (
          <View style={{width:'100%', alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.campusBtn, {flexDirection:'row', justifyContent:'center', alignItems:'center'}]}
              onPress={() => setShowAnteriores(!showAnteriores)}
              activeOpacity={0.85}
              accessibilityLabel="Mostrar u ocultar campus anteriores"
              accessibilityHint="Despliega o esconde la lista de campus virtuales de años anteriores"
            >
              <Text style={styles.campusBtnText} allowFontScaling={true}>Campus anteriores</Text>
              <Text style={{color:'#fff', fontSize:18, marginLeft:8}} allowFontScaling={true}>{showAnteriores ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {showAnteriores && (
              <View style={{width:'100%', marginTop:4}}>
                {campusAnteriores.map((sub, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.campusBtn, {backgroundColor:'#4e6fae', marginVertical:4}]}
                    onPress={() => Linking.openURL(sub.enlace)}
                    activeOpacity={0.85}
                    accessibilityLabel={`Acceder a ${sub.nombre}`}
                    accessibilityHint={`Abre el campus virtual ${sub.nombre} en el navegador`}
                  >
                    <Text style={styles.campusBtnText} allowFontScaling={true}>{sub.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }

  const entries = Object.entries(sitio).filter(([key]) => key !== 'id' && key !== 'ID');
  const titulo = entries.length > 0 ? entries[0][1] : 'Sitio';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      {entries.slice(1).map(([key, value], idx) => (
        typeof value === 'string' ? (
          <Text key={idx} style={styles.text}>{value}</Text>
        ) : null
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  text: { fontSize: 16, marginBottom: 8, textAlign: 'center' },
  campusBtn: {
    backgroundColor: '#384d9f',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'center',
    width: 260, // ancho fijo para todos los botones
    minWidth: 220,
    maxWidth: 320,
  },
  campusBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
