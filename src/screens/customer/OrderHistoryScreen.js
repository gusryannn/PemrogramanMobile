import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, StatusBar,
} from 'react-native';
import { COLORS } from '../../data/menuData';
import { useApp } from '../../context/AppContext';

export default function OrderHistoryScreen({ navigation }) {
  const { orders } = useApp();
  const [filter, setFilter] = useState('Semua');
  const [searchInv, setSearchInv] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(searchInv.toLowerCase());
    if (filter === 'Semua') return matchSearch;
    if (filter === 'Berlangsung') {
      return matchSearch && o.status !== 'SELESAI';
    }
    if (filter === 'Selesai') {
      return matchSearch && o.status === 'SELESAI';
    }
    return matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'MENUNGGU_PEMBAYARAN':
        return { bg: '#FEF3C7', text: '#D97706', label: 'Menunggu Bayar' };
      case 'SEDANG_DIKIRIM':
        return { bg: '#DBEAFE', text: '#1D4ED8', label: 'Sedang Dikirim 🛵' };
      case 'SELESAI':
        return { bg: '#D1FAE5', text: '#059669', label: 'Selesai ✓' };
      default:
        return { bg: '#E5E7EB', text: '#374151', label: status };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nomor invoice (misal: INV-...)"
          placeholderTextColor="#9CA3AF"
          value={searchInv}
          onChangeText={setSearchInv}
        />
      </View>

      <View style={styles.tabRow}>
        {['Semua', 'Berlangsung', 'Selesai'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, filter === tab && styles.tabBtnActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, filter === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Belum Ada Pesanan</Text>
            <Text style={styles.emptySub}>
              Pesanan Anda akan muncul di sini setelah Anda melakukan checkout.
            </Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                      {badge.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.orderDate}>{order.date}</Text>

                <View style={styles.divider} />

                <View style={styles.itemList}>
                  {order.items.map((item, idx) => (
                    <Text key={idx} style={styles.itemRow}>
                      • {item.qty}x {item.name}
                    </Text>
                  ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.totalLabel}>Total Tagihan</Text>
                    <Text style={styles.totalVal}>
                      Rp {order.total.toLocaleString('id-ID')}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.btnTrack}
                    onPress={() => navigation.navigate('OrderTrack', { order })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnTrackText}>Lacak Pesanan →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  searchBox: { padding: 16, paddingBottom: 8 },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
  tabTextActive: { color: '#FFFFFF' },
  scroll: { padding: 16, paddingTop: 8, paddingBottom: 20 },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: { fontSize: 15, fontWeight: '800', color: COLORS.primaryDark },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  orderDate: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  divider: { height: 1, backgroundColor: COLORS.grayBorder, marginVertical: 10 },
  itemList: { marginVertical: 4 },
  itemRow: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 2 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: { fontSize: 11, color: COLORS.gray },
  totalVal: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  btnTrack: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnTrackText: { color: COLORS.primaryDark, fontWeight: '700', fontSize: 13 },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  emptySub: { fontSize: 13, color: COLORS.gray, textAlign: 'center', lineHeight: 18 },
});

