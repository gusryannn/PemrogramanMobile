import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>Ryan / gusryannn</Text>
        <Text style={styles.role}>Mahasiswa Pemrograman Mobile</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informasi Tugas</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Mata Kuliah</Text>
          <Text style={styles.value}>Pemrograman Mobile</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Modul</Text>
          <Text style={styles.value}>Modul IV - Screen Navigation</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Navigasi</Text>
          <Text style={styles.value}>Bottom Tab Navigator</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Framework</Text>
          <Text style={styles.value}>React Native & Expo</Text>
        </View>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});

