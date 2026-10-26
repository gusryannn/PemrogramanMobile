import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, TextInput, Alert, StatusBar,
} from 'react-native';
import { COLORS } from '../../data/menuData';
import { useApp } from '../../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cart, updateCartQty, removeFromCart } = useApp();
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const applyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if (code === 'CENDOL10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setAppliedVoucher('CENDOL10 (Diskon 10%)');
      Alert.alert('Voucher Digunakan', 'Diskon 10% berhasil diterapkan!');
    } else if (code === 'BALI20') {
      const disc = Math.round(subtotal * 0.2);
      setDiscount(disc);
      setAppliedVoucher('BALI20 (Diskon 20%)');
      Alert.alert('Voucher Digunakan', 'Diskon 20% berhasil diterapkan!');
    } else {
      Alert.alert('Voucher Tidak Valid', 'Gunakan kode voucher CENDOL10 atau BALI20.');
    }
  };

  const grandTotal = Math.max(0, subtotal - discount);

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Keranjang Belanja Kosong</Text>
        <Text style={styles.emptySub}>
          Anda belum memilih menu cendol segar hari ini.
        </Text>
        <TouchableOpacity
          style={styles.btnExplore}
          onPress={() => navigation.navigate('Menu')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnExploreText}>Lihat Daftar Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepActive}>1. Keranjang</Text>
          <Text style={styles.stepDivider}>→</Text>
          <Text style={styles.stepInactive}>2. Pengiriman</Text>
          <Text style={styles.stepDivider}>→</Text>
          <Text style={styles.stepInactive}>3. Bayar</Text>
        </View>

        <Text style={styles.sectionHeader}>Daftar Pesanan ({cart.length} item)</Text>

        {cart.map((item) => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            <View style={styles.cardInfo}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>

              {item.selectedTopping && (
                <Text style={styles.cardTopping}>Topping: {item.selectedTopping}</Text>
              )}
              {item.note ? <Text style={styles.cardNote}>"{item.note}"</Text> : null}

              <View style={styles.cardBottomRow}>
                <Text style={styles.cardPrice}>
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </Text>

                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateCartQty(item.id, -1)}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyVal}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateCartQty(item.id, 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.voucherCard}>
          <Text style={styles.voucherLabel}>Punya Kode Promo?</Text>
          <View style={styles.voucherRow}>
            <TextInput
              style={styles.voucherInput}
              placeholder="Contoh: CENDOL10 / BALI20"
              placeholderTextColor="#9CA3AF"
              value={voucher}
              onChangeText={setVoucher}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.voucherBtn} onPress={applyVoucher}>
              <Text style={styles.voucherBtnText}>Pakai</Text>
            </TouchableOpacity>
          </View>
          {appliedVoucher ? (
            <Text style={styles.appliedText}>✓ {appliedVoucher}</Text>
          ) : null}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeader}>Ringkasan Biaya</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal Produk</Text>
            <Text style={styles.summaryVal}>Rp {subtotal.toLocaleString('id-ID')}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: '#059669' }]}>Diskon Promo</Text>
              <Text style={[styles.summaryVal, { color: '#059669' }]}>
                -Rp {discount.toLocaleString('id-ID')}
              </Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalVal}>Rp {grandTotal.toLocaleString('id-ID')}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomSubtext}>Total Pesanan</Text>
          <Text style={styles.bottomPrice}>Rp {grandTotal.toLocaleString('id-ID')}</Text>
        </View>
        <TouchableOpacity
          style={styles.btnCheckout}
          onPress={() =>
            navigation.navigate('Checkout', {
              subtotal,
              discount,
              grandTotal,
            })
          }
          activeOpacity={0.85}
        >
          <Text style={styles.btnCheckoutText}>Lanjut Checkout →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 16, paddingBottom: 110 },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  stepActive: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  stepInactive: { fontSize: 13, color: COLORS.gray },
  stepDivider: { fontSize: 12, color: COLORS.gray },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardImg: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#E5E7EB' },
  cardInfo: { flex: 1, marginLeft: 12 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  deleteText: { fontSize: 16, color: COLORS.gray, paddingLeft: 8 },
  cardTopping: { fontSize: 12, color: COLORS.primaryDark, marginTop: 2 },
  cardNote: { fontSize: 11, color: COLORS.gray, fontStyle: 'italic', marginTop: 2 },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 8,
  },
  qtyBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  qtyVal: { fontSize: 13, fontWeight: '700', paddingHorizontal: 8, color: COLORS.text },
  voucherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 1,
  },
  voucherLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  voucherRow: { flexDirection: 'row', gap: 10 },
  voucherInput: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.text,
  },
  voucherBtn: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  voucherBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  appliedText: { fontSize: 12, color: '#059669', fontWeight: '600', marginTop: 8 },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  summaryHeader: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: COLORS.gray },
  summaryVal: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  divider: { height: 1, backgroundColor: COLORS.grayBorder, marginVertical: 8 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  totalVal: { fontSize: 17, fontWeight: '800', color: COLORS.primary },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
  },
  bottomSubtext: { fontSize: 11, color: COLORS.gray },
  bottomPrice: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  btnCheckout: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  btnCheckoutText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.primaryDark, marginBottom: 6 },
  emptySub: { fontSize: 14, color: COLORS.gray, textAlign: 'center', marginBottom: 24 },
  btnExplore: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  btnExploreText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});

