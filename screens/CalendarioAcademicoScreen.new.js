import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const TIPO_LABELS = {
  tramite: 'Trámites',
  examen: 'Exámenes finales',
  cursada: 'Inscripción a asignaturas',
};

export default function CalendarioAcademicoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [cuatrimestre, setCuatrimestre] = useState(null);
  const [turno, setTurno] = useState(null);

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

  // Si no se seleccionó tipo, mostrar los botones de tipo
  if (!tipo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calendario Académico</Text>
        {tiposDisponibles.map((t, idx) => (
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
          <Text style={styles.title}>Exámenes finales</Text>
          {turnos.map((t, idx) => (
            <TouchableOpacity
              key={t}
              style={styles.mainBtn}
              onPress={() => setTurno(t)}
            >
              <Text style={styles.mainBtnText}>{t}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.backBtn} onPress={() => setTipo(null)}>
            <Text style={styles.backBtnText}>Volver</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // Mostrar actividades del turno seleccionado
    const actividades = data.filter(item => item.tipo === 'examen' && item.turno === turno);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Turno: {turno}</Text>
        {actividades.length === 0 && <Text style={{color:'#888', marginTop: 20}}>No hay actividades para este turno.</Text>}
        {actividades.map((item, idx) => (
          <View key={idx} style={styles.accordionItem}>
            <Text style={styles.accordionTitle}>{item.actividad}</Text>
            <View style={styles.accordionContent}>
              <Text style={styles.accordionText}>{item.periodo || 'Sin fecha'}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.backBtn} onPress={() => setTurno(null)}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Si es tramite o cursada, mostrar botones de cuatrimestre
  if (!cuatrimestre) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{TIPO_LABELS[tipo] || tipo}</Text>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setCuatrimestre('1')}>
          <Text style={styles.mainBtnText}>Primer cuatrimestre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setCuatrimestre('2')}>
          <Text style={styles.mainBtnText}>Segundo cuatrimestre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => setTipo(null)}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar actividades del cuatrimestre seleccionado
  const actividades = data.filter(item => item.tipo === tipo && String(item.cuatrimestre) === cuatrimestre);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{TIPO_LABELS[tipo] || tipo} - {cuatrimestre === '1' ? 'Primer cuatrimestre' : 'Segundo cuatrimestre'}</Text>
      {actividades.length === 0 && <Text style={{color:'#888', marginTop: 20}}>No hay actividades para este cuatrimestre.</Text>}
      {actividades.map((item, idx) => (
        <View key={idx} style={styles.accordionItem}>
          <Text style={styles.accordionTitle}>{item.actividad}</Text>
          <View style={styles.accordionContent}>
            <Text style={styles.accordionText}>{item.periodo || 'Sin fecha'}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.backBtn} onPress={() => setCuatrimestre(null)}>
        <Text style={styles.backBtnText}>Volver</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 18,
    backgroundColor: '#e3eaff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  backBtnText: {
    color: '#384d9f',
    fontWeight: 'bold',
    fontSize: 16,
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
