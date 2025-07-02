import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet, View, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const DEPARTAMENTOS_INFO = [
  {
    carpeta: 'DCAYT',
    nombre: 'DEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA',
    color: '#3399cc',
  },
  {
    carpeta: 'DCEYJ',
    nombre: 'DEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS',
    color: '#006400',
  },
  {
    carpeta: 'DHYCS',
    nombre: 'DEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES',
    color: '#ff0000',
  },
];

export default function PlanesEstudioScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depto, setDepto] = useState(null);
  const [carrera, setCarrera] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/plan_estudios_enlaces.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar la información.');
        setLoading(false);
      });
  }, []);

  // Manejo de back nativo para volver un paso atrás en el flujo local
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (carrera) {
          setCarrera(null);
          return true;
        } else if (depto) {
          setDepto(null);
          return true;
        }
        return false;
      };
      const subscription = navigation.addListener('beforeRemove', (e) => {
        if (onBackPress()) {
          e.preventDefault();
        }
      });
      return () => subscription();
    }, [carrera, depto, navigation])
  );

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;
  if (!data) return null;

  // Selección de departamento
  if (!depto) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Elegí un departamento</Text>
        {DEPARTAMENTOS_INFO.map(dep => (
          <TouchableOpacity
            key={dep.carpeta}
            style={[styles.button, styles.buttonDepto, { backgroundColor: dep.color }]}
            onPress={() => setDepto(dep)}
            activeOpacity={0.85}
            accessible={true}
            accessibilityLabel={`Seleccionar departamento ${dep.nombre}`}
            accessibilityHint={`Muestra las carreras y planes de estudio disponibles en el departamento ${dep.nombre}`}
          >
            <Text style={styles.buttonText} allowFontScaling={true}>{dep.nombre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // Selección de carrera como acordeón
  if (depto) {
    const carrerasDepto = Object.keys(data)
      .filter(key => data[key].departamento === depto.carpeta)
      .map(key => data[key].carrera);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
        <Text style={styles.title}>{depto.nombre}</Text>
        {carrerasDepto.map((nombreCarrera, idx) => {
          const keyCarrera = Object.keys(data).find(key => data[key].carrera === nombreCarrera && data[key].departamento === depto.carpeta);
          const planUrl = keyCarrera && data[keyCarrera]?.plan_de_estudios;
          const urlValida = typeof planUrl === 'string' && planUrl.trim() !== '';
          return (
            <View key={nombreCarrera + idx}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCarrera, { backgroundColor: depto.color }]}
                onPress={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                activeOpacity={0.85}
                accessible={true}
                accessibilityLabel={`Seleccionar carrera ${nombreCarrera}`}
                accessibilityHint={`Expande para ver y descargar el plan de estudios de la carrera ${nombreCarrera}`}
              >
                <Text style={styles.buttonText} allowFontScaling={true}>{nombreCarrera}</Text>
              </TouchableOpacity>
              {expandedIdx === idx && urlValida && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Plan de estudios</Text>
                  <TouchableOpacity 
                    style={styles.downloadBtn} 
                    onPress={() => {
                      const urlCompleta = planUrl.startsWith('http') ? planUrl : `https://www.unm.edu.ar${planUrl}`;
                      navigation.navigate('WebViewScreen', { url: urlCompleta, tipo: 'plan', carrera: nombreCarrera });
                    }}
                    accessible={true}
                    accessibilityLabel={`Descargar plan de estudios de la carrera ${nombreCarrera}`}
                    accessibilityHint={`Abre el PDF del plan de estudios de la carrera ${nombreCarrera} en una nueva pantalla dentro de la app. Puede volver atrás para seguir viendo las carreras.`}
                  >
                    <Text style={styles.downloadBtnText} allowFontScaling={true}>Descargar PDF</Text>
                  </TouchableOpacity>
                </View>
              )}
              {expandedIdx === idx && !urlValida && (
                <Text style={{marginTop: 30, color: '#888'}}>No hay plan de estudios para esta carrera.</Text>
              )}
              {/* Línea de separación */}
              <View style={styles.separator} />
            </View>
          );
        })}
        {carrerasDepto.length === 0 && <Text style={{marginTop: 30, color: '#888'}}>No hay carreras para este departamento.</Text>}
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1976d2',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 0,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
    maxWidth: 400,
    minHeight: 56,
    justifyContent: 'center',
    display: 'flex',
    marginHorizontal: 'auto',
  },
  buttonDepto: {
    height: 126,
  },
  buttonCarrera: {
    height: 56,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  card: {
    width: '90%',
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8
  },
  downloadBtn: {
    marginTop: 10,
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  downloadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 6,
  },
});
