import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

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

export default function TramiteDetalleScreen({ route }) {
  const { tramite } = route.params;
  // Título
  const nombre = tramite.nombre || tramite.titulo || 'Detalle del trámite';
  // Descripción
  const descripcion = tramite.descripcion || '';
  // Otros posibles campos útiles
  const url = tramite.url;
  const type = tramite.type;
  const sub = tramite.sub;
  const requisitos = tramite.requisitos;
  const urlrequisitos = tramite.urlrequisitos;

  const [periodos, setPeriodos] = useState([]);
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    if ((tramite.nombre || '').toUpperCase().includes('CAMBIO O SIMULTANEIDAD DE')) {
      fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/calendarioGrado.json')
        .then(res => res.json())
        .then(json => {
          const filtrados = (json || []).filter(item =>
            item.actividad &&
            item.actividad.toLowerCase().includes('cambio/simultaneidad de carrera') &&
            item.actividad.includes('2025')
          );
          setPeriodos(filtrados);
        });
    }
    if ((tramite.nombre || '').toUpperCase().includes('EQUIVALENCIAS')) {
      fetch('https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/info/contactos.json')
        .then(res => res.json())
        .then(json => {
          const dptos = [
            'Departamento de Ciencias Aplicadas y Tecnología',
            'Departamento de Ciencias Económicas y Jurídicas',
            'Departamento de Humanidades y Ciencias Sociales',
          ];
          setContactos(
            json.filter(c => dptos.includes(c.nombre))
          );
        });
    }
  }, [tramite]);

  function normalizarNombre(nombre) {
    return nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quitar tildes
      .toUpperCase();
  }

  const isModDatos = tramite.id === 6 || (tramite.nombre && tramite.nombre.toUpperCase().includes('MODIFICACIÓN DE DATOS PERSONALES'));

  function renderDescripcionModDatos() {
    // Separar la descripción en partes para insertar los botones en el lugar correcto
    const partes = descripcion.split(/(Por errores a la hora de realizar el primer registro en la UNM o por cambios en su Documento Nacional de Identidad \(DNI\)\.|Por motivos de género sin cambio registral \(Ley de Identidad de Género N° 26\.743\)\.|Por motivos de género con cambio registral \(Ley de Identidad de Género N° 26\.743\)\.)/g);
    // partes: [intro, match1, texto1, match2, texto2, match3, texto3]
    return (
      <View>
        {partes.map((parte, idx) => {
          if (parte && parte.startsWith('Por errores a la hora')) {
            return (
              <View key={idx}>
                <Text style={styles.value}>{parte}</Text>
                <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(tramite['url-datos'])}>
                  <Text style={styles.linkText}>DESCARGAR NOTA</Text>
                </TouchableOpacity>
              </View>
            );
          }
          if (parte && parte.startsWith('Por motivos de género sin cambio registral')) {
            return (
              <View key={idx}>
                <Text style={styles.value}>{parte}</Text>
                <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(tramite['url-datos-genero'])}>
                  <Text style={styles.linkText}>DESCARGAR NOTA</Text>
                </TouchableOpacity>
              </View>
            );
          }
          if (parte && parte.startsWith('Por motivos de género con cambio registral')) {
            return (
              <View key={idx}>
                <Text style={styles.value}>{parte}</Text>
                <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(tramite['url-datos-sin-registral'])}>
                  <Text style={styles.linkText}>DESCARGAR NOTA</Text>
                </TouchableOpacity>
              </View>
            );
          }
          // Texto normal
          return parte ? <Text key={idx} style={styles.value}>{parte}</Text> : null;
        })}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{nombre}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
      {isModDatos
        ? renderDescripcionModDatos()
        : (descripcion ? <Text style={styles.value}>{descripcion}</Text> : null)
      }
      {periodos.length > 0 && (
        <View style={styles.periodosBox}>
          <Text style={styles.periodosTitle}>Períodos 2025</Text>
          {periodos.map((p, idx) => (
            <View key={idx} style={styles.periodoItem}>
              <Text style={styles.periodoActividad}>{p.actividad}</Text>
              <Text style={styles.periodoFecha}>{p.periodo}</Text>
            </View>
          ))}
        </View>
      )}
      {requisitos && urlrequisitos ? (
        <TouchableOpacity onPress={() => Linking.openURL(urlrequisitos)} style={styles.linkBtn}>
          <Text style={styles.linkText}>{(requisitos || '').toUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
      {url && type ? (
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.linkBtn}>
          <Text style={styles.linkText}>{type === 'descargar' ? 'DESCARGAR' : type === 'ir al formulario' ? 'IR AL FORMULARIO' : 'VER ENLACE'}</Text>
        </TouchableOpacity>
      ) : null}
      {/* Contactos de departamentos para equivalencias */}
      {contactos.length > 0 && (
        <View style={styles.contactosBox}>
          {contactos.map((c, idx) => {
            const dep = DEPARTAMENTOS_INFO.find(dep => normalizarNombre(dep.nombre) === normalizarNombre(c.nombre));
            return (
              <View key={idx} style={styles.contactoItem}>
                <Text style={[styles.contactoNombre, {color: dep ? dep.color : '#1976d2', fontWeight: '500'}]}>{c.nombre.toUpperCase()}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${c.contacto}`)}>
                  <Text style={styles.contactoMail}>{c.contacto}</Text>
                </TouchableOpacity>
              </View>
            );
                })}
        </View>
      )}
      {tramite.error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Información importante</Text>
          <Text style={styles.errorText}>{tramite.error.trim()}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 18,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    color: '#1976d2',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
    textAlign: 'left',
  },
  linkBtn: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  periodosBox: {
    marginTop: 24,
    marginBottom: 18,
    backgroundColor: '#e3eaff',
    borderRadius: 10,
    padding: 16,
  },
  periodosTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
    textAlign: 'center',
  },
  periodoItem: {
    marginBottom: 10,
  },
  periodoActividad: {
    fontSize: 15,
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  periodoFecha: {
    fontSize: 15,
    color: '#222',
    marginLeft: 8,
    marginBottom: 2,
  },
  contactosBox: {
    marginTop: 28,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
  },
  contactosTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactoItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  contactoNombre: {
    fontSize: 15,
    color: '#1976d2',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  contactoMail: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  errorBox: {
    backgroundColor: '#ffeaea',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffb3b3',
  },
  errorTitle: {
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  errorText: {
    color: '#b71c1c',
    fontSize: 15,
    textAlign: 'left',
  },
});
