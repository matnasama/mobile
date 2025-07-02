import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Image } from 'react-native';

export default function MapaScreen() {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa del campus</Text>
      <ImageZoom
        cropWidth={width}
        cropHeight={height - 100}
        imageWidth={width - 32}
        imageHeight={height - 180}
        minScale={1}
        maxScale={3}
      >
        <Image
          source={require('../assets/mapa.jpg')}
          style={{ width: width - 32, height: height - 180, borderRadius: 12, backgroundColor: '#f5f5f5' }}
          resizeMode="contain"
          accessibilityLabel="Mapa del campus UNM"
        />
      </ImageZoom>
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
  title: {
    fontSize: 20,
    color: '#1976d2',
  },
});
