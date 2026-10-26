import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.badge}>MODUL IV</Text>
        <Text style={styles.title}>Tab Navigation</Text>
        <Text style={styles.subtitle}>Pemrograman Mobile</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Halaman Utama (Home)</Text>
        <Text style={styles.cardText}>
          Aplikasi ini mendemonstrasikan implementasi Tab Navigation menggunakan package React Navigation sesuai penugasan praktikum.
        </Text>
      </View>

      <View style={styles.actionCard}>
        <Text style={styles.sectionHeader}>Navigasi Cepat</Text>
        
        <TouchableOpacity
          style={[styles.btn, styles.btnExplore]}
          onPress={() => navigation.navigate('Explore')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Buka Tab Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnAbout]}
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Buka Tab About</Text>
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
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  badge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  btn: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnExplore: {
    backgroundColor: '#0284C7',
  },
  btnAbout: {
    backgroundColor: '#4B5563',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

