import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, StatusBar, FlatList,
} from 'react-native';
import { COLORS, MENU_DATA, REVIEWS } from '../../data/menuData';

const STATS = [
  { value: '5.000+', label: 'Pelanggan/Bulan', emoji: '😊' },
  { value: '4', label: 'Varian Menu', emoji: '🍵' },
  { value: '37', label: 'Tahun Berpengalaman', emoji: '⭐' },
  { value: '1', label: 'Outlet di Bali', emoji: '📍' },
];

const HOW_TO_ORDER = [
  { step: 1, title: 'Pilih Menu', emoji: '🍵' },
  { step: 2, title: 'Tambah Keranjang', emoji: '🛒' },
  { step: 3, title: 'Isi Data', emoji: '📝' },
  { step: 4, title: 'Bayar', emoji: '💳' },
  { step: 5, title: 'Diproses', emoji: '⏳' },
  { step: 6, title: 'Diterima!', emoji: '✅' },
];

export default function HomeScreen({ navigation }) {
  const featuredMenu = MENU_DATA.filter((m) => m.popular);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroBadge}>🌿 Tradisi Sejak 1987</Text>
        <Text style={styles.heroTitle}>Cendol Tradisional{'\n'}Paling Segar!</Text>
        <Text style={styles.heroSub}>🌿 Dibuat Segar Setiap Hari — Tanpa Pengawet, Tanpa Kompromi</Text>
        <View style={styles.heroBtnRow}>
          <TouchableOpacity
            style={styles.btnLihatMenu}
            onPress={() => navigation.navigate('Menu')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnLihatMenuText}>Lihat Menu 🍵</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCerita}
            onPress={() => navigation.navigate('About')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnCeritaText}>Cerita Kami</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {STATS.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statEmoji}>{s.emoji}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Cara Pesan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cara Pesan? 📋</Text>
        <View style={styles.howGrid}>
          {HOW_TO_ORDER.map((item) => (
            <View key={item.step} style={styles.howCard}>
              <View style={styles.howBadge}><Text style={styles.howBadgeText}>{item.step}</Text></View>
              <Text style={styles.howEmoji}>{item.emoji}</Text>
              <Text style={styles.howTitle}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Unggulan */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Menu Unggulan ⭐</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.seeAll}>Lihat Semua →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 4 }}>
          {featuredMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => navigation.navigate('ProductDetail', { item })}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.menuCardImage} />
              <View style={styles.menuCardBody}>
                <Text style={styles.menuCardName}>{item.name}</Text>
                <View style={styles.menuCardRatingRow}>
                  <Text style={styles.menuCardRating}>⭐ {item.rating}</Text>
                  <Text style={styles.menuCardCategory}>{item.category}</Text>
                </View>
                <Text style={styles.menuCardPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Ulasan Pelanggan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ulasan Pelanggan 💬</Text>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingBig}>4.9</Text>
          <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.ratingLabel}>Rata-rata penilaian</Text>
        </View>
        {REVIEWS.map((r) => (
          <View key={r.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewAvatarText}>{r.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.reviewName}>{r.name}</Text>
                <Text style={styles.reviewDate}>{r.date}</Text>
              </View>
              <Text style={styles.reviewStars}>{'⭐'.repeat(r.rating)}</Text>
            </View>
            <Text style={styles.reviewComment}>"{r.comment}"</Text>
          </View>
        ))}
      </View>

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoTitle}>🎉 Promo Spesial Hari Ini!</Text>
        <Text style={styles.promoText}>Beli 3 cup, gratis 1 topping pilihan Anda!</Text>
        <TouchableOpacity
          style={styles.promoBtn}
          onPress={() => navigation.navigate('Menu')}
          activeOpacity={0.85}
        >
          <Text style={styles.promoBtnText}>Pesan Sekarang</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f3ee' },
  hero: {
    backgroundColor: COLORS.primaryDark,
    padding: 24,
    paddingTop: 32,
    paddingBottom: 36,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#a7f3c1',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
    overflow: 'hidden',
    letterSpacing: 0.5,
  },
  heroTitle: { fontSize: 30, fontWeight: '800', color: '#fff', lineHeight: 38, marginBottom: 10 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 20, lineHeight: 20 },
  heroBtnRow: { flexDirection: 'row', gap: 12 },
  btnLihatMenu: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 20, elevation: 2,
  },
  btnLihatMenuText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnCerita: {
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.6)', borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 20,
  },
  btnCeritaText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  statsContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    padding: 16, gap: 10, backgroundColor: '#fff',
  },
  statCard: {
    width: '47%', backgroundColor: COLORS.primaryLight,
    borderRadius: 14, padding: 16, alignItems: 'center',
  },
  statEmoji: { fontSize: 24, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.primaryDark },
  statLabel: { fontSize: 12, color: COLORS.gray, textAlign: 'center', marginTop: 2 },
  section: { padding: 16, paddingTop: 20 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 14 },
  seeAll: { fontSize: 13, color: COLORS.primary, fontWeight: '700' },
  howGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  howCard: {
    width: '30%', backgroundColor: '#fff', borderRadius: 14,
    padding: 12, alignItems: 'center', elevation: 1,
  },
  howBadge: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  howBadgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  howEmoji: { fontSize: 22 },
  howTitle: { fontSize: 11, color: COLORS.text, fontWeight: '600', textAlign: 'center', marginTop: 4 },
  menuCard: {
    width: 170, backgroundColor: '#fff', borderRadius: 16,
    overflow: 'hidden', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.07, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  menuCardImage: { width: '100%', height: 110, backgroundColor: '#e5e7eb' },
  menuCardBody: { padding: 12 },
  menuCardName: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  menuCardRatingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  menuCardRating: { fontSize: 12, color: COLORS.gray },
  menuCardCategory: {
    fontSize: 10, color: COLORS.primary, fontWeight: '700',
    textTransform: 'uppercase', backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, overflow: 'hidden',
  },
  menuCardPrice: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  ratingBox: {
    backgroundColor: COLORS.primaryDark, borderRadius: 16, padding: 20,
    alignItems: 'center', marginBottom: 14,
  },
  ratingBig: { fontSize: 48, fontWeight: '800', color: '#fff' },
  ratingStars: { fontSize: 22, marginVertical: 4 },
  ratingLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  reviewCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginBottom: 12, elevation: 1,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reviewAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  reviewAvatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  reviewName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  reviewDate: { fontSize: 11, color: COLORS.gray },
  reviewStars: { marginLeft: 'auto', fontSize: 13 },
  reviewComment: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, fontStyle: 'italic' },
  promoBanner: {
    margin: 16, borderRadius: 18, padding: 24,
    backgroundColor: COLORS.primary, alignItems: 'center',
  },
  promoTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 6 },
  promoText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 16 },
  promoBtn: {
    backgroundColor: '#fff', borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 28,
  },
  promoBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 14 },
});

