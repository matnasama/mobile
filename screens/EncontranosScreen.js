import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const MAP_IFRAME = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>body,html{margin:0;padding:0;}</style>
    </head>
    <body>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2130.66747823695!2d-58.77651192490532!3d-34.65116368437184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc95074690c103%3A0x5a7e61aa595bb618!2sUniversidad%20Nacional%20de%20Moreno!5e1!3m2!1ses!2sar!4v1750264662337!5m2!1ses!2sar" width="100%" height="100%" style="border:0; min-height:350px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </body>
  </html>
`;

export default function EncontranosScreen({ navigation }) {
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <View style={{ height: 40 }} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}
        accessibilityLabel="Volver"
        accessibilityHint="Regresa a la pantalla anterior"
      >
        <Ionicons name="arrow-back" size={28} color="#1976d2" />
      </TouchableOpacity>
      <View style={{flex:1, minHeight:300, padding: 16, paddingTop: 16}}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: MAP_IFRAME }}
          style={{ flex: 1, minHeight: 350 }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      </View>
      <TouchableOpacity style={styles.cerrarBtn} onPress={() => navigation.goBack()}
        accessibilityLabel="Cerrar pantalla de ubicación"
        accessibilityHint="Cierra la pantalla y regresa a la anterior"
      >
        <Text style={styles.cerrarBtnText} allowFontScaling={true}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  cerrarBtn: {
    margin: 24,
    backgroundColor:'#384d9f',
    borderRadius:8,
    padding:14,
    alignItems:'center',
  },
  cerrarBtnText: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 24,
    zIndex: 100,
    padding: 8,
  },
});
