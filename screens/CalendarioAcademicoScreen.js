import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TIPO_LABELS = {
  tramite: 'Trámites',
  examen: 'Exámenes finales',
  cursada: 'Inscripción a asignaturas',
};

export default function CalendarioAcademicoScreen({ navigation }) {
  useEffect(() => {
    return () => {
    };
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [cuatrimestre, setCuatrimestre] = useState(null);
  const [turno, setTurno] = useState(null);

  // Manejo del botón físico de volver SOLO con BackHandler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (turno) {
          setTurno(null);
          return true;
        } else if (cuatrimestre) {
          setCuatrimestre(null);
          return true;
        } else if (tipo) {
          setTipo(null);
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [tipo, cuatrimestre, turno])
  );

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/calendarioGrado.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el calendario.');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1976d2" style={{marginTop: 40}} />;
  if (error) return <Text style={{color:'red', margin: 20}}>{error}</Text>;

  // Obtener los tipos únicos presentes en el JSON
  const tiposDisponibles = Array.from(new Set(data.map(item => item.tipo)));

  // Header con flecha de volver SIEMPRE visible
  const showBack = true;
  const handleBack = () => {
    if (turno) setTurno(null);
    else if (cuatrimestre) setCuatrimestre(null);
    else if (tipo) setTipo(null);
    else navigation.goBack();
  };

  // Header visual mejorado
  const renderHeader = (title) => null;

  // Si no se seleccionó tipo, mostrar los botones de tipo
  if (!tipo) {
    return (
      <View style={styles.container}>
        {/* {renderHeader('Calendario Académico')} */}
        {tiposDisponibles.map((t) => (
          <TouchableOpacity
            key={t}
            style={styles.mainBtn}
            onPress={() => setTipo(t)}
          >
            <Text style={styles.mainBtnText}>{TIPO_LABELS[t] || t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // Si es examen, mostrar los turnos únicos
  if (tipo === 'examen') {
    const turnos = Array.from(new Set(data.filter(item => item.tipo === 'examen').map(item => item.turno))).filter(Boolean);
    if (!turno) {
      return (
        <View style={styles.container}>
          {renderHeader('Exámenes finales')}
          {turnos.map((t) => (
            <TouchableOpacity
              key={t}
              style={styles.mainBtn}
              onPress={() => setTurno(t)}
            >
              <Text style={styles.mainBtnText}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    // Mostrar actividades del turno seleccionado
    const actividades = data.filter(item => item.tipo === 'examen' && item.turno === turno);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
        {renderHeader(`Turno: ${turno}`)}
        {actividades.length === 0 && <Text style={{color:'#888', marginTop: 20}}>No hay actividades para este turno.</Text>}
        {actividades.map((item, idx) => (
          <View key={idx} style={styles.accordionItem}>
            <Text style={styles.accordionTitle}>{item.actividad}</Text>
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>{item.periodo || 'Sin fecha'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  // Si es tramite o cursada, mostrar botones de cuatrimestre
  if (!cuatrimestre) {
    return (
      <View style={styles.container}>
        {renderHeader(`${TIPO_LABELS[tipo] || tipo}`)}
        <TouchableOpacity style={styles.mainBtn} onPress={() => setCuatrimestre('1')}>
          <Text style={styles.mainBtnText}>Primer cuatrimestre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setCuatrimestre('2')}>
          <Text style={styles.mainBtnText}>Segundo cuatrimestre</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar actividades del cuatrimestre seleccionado
  const actividades = data.filter(item => item.tipo === tipo && String(item.cuatrimestre) === cuatrimestre);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      {renderHeader(`${TIPO_LABELS[tipo] || tipo} - ${cuatrimestre === '1' ? 'Primer cuatrimestre' : 'Segundo cuatrimestre'}`)}
      {actividades.length === 0 && <Text style={{color:'#888', marginTop: 20}}>No hay actividades para este cuatrimestre.</Text>}
      {actividades.map((item, idx) => (
        <View key={idx} style={styles.accordionItem}>
          <Text style={styles.accordionTitle}>{item.actividad}</Text>
          <View style={styles.accordionContent}>
            <Text style={styles.accordionText}>{item.periodo || 'Sin fecha'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1976d2',
    textAlign: 'center',
  },
  mainBtn: {
    backgroundColor: '#384d9f',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  mainBtnText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  backIcon: {
    marginRight: 8,
    padding: 8,
  },
  accordionItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  accordionTitle: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 12,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionText: {
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
  },
});
