import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Image, StatusBar,
} from 'react-native';
import { COLORS } from '../../data/menuData';

const INGREDIENTS = [
  'Tepung Beras Organik',
  'Daun Pandan Segar',
  'Santan Kelapa Murni',
  'Gula Jawa Asli',
  'Es Kristal Higienis',
  'Ketan Hitam Pulen',
  'Durian Lokal Bali',
  'Nangka Matang Harum',
];

const TEAM = [
  { name: 'Sintya Dewi', role: 'Pendiri & Pembuat Utama', avatar: '👩‍🍳' },
  { name: 'Ni Kadek Suniari', role: 'Manajer Operasional', avatar: '👩‍💼' },
  { name: 'Ayu Novi', role: 'Digital Marketing', avatar: '👩‍💻' },
  { name: 'Gus Ryan', role: 'Kurir & Logistik', avatar: '🛵' },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.heroCard}>
        <Text style={styles.heroBadge}>🌿 Cerita Kami</Text>
        <Text style={styles.heroTitle}>Jungut Fresh Cendol</Text>
        <Text style={styles.heroSub}>Resep Warisan Nusantara Sejak 1987</Text>
        <Text style={styles.heroDesc}>
          Berawal dari kecintaan terhadap minuman tradisional khas nusantara, Jungut Fresh Cendol hadir di Kesiman, Denpasar dengan komitmen menghadirkan cendol terenak dan paling segar tanpa bahan pengawet maupun pemanis buatan.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Komitmen Mutu & Kualitas</Text>
        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>🌱</Text>
          <View style={styles.featureTextCol}>
            <Text style={styles.featureTitle}>100% Bahan Alami</Text>
            <Text style={styles.featureDesc}>Warna hijau asli dari perasan daun pandan dan suji segar pilihan.</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>🥥</Text>
          <View style={styles.featureTextCol}>
            <Text style={styles.featureTitle}>Santan Kelapa Murni</Text>
            <Text style={styles.featureDesc}>Kelapa segar diparut dan diperas setiap pagi hari untuk rasa gurih alami.</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>🍯</Text>
          <View style={styles.featureTextCol}>
            <Text style={styles.featureTitle}>Gula Jawa Asli</Text>
            <Text style={styles.featureDesc}>Karamel gula aren murni tanpa pemanis buatan yang manisnya pas di lidah.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Bahan Pilihan Kami</Text>
        <View style={styles.chipsContainer}>
          {INGREDIENTS.map((ing, i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>✓ {ing}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Tim di Balik Layar</Text>
        <View style={styles.teamGrid}>
          {TEAM.map((member, i) => (
            <View key={i} style={styles.teamCard}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamEmoji}>{member.avatar}</Text>
              </View>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footerInfo}>
        <Text style={styles.footerText}>© 2026 Jungut Fresh Cendol Bali</Text>
        <Text style={styles.footerSub}>Kesiman, Denpasar Timur, Bali 80235</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 16, paddingBottom: 30 },
  heroCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  heroSub: { fontSize: 14, color: '#A7F3D0', fontWeight: '600', marginBottom: 12 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 21 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 14 },
  featureRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  featureIcon: { fontSize: 24 },
  featureTextCol: { flex: 1 },
  featureTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  featureDesc: { fontSize: 12, color: COLORS.gray, marginTop: 2, lineHeight: 18 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  chipText: { fontSize: 12, color: COLORS.primaryDark, fontWeight: '600' },
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  teamCard: {
    width: '48%',
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  teamAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  teamEmoji: { fontSize: 22 },
  teamName: { fontSize: 13, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  teamRole: { fontSize: 11, color: COLORS.gray, textAlign: 'center', marginTop: 2 },
  footerInfo: { alignItems: 'center', marginTop: 10, marginBottom: 16 },
  footerText: { fontSize: 12, color: COLORS.gray, fontWeight: '600' },
  footerSub: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
});

