import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ReglamentosScreen() {
  const pdfUrl = 'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/1be6073a18b4e6cd3b34c9ddb25336247182dd5d/public/ReglamentoAlumnos.pdf';
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: viewerUrl }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />}
        accessible={true}
        accessibilityLabel="Reglamento de alumnos en PDF"
        accessibilityHint="Visualiza el reglamento de alumnos en formato PDF. Usa gestos de desplazamiento para navegar."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
