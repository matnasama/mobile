import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { Ionicons } from '@expo/vector-icons';

const DEPARTAMENTOS_INFO = [
  { carpeta: 'DCAYT', nombre: 'DEPARTAMENTO DE CIENCIAS APLICADAS Y TECNOLOGIA', color: '#3399cc' },
  { carpeta: 'DCEYJ', nombre: 'DEPARTAMENTO DE CIENCIAS ECONOMICAS Y JURIDICAS', color: '#006400' },
  { carpeta: 'DHYCS', nombre: 'DEPARTAMENTO DE HUMANIDADES Y CIENCIAS SOCIALES', color: '#ff0000' },
];

export default function EmailScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [consulta, setConsulta] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [showCarreras, setShowCarreras] = useState(false);
  const [asuntoTipo, setAsuntoTipo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [asuntos, setAsuntos] = useState([]);

  useEffect(() => {
    const DATA_URLS = [
      'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCAYT.json',
      'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCEYJ.json',
      'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DHYCS.json',
    ];
    const DEPARTAMENTOS = ['DCAYT', 'DCEYJ', 'DHYCS'];
    Promise.all(DATA_URLS.map(url => fetch(url).then(res => res.json())))
      .then(dataArr => {
        const arr = dataArr.flatMap((arr, idx) =>
          (arr || []).map(carreraObj => ({
            nombre: carreraObj.carrera === 'CICLO COMUN' ? 'Ciclo Común' : carreraObj.carrera,
            color: DEPARTAMENTOS_INFO.find(dep => dep.carpeta === DEPARTAMENTOS[idx])?.color || '#1976d2',
            depto: DEPARTAMENTOS[idx],
          }))
        );
        let unicas = arr.filter(c =>
          c.nombre !== 'Ciclo Común' &&
          c.nombre !== 'ACT COMPLEMENTARIAS' &&
          c.depto !== 'POS'
        );
        if (!unicas.some(c => c.nombre.toLowerCase().includes('abogacía'))) {
          unicas.push({ nombre: 'Abogacía', color: '#006400', depto: 'DCEYJ' });
        }
        setCarreras(unicas);
      });
    fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/main/public/json/info/data.json')
      .then(res => res.json())
      .then(json => {
        const tramites = Array.isArray(json.tramites) ? [...json.tramites, { id: 'otro_tramite', nombre: 'Otro' }] : [{ id: 'otro_tramite', nombre: 'Otro' }];
        const consultas = Array.isArray(json.consultas) ? [...json.consultas, { id: 'otro_consulta', nombre: 'Otro' }] : [{ id: 'otro_consulta', nombre: 'Otro' }];
        setAsuntos({ tramites, consultas });
      });
  }, []);

const handleSend = async () => {
  if (!dni || !nombre || !carrera || !consulta || !asunto) {
    Alert.alert('Faltan datos', 'Por favor completá todos los campos.');
    return;
  }
  const body = `Número de documento: ${dni}\nNombre y apellido: ${nombre}\nCarrera: ${carrera}\nAsunto: ${asunto}\nConsulta: ${consulta}`;
  const options = {
    recipients: ['alumnos@unm.edu.ar'],
    subject: asunto,
    body,
  };
  if (Platform.OS === 'web') {
    window.open(`mailto:alumnos@unm.edu.ar?subject=Consulta%20desde%20app%20UNM&body=${encodeURIComponent(body)}`);
  } else {
    const result = await MailComposer.composeAsync(options);
    if (result.status === 'sent') {
      Alert.alert('¡Enviado!', 'Tu consulta fue enviada correctamente.');
      setDni(''); setNombre(''); setCarrera(''); setConsulta(''); setAsunto('');
    } else if (result.status === 'cancelled') {
      Alert.alert('Cancelado', 'El envío del correo fue cancelado.');
    }
    // No alert para 'saved' ni 'undetermined'
  }
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <View style={{ height: 40 }} />
      <Text style={styles.title}>¿No encontrás respuesta a tu duda?</Text>
      <Text style={styles.text}>Completá el siguiente formulario y tu consulta será enviada por mail a <Text style={styles.email}>alumnos@unm.edu.ar</Text>.</Text>
      <TextInput
        style={[styles.input, {backgroundColor: '#fff', color: '#222', borderColor: '#384d9f', borderWidth: 1}]}
        placeholder="Número de documento"
        placeholderTextColor="#888"
        value={dni}
        onChangeText={text => setDni(text.replace(/\./g, ''))}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, {backgroundColor: '#fff', color: '#222', borderColor: '#384d9f', borderWidth: 1}]}
        placeholder="Nombre y apellido"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity style={[styles.input, {flexDirection:'row', alignItems:'center', backgroundColor:'#f5f5f5'}]} onPress={() => setShowCarreras(!showCarreras)}
        accessibilityLabel="Seleccionar carrera"
        accessibilityHint="Despliega la lista de carreras para seleccionar una"
      >
        <Text style={{color: carrera ? '#222' : '#888', flex:1}} allowFontScaling={true}>{carrera || 'Seleccioná tu carrera'}</Text>
        <Text style={{fontSize:18, color:'#1976d2'}} allowFontScaling={true}>{showCarreras ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showCarreras && (
        <View style={styles.carrerasBox}>
          {carreras.map((c, idx) => (
            <TouchableOpacity key={c.nombre+idx} style={[styles.carreraBtn, {backgroundColor: c.color}]} onPress={() => {setCarrera(c.nombre); setShowCarreras(false);}}
              accessibilityLabel={`Seleccionar carrera ${c.nombre}`}
              accessibilityHint={`Selecciona la carrera ${c.nombre} para tu consulta`}
            >
              <Text style={styles.carreraBtnText} allowFontScaling={true}>{c.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={styles.text}>Asunto</Text>
      <View style={{flexDirection:'row', marginBottom: 8}}>
        <TouchableOpacity style={[styles.asuntoTipoBtn, asuntoTipo==='tramites' && styles.asuntoTipoBtnActive]} onPress={()=>{setAsuntoTipo('tramites'); setAsunto('');}}
          accessibilityLabel="Seleccionar tipo de asunto: Trámite"
          accessibilityHint="Muestra los asuntos relacionados a trámites"
        >
          <Text style={[styles.asuntoTipoBtnText, asuntoTipo==='tramites' && styles.asuntoTipoBtnTextActive]} allowFontScaling={true}>Trámite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.asuntoTipoBtn, asuntoTipo==='consultas' && styles.asuntoTipoBtnActive]} onPress={()=>{setAsuntoTipo('consultas'); setAsunto('');}}
          accessibilityLabel="Seleccionar tipo de asunto: Consulta"
          accessibilityHint="Muestra los asuntos relacionados a consultas"
        >
          <Text style={[styles.asuntoTipoBtnText, asuntoTipo==='consultas' && styles.asuntoTipoBtnTextActive]} allowFontScaling={true}>Consulta</Text>
        </TouchableOpacity>
      </View>
      {asuntoTipo && (
        <View style={styles.carrerasBox}>
          {(asuntos[asuntoTipo]||[]).map((a, idx) => (
            <TouchableOpacity key={a.id+idx} style={[styles.carreraBtn, asunto===a.nombre && {borderWidth:2, borderColor:'#1976d2', backgroundColor:'#e3eaff'}]} onPress={()=>setAsunto(a.nombre)}
              accessibilityLabel={`Seleccionar asunto: ${a.nombre}`}
              accessibilityHint={`Selecciona el asunto ${a.nombre} para tu consulta`}
            >
              <Text style={[styles.carreraBtnText, asunto===a.nombre ? {color:'#1976d2'} : {color:'#888'}]} allowFontScaling={true}>{a.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        style={[styles.input, {height: 100, textAlignVertical: 'top', backgroundColor: '#fff', color: '#222', borderColor: '#384d9f', borderWidth: 1}]}
        placeholder="Detalle tu consulta"
        placeholderTextColor="#888"
        value={consulta}
        onChangeText={setConsulta}
        multiline
      />
      <TouchableOpacity style={styles.sendBtn} onPress={handleSend}
        accessibilityLabel="Enviar consulta"
        accessibilityHint="Envía el formulario de consulta por correo electrónico"
      >
        <Text style={styles.sendBtnText} allowFontScaling={true}>Enviar consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'stretch',
    paddingTop: 60, // Desplaza el contenido 20px más abajo para separarlo de la flecha
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976d2',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
    textAlign: 'left',
  },
  email: {
    color: '#1976d2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginTop: 14,
    marginBottom: 0,
  },
  carrerasBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    zIndex: 10,
  },
  carreraBtn: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 2,
    marginHorizontal: 6,
  },
  carreraBtnText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  sendBtn: {
    marginTop: 24,
    backgroundColor: '#384d9f',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  asuntoTipoBtn: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  asuntoTipoBtnActive: {
    backgroundColor: '#1976d2',
  },
  asuntoTipoBtnText: {
    color: '#1976d2',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 24,
    zIndex: 100,
    padding: 8,
  },
});
