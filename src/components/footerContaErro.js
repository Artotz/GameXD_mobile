import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function FooterErroConta() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Essa conta não existe ou o Email e senha estão incorretos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#D32F2F', // cor verde
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // para sombra no Android
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});