import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { COLORS } from '../../data/menuData';

export default function OrderSuccessScreen({ route, navigation }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🎉</Text>
        </View>

        <Text style={styles.title}>Pesanan Berhasil Dibuat!</Text>
        <Text style={styles.subtitle}>
          Terima kasih telah memesan Jungut Fresh Cendol. Pesanan Anda sedang disiapkan dengan higienis.
        </Text>

        <View style={styles.invoiceCard}>
          <View style={styles.invHeader}>
            <Text style={styles.invLabel}>Nomor Invoice</Text>
            <Text style={styles.invId}>{order.id}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Penerima:</Text>
            <Text style={styles.val}>{order.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nomor Kontak:</Text>
            <Text style={styles.val}>{order.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.val}>{order.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zona Kirim:</Text>
            <Text style={styles.val}>{order.zone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Metode Pembayaran:</Text>
            <Text style={styles.val}>{order.paymentMethod}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Pembayaran:</Text>
            <Text style={styles.totalVal}>Rp {order.total.toLocaleString('id-ID')}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnTrack}
          onPress={() => navigation.replace('OrderTrack', { order })}
          activeOpacity={0.85}
        >
          <Text style={styles.btnTrackText}>Lacak Status Pengiriman 🛵</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnHome}
          onPress={() => navigation.navigate('MainApp')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnHomeText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { padding: 24, paddingTop: 40, alignItems: 'center' },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  iconText: { fontSize: 44 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.primaryDark, textAlign: 'center' },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  invoiceCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    elevation: 3,
  },
  invHeader: { alignItems: 'center', marginBottom: 10 },
  invLabel: { fontSize: 12, color: COLORS.gray, textTransform: 'uppercase' },
  invId: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.grayBorder, marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, color: COLORS.gray },
  val: { fontSize: 13, fontWeight: '600', color: COLORS.text, maxWidth: '60%', textAlign: 'right' },
  totalLabel: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  totalVal: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  btnTrack: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnTrackText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  btnHome: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  btnHomeText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
});

