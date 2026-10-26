import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, StatusBar, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';
import { useApp } from '../../context/AppContext';

const TOPPINGS = [
  { name: 'Tanpa Topping', price: 0 },
  { name: 'Ketan Hitam', price: 5000 },
  { name: 'Nangka Segar', price: 5000 },
  { name: 'Extra Gula Jawa', price: 3000 },
];

export default function ProductDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useApp();

  const [qty, setQty] = useState(1);
  const [selectedTopping, setSelectedTopping] = useState('Tanpa Topping');
  const [note, setNote] = useState('');

  const toppingPrice = TOPPINGS.find((t) => t.name === selectedTopping)?.price || 0;
  const unitPrice = item.price + toppingPrice;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    addToCart(
      {
        ...item,
        price: unitPrice,
      },
      qty,
      note,
      selectedTopping
    );

    Alert.alert(
      'Berhasil Ditambahkan',
      `${qty}x ${item.name} telah dimasukkan ke keranjang belanja.`,
      [
        { text: 'Lanjut Belanja', onPress: () => navigation.goBack() },
        { text: 'Lihat Keranjang', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.badgeRow}>
            <Text style={styles.categoryBadge}>{item.category}</Text>
            <Text style={styles.ratingText}>⭐ {item.rating} (120+ ulasan)</Text>
          </View>

          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>

          <Text style={styles.desc}>{item.desc}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Pilih Topping Tambahan</Text>
          <View style={styles.toppingGrid}>
            {TOPPINGS.map((top) => (
              <TouchableOpacity
                key={top.name}
                style={[
                  styles.toppingItem,
                  selectedTopping === top.name && styles.toppingItemActive,
                ]}
                onPress={() => setSelectedTopping(top.name)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.toppingName,
                    selectedTopping === top.name && styles.toppingTextActive,
                  ]}
                >
                  {top.name}
                </Text>
                <Text
                  style={[
                    styles.toppingPrice,
                    selectedTopping === top.name && styles.toppingTextActive,
                  ]}
                >
                  {top.price === 0 ? 'Gratis' : `+Rp ${top.price.toLocaleString('id-ID')}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Catatan Khusus</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Contoh: Es sedikit, santan dipisah, dll."
            placeholderTextColor="#9CA3AF"
            value={note}
            onChangeText={setNote}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty((prev) => Math.max(1, prev - 1))}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{qty}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty((prev) => prev + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.85}>
          <Text style={styles.addBtnText}>
            + Keranjang (Rp {totalPrice.toLocaleString('id-ID')})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 110 },
  imageWrapper: { width: '100%', height: 280, position: 'relative' },
  image: { width: '100%', height: '100%', backgroundColor: '#E5E7EB' },
  backBtn: {
    position: 'absolute',
    top: 45,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  backBtnText: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  body: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    textTransform: 'uppercase',
  },
  ratingText: { fontSize: 13, color: COLORS.gray },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '800', color: COLORS.primary, marginBottom: 12 },
  desc: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },
  divider: { height: 1, backgroundColor: COLORS.grayBorder, marginVertical: 18 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  toppingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  toppingItem: {
    width: '48%',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS.grayLight,
  },
  toppingItemActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  toppingName: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  toppingPrice: { fontSize: 12, color: COLORS.gray },
  toppingTextActive: { color: COLORS.primaryDark },
  noteInput: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    elevation: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  qtyValue: { fontSize: 16, fontWeight: '700', paddingHorizontal: 10, color: COLORS.text },
  addBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});

