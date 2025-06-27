import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';

const redes = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/unimoreno',
    icon: <FontAwesome name="facebook" size={32} color="#fff" />,
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/unm_oficial/',
    icon: <AntDesign name="instagram" size={32} color="#fff" />,
  },
  {
    name: 'twitter',
    url: 'https://x.com/unimoreno',
    icon: <Feather name="twitter" size={32} color="#fff" />,
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/user/CiudadUNM',
    icon: <FontAwesome name="youtube-play" size={32} color="#fff" />,
  },
];

export default function RedesScreen() {
  return (
    <View style={styles.container}>
      {redes.map((r, idx) => (
        <TouchableOpacity
          key={r.name}
          style={styles.circle}
          onPress={() => Linking.openURL(r.url)}
          activeOpacity={0.8}
        >
          {r.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0a2447',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
});
