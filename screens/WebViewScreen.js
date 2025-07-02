import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ route }) {
  const { url, tipo, carrera, materia } = route.params;
  let mensaje = null;
  if (tipo === 'plan') {
    mensaje = (
      <Text style={[styles.centeredMessage, { fontWeight: 'normal' }]}>
        El plan de estudios de <Text style={{ fontWeight: '800', fontSize: 19 }}>{carrera}</Text> se está descargando, puede volver al menú anterior.
      </Text>
    );
  } else if (tipo === 'programa') {
    mensaje = (
      <Text style={[styles.centeredMessage, { fontWeight: 'normal' }]}>
        El programa de <Text style={{ fontWeight: '800', fontSize: 19 }}>{materia}</Text> se está descargando, puede volver al menú anterior.
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      {/* Mensaje solo si corresponde */}
      {mensaje && (
        <View style={styles.centeredMessageContainer}>
          {mensaje}
        </View>
      )}
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />}
        accessibilityLabel="Contenido web"
        accessibilityHint="Visualiza el contenido web externo en la aplicación"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
    marginHorizontal: 16,
  },
  centeredMessage: {
    fontSize: 17,
    color: '#384d9f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
