import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, Alert, StatusBar,
} from 'react-native';
import { COLORS } from '../../data/menuData';
import { useApp } from '../../context/AppContext';

const BALI_ZONES = [
  { name: 'Kota Denpasar (Pusat)', fee: 5000, est: '30-45 mnt' },
  { name: 'Kab. Badung (Kuta, Canggu, Seminyak)', fee: 10000, est: '45-60 mnt' },
  { name: 'Kab. Gianyar (Ubud, Sukawati)', fee: 15000, est: '60-90 mnt' },
  { name: 'Kab. Tabanan', fee: 18000, est: '60-90 mnt' },
  { name: 'Ambil di Outlet Kesiman', fee: 0, est: 'Siap dlm 15 mnt' },
];

const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS (Gopay, OVO, Dana, ShopeePay)', icon: '📱' },
  { id: 'va_bca', name: 'BCA Virtual Account', icon: '🏦' },
  { id: 'va_mandiri', name: 'Mandiri Virtual Account', icon: '💳' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', icon: '💵' },
];

export default function CheckoutScreen({ route, navigation }) {
  const { subtotal, discount } = route.params;
  const { cart, addOrder } = useApp();

  const [customerName, setCustomerName] = useState('Ryan Gus');
  const [phone, setPhone] = useState('085875824679');
  const [address, setAddress] = useState('Jl. Hayam Wuruk No. 45, Kesiman');
  const [selectedZone, setSelectedZone] = useState(BALI_ZONES[0]);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].name);

  const deliveryFee = selectedZone.fee;
  const grandTotal = subtotal - discount + deliveryFee;

  const handlePlaceOrder = () => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Data Belum Lengkap', 'Nama, nomor telepon, dan alamat wajib diisi.');
      return;
    }

    const newInvoice = `INV-${Date.now().toString().slice(-8)}`;
    const newOrder = {
      id: newInvoice,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WITA',
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total: grandTotal,
      subtotal,
      discount,
      deliveryFee,
      status: 'MENUNGGU_PEMBAYARAN',
      statusText: 'Pesanan Diterima, Menunggu Verifikasi',
      customerName,
      phone,
      address,
      zone: selectedZone.name,
      paymentMethod,
    };

    addOrder(newOrder);

    navigation.replace('OrderSuccess', { order: newOrder });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepDone}>✓ Keranjang</Text>
          <Text style={styles.stepDivider}>→</Text>
          <Text style={styles.stepActive}>2. Data & Pengiriman</Text>
          <Text style={styles.stepDivider}>→</Text>
          <Text style={styles.stepInactive}>3. Selesai</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Data Penerima Pesanan</Text>
          
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Nama penerima"
          />

          <Text style={styles.label}>Nomor WhatsApp / HP</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="08xxxxxxxxxx"
          />

          <Text style={styles.label}>Alamat Pengantaran</Text>
          <TextInput
            style={[styles.input, { height: 70 }]}
            value={address}
            onChangeText={setAddress}
            multiline
            placeholder="Alamat lengkap beserta patokan rumah"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Pilih Zona Pengiriman (Bali)</Text>
          {BALI_ZONES.map((zone) => (
            <TouchableOpacity
              key={zone.name}
              style={[
                styles.zoneItem,
                selectedZone.name === zone.name && styles.zoneItemActive,
              ]}
              onPress={() => setSelectedZone(zone)}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.zoneName,
                    selectedZone.name === zone.name && styles.zoneTextActive,
                  ]}
                >
                  {zone.name}
                </Text>
                <Text style={styles.zoneEst}>Estimasi tiba: {zone.est}</Text>
              </View>
              <Text
                style={[
                  styles.zoneFee,
                  selectedZone.name === zone.name && styles.zoneTextActive,
                ]}
              >
                {zone.fee === 0 ? 'Gratis' : `Rp ${zone.fee.toLocaleString('id-ID')}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Metode Pembayaran</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.payItem,
                paymentMethod === method.name && styles.payItemActive,
              ]}
              onPress={() => setPaymentMethod(method.name)}
            >
              <Text style={styles.payIcon}>{method.icon}</Text>
              <Text
                style={[
                  styles.payName,
                  paymentMethod === method.name && styles.payTextActive,
                ]}
              >
                {method.name}
              </Text>
              <View
                style={[
                  styles.radio,
                  paymentMethod === method.name && styles.radioActive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Rincian Akhir</Text>
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
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
            <Text style={styles.summaryVal}>
              {deliveryFee === 0 ? 'Gratis' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Tagihan</Text>
            <Text style={styles.totalVal}>Rp {grandTotal.toLocaleString('id-ID')}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomSubtext}>Total Tagihan</Text>
          <Text style={styles.bottomPrice}>Rp {grandTotal.toLocaleString('id-ID')}</Text>
        </View>
        <TouchableOpacity
          style={styles.btnPlace}
          onPress={handlePlaceOrder}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPlaceText}>Bayar & Konfirmasi</Text>
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
  stepDone: { fontSize: 13, fontWeight: '700', color: '#059669' },
  stepActive: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  stepInactive: { fontSize: 13, color: COLORS.gray },
  stepDivider: { fontSize: 12, color: COLORS.gray },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  zoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: COLORS.grayLight,
  },
  zoneItemActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  zoneName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  zoneEst: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
  zoneFee: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  zoneTextActive: { color: COLORS.primaryDark },
  payItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: COLORS.grayLight,
    gap: 10,
  },
  payItemActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  payIcon: { fontSize: 20 },
  payName: { fontSize: 13, fontWeight: '600', color: COLORS.text, flex: 1 },
  payTextActive: { color: COLORS.primaryDark, fontWeight: '700' },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  radioActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
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
  btnPlace: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  btnPlaceText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});

