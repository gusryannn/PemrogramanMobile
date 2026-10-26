import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Explore() {
  const [counter, setCounter] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Explore Features</Text>
        <Text style={styles.desc}>
          Halaman eksplorasi interaksi pada layar tab navigasi.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Interaksi State</Text>
        <Text style={styles.counterValue}>{counter}</Text>
        
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnMinus]}
            onPress={() => setCounter((prev) => Math.max(0, prev - 1))}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>- Kurang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnPlus]}
            onPress={() => setCounter((prev) => prev + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>+ Tambah</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => setCounter(0)}
          activeOpacity={0.7}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0284C7',
    textAlign: 'center',
    marginVertical: 12,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnMinus: {
    backgroundColor: '#DC2626',
  },
  btnPlus: {
    backgroundColor: '#059669',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  resetBtn: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  resetText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
});

