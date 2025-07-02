import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Linking } from 'react-native';

export default function SitiosScreen({ navigation }) {
  const [sitios, setSitios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Base URL de imágenes
  const baseUrl = 'https://raw.githubusercontent.com/matnasama/mobile/db317d25616a0c8ca907e66cf2f21dfb597a51ce/assets/';
  const imageStyle = {
    width: '90%',
    height: 150,
    borderRadius: 16,
    marginVertical: 16,
    alignSelf: 'center',
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/data.json')
      .then(res => res.json())
      .then(json => {
        setSitios(Array.isArray(json.sitios) ? json.sitios : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los sitios');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.gridContainer} style={{ backgroundColor: '#fff' }}>
      {sitios.map((item, idx) => {
        const imagenKey = Object.keys(item).find(k => k.toLowerCase().includes('imagen'));
        const imagenPath = imagenKey ? item[imagenKey] : null;
        const imagenUrl = imagenPath ? (imagenPath.startsWith('http') ? imagenPath : baseUrl + imagenPath) : null;
        const url = item.enlace || item.url || item.link;
        if (!(imagenUrl && url)) return null;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.gridItem}
            onPress={() => {
              if ((item.nombre || '').toUpperCase().includes('CAMPUS VIRTUAL') && Array.isArray(item.subcategorias)) {
                navigation.navigate('SitioDetalle', { sitio: item });
              } else {
                // Abrir en navegador externo
                Linking.openURL(url);
              }
            }}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel={item.nombre || item.titulo || `Sitio ${idx+1}`}
            accessibilityHint={((item.nombre || '').toUpperCase().includes('CAMPUS VIRTUAL')) ? 'Ver opciones de campus virtual' : 'Abre el sitio web en el navegador'}
          >
            <Image source={{ uri: imagenUrl }} style={imageStyle} resizeMode="contain" accessibilityLabel={item.nombre || item.titulo || `Imagen del sitio ${idx+1}`}/>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  gridItem: {
    alignItems: 'center',
    margin: 12,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    // Sombra para Android
    elevation: 4,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
  gridTitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 140,
  },
});
