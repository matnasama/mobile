import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = [
  { src: require('../assets/home/aniversario.webp'), url: 'https://www.unm.edu.ar/index.php/la-unm/15-aniversario' },
  { src: require('../assets/home/comision.webp'), url: 'https://www.unm.edu.ar/index.php/la-unm/gobierno-universitario/reforma-del-estatuto' },
  { src: require('../assets/home/declaracion-consejo.webp'), url: 'https://www.unm.edu.ar/index.php/destacados/3231-declaracion-del-consejo-superior' },
  { src: require('../assets/home/declaracion.webp'), url: 'https://www.unm.edu.ar/index.php/destacados/3228-declaracion-del-rector-en-relacion-al-inicio-de-actividades-en-el-edificio-del-consejo-escolar-en-el-predio-de-la-espunm' },
  { src: require('../assets/home/jornada.webp'), url: 'https://www.unm.edu.ar/index.php/destacados/3169-jornadas-de-comunicacion-social-unm-xxvii-congreso-redcom' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      {images.map((img, idx) => (
        <TouchableOpacity key={idx} onPress={() => navigation.navigate('WebViewScreen', { url: img.url })} activeOpacity={0.85}
          accessibilityLabel={`Abrir noticia ${idx+1}`}
          accessibilityHint="Abre el enlace de la noticia en una nueva pantalla"
        >
          <Image
            source={img.src}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={`Imagen de la noticia ${idx+1}`}
            accessibilityHint="Imagen ilustrativa de la noticia"
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 180,
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
});
