import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function FloatingFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Um email de redefinição foi enviado para esse email.</Text>
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
    backgroundColor: '#4CAF50', // cor verde
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