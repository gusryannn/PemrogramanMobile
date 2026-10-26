import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Image, StatusBar,
} from 'react-native';
import { COLORS, MENU_DATA } from '../../data/menuData';

const CATEGORIES = ['Semua', 'Cendol', 'Minuman', 'Topping'];

export default function MenuScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = MENU_DATA.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 'Semua' ||
      item.category === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari menu cendol..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        <Text style={styles.resultCount}>{filtered.length} menu ditemukan</Text>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Menu tidak ditemukan.</Text>
          </View>
        ) : (
          <View style={styles.cardGrid}>
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetail', { item })}
                activeOpacity={0.9}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                {item.popular && (
                  <View style={styles.popularBadge}><Text style={styles.popularText}>Populer</Text></View>
                )}
                <View style={styles.cardBody}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                    <TouchableOpacity style={styles.addBtn}
                      onPress={() => navigation.navigate('ProductDetail', { item })}>
                      <Text style={styles.addBtnText}>+ Pesan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f3ee' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', margin: 16, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },
  categoryRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 4 },
  catBtn: {
    paddingHorizontal: 18, paddingVertical: 8,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: COLORS.grayBorder,
  },
  catBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
  catTextActive: { color: '#fff' },
  grid: { padding: 16, paddingTop: 12 },
  resultCount: { fontSize: 13, color: COLORS.gray, marginBottom: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 50 },
  emptyEmoji: { fontSize: 44, marginBottom: 8 },
  emptyText: { fontSize: 15, color: COLORS.gray },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card: {
    width: '47.5%', backgroundColor: '#fff', borderRadius: 16,
    overflow: 'hidden', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.07, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  cardImage: { width: '100%', height: 120, backgroundColor: '#e5e7eb' },
  popularBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  popularText: { fontSize: 10, fontWeight: '800', color: '#1a1a1a' },
  cardBody: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  cardDesc: { fontSize: 11, color: COLORS.gray, lineHeight: 16, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  addBtn: {
    backgroundColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});

