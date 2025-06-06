import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

const DATA_URLS = [
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCAYT.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DCEYJ.json',
  'https://raw.githubusercontent.com/matnasama/buscador-de-aulas/refs/heads/main/public/json/Global/DHYCS.json',
];
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

export default function BuscaAulaScreen() {
  const [query, setQuery] = useState('');
  const [aulasPorDepto, setAulasPorDepto] = useState([[], [], []]);
  const [resultadosPorDepto, setResultadosPorDepto] = useState([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opcion, setOpcion] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  // PAGINACIÓN
  const PAGE_SIZE = 30;
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    Promise.all(DATA_URLS.map(url => fetch(url).then(res => res.json())))
      .then(dataArr => {
        setAulasPorDepto(dataArr);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los datos de aulas');
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params && route.params.reset) {
        setOpcion(null);
        setQuery('');
        setPage(1);
        // Limpiar el parámetro para evitar quedarse en modo reset
        navigation.setParams({ reset: undefined });
      }
    }, [route.params])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Si está seleccionando departamento (opcion === 'carrera' && !departamentoSeleccionado)
        if (opcion === 'carrera' && !departamentoSeleccionado) {
          setOpcion(null);
          return true;
        }
        // Si está en buscar por código
        if (opcion === 'codigo') {
          setOpcion(null);
          return true;
        }
        // Si está en carreras de un departamento, volver a departamentos
        if (opcion === 'carrera' && departamentoSeleccionado) {
          setDepartamentoSeleccionado(null);
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [opcion, departamentoSeleccionado])
  );

  const buscarAula = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setResultadosPorDepto([[], [], []]);
      return;
    }
    const lower = text.toLowerCase();
    setResultadosPorDepto(
      aulasPorDepto.map(aulas =>
        aulas.filter(
          (a) =>
            (a.comision && a.comision.toLowerCase().includes(lower)) ||
            (a.asignatura && a.asignatura.toLowerCase().includes(lower)) ||
            (a.edificio && a.edificio.toLowerCase().includes(lower)) ||
            (a.piso && a.piso.toLowerCase().includes(lower)) ||
            (a.descripcion && a.descripcion.toLowerCase().includes(lower))
        )
      )
    );
  };

  // Unificar todas las asignaturas de todas las carreras, omitiendo solo las del cuatrimestre 2
  const asignaturasRaw = aulasPorDepto.flatMap(arr =>
    (arr || []).flatMap(carreraObj =>
      (carreraObj.asignaturas || [])
        .filter(asig => asig["Cuatrimestre"] != 2 && asig["Cuatrimestre"] != "2")
        .map(asig => ({
          carreraCodigo: carreraObj.codigo,
          carreraNombre: carreraObj.carrera,
          ...asig,
        }))
    )
  );

  // Filtrado por código de asignatura (acepta string o número, y convierte a string antes de buscar)
  const asignaturasFiltradas = query.trim() === ''
    ? asignaturasRaw
    : asignaturasRaw.filter(asig => {
        const codigo = asig["Código"];
        return (
          codigo &&
          String(codigo).toLowerCase().includes(query.trim().toLowerCase())
        );
      });

  // Paginación de asignaturas filtradas
  const totalPages = Math.max(1, Math.ceil(asignaturasFiltradas.length / PAGE_SIZE));
  const asignaturasPaginadas = asignaturasFiltradas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Resetear página si el filtro cambia y la página actual queda fuera de rango
  useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line
  }, [query, totalPages]);

  // Personalizar la flecha de volver del header
  useEffect(() => {
    // Si está seleccionando departamento
    if (opcion === 'carrera' && !departamentoSeleccionado) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => setOpcion(null)} style={{marginLeft: 16}}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M15 18l-6-6 6-6" />
            </Svg>
          </TouchableOpacity>
        )
      });
    } else if (opcion === 'carrera' && departamentoSeleccionado) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => setDepartamentoSeleccionado(null)} style={{marginLeft: 16}}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M15 18l-6-6 6-6" />
            </Svg>
          </TouchableOpacity>
        )
      });
    } else if (opcion === 'codigo') {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => setOpcion(null)} style={{marginLeft: 16}}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M15 18l-6-6 6-6" />
            </Svg>
          </TouchableOpacity>
        )
      });
    } else {
      navigation.setOptions({ headerLeft: undefined });
    }
  }, [opcion, departamentoSeleccionado, navigation]);

  // Menú de opciones: buscar por código o por carrera
  if (!opcion) {
    return (
      <View style={[styles.container, {backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.title}>¿Cómo querés buscar tu aula?</Text>
        <TouchableOpacity
          style={[styles.resultItem, {marginBottom: 20, backgroundColor: '#0a2447', width: 260}]}
          onPress={() => setOpcion('codigo')}
        >
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:18, textAlign:'center'}}>Buscar por código</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resultItem, {backgroundColor: '#0a2447', width: 260}]}
          onPress={() => setOpcion('carrera')}
        >
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:18, textAlign:'center'}}>Buscar por carrera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Si opción es 'codigo', mostrar búsqueda por código (sin cambios)
  if (opcion === 'codigo') {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom: 16}}>
          <TextInput
            style={[styles.input, {flex: 3, marginRight: 8, minWidth: 0}]}
            placeholder="Ingresá tu comisión..."
            value={query}
            onChangeText={setQuery}
            autoFocus={false}
          />
          <TouchableOpacity
            onPress={() => setQuery('')}
            style={{flex: 1, alignItems:'center', justifyContent:'center', height: 44, backgroundColor: '#f5f5f5', borderRadius: 8, minWidth: 44}}
            accessibilityLabel="Limpiar filtro"
            activeOpacity={0.7}
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M21 12a9 9 0 1 1-9-9" />
              <Path d="M21 3v6h-6" />
            </Svg>
          </TouchableOpacity>
        </View>
        <FlatList
          data={asignaturasPaginadas}
          keyExtractor={(item, idx) => `${item.carreraCodigo}-${item["Código"] || idx}-${item["Cuatrimestre"] || ""}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => navigation.navigate('ComisionesAsignatura', { asignatura: item })}
            >
              <Text style={{fontWeight:'bold', fontSize:16}}>{item["Asignatura-Actividad"]}</Text>
              <Text style={{color:'#888'}}>Código: {item["Código"]}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noResult}>No se encontraron asignaturas.</Text>}
          style={{ marginBottom: 20 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text
            style={{ color: page > 1 ? '#1976d2' : '#aaa', fontSize: 16, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, overflow: 'hidden' }}
            onPress={() => page > 1 && setPage(page - 1)}
          >
            {'< Anterior'}
          </Text>
          <Text style={{ fontSize: 15, color: '#888', fontWeight: 'bold' }}>
            Página {page} de {totalPages}
          </Text>
          <Text
            style={{ color: page < totalPages ? '#1976d2' : '#aaa', fontSize: 16, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, overflow: 'hidden' }}
            onPress={() => page < totalPages && setPage(page + 1)}
          >
            {'Siguiente >'}
          </Text>
        </View>
      </View>
    );
  }

  // Si opción es 'carrera' y no hay departamento seleccionado, mostrar los departamentos
  if (opcion === 'carrera' && !departamentoSeleccionado) {
    return (
      <View style={[styles.container, {backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.title}>Elegí un departamento</Text>
        {DEPARTAMENTOS_INFO.map(dep => (
          <TouchableOpacity
            key={dep.carpeta}
            style={[styles.resultItem, {
              backgroundColor: dep.color,
              borderWidth: 0,
              marginBottom: 20,
              width: 260
            }]}
            onPress={() => setDepartamentoSeleccionado(dep)}
          >
            <Text style={{color: '#fff', fontWeight:'bold', fontSize:16, textAlign:'center'}}>{dep.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // Si opción es 'carrera' y hay departamento seleccionado, mostrar carreras
  if (opcion === 'carrera' && departamentoSeleccionado) {
    const idxDepto = DEPARTAMENTOS_INFO.findIndex(dep => dep.carpeta === departamentoSeleccionado.carpeta);
    const carreras = (aulasPorDepto[idxDepto] || []).map(carreraObj => ({
      ...carreraObj,
      depto: departamentoSeleccionado.nombre,
      deptoColor: departamentoSeleccionado.color,
    }));
    if (carreras.length === 0) {
      return (
        <View style={[styles.container, {backgroundColor: '#fff'}]}> 
          <Text style={styles.title}>No se encontraron carreras para este departamento.</Text>
        </View>
      );
    }
    return (
      <View style={[styles.container, {backgroundColor: '#fff'}]}> 
        <Text style={styles.title}>{departamentoSeleccionado.nombre}</Text>
        <FlatList
          data={carreras}
          keyExtractor={item => `${item.codigo}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.resultItem, {
                backgroundColor: departamentoSeleccionado.color,
                borderWidth: 0
              }]}
              onPress={() => navigation.navigate('AsignaturasPorCarrera', { carrera: item })}
            >
              <Text style={{color: '#fff', fontWeight:'bold', fontSize:16, textAlign:'center'}}>{item.carrera}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  deptoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, marginTop: 8, color: '#1976d2' },
  input: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  resultItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  resultAula: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  noResult: { textAlign: 'center', color: '#888', marginTop: 10 },
});
