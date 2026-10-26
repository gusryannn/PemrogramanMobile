import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar dari akun?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.userName}>Gus Ryan</Text>
        <Text style={styles.userEmail}>ryanico06@gmail.com</Text>
        <View style={styles.memberBadge}>
          <Text style={styles.memberText}>⭐ Pelanggan Setia Jungut</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>2</Text>
          <Text style={styles.statLabel}>Pesanan Selesai</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statVal}>2</Text>
          <Text style={styles.statLabel}>Kupon Promo</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statVal}>4</Text>
          <Text style={styles.statLabel}>Ulasan Aktif</Text>
        </View>
      </View>

      <View style={styles.menuCard}>
        <Text style={styles.menuSectionTitle}>Akun & Preferensi</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Edit Profil', 'Fitur pembaruan profil pengguna aktif.')}
        >
          <Text style={styles.itemIcon}>✏️</Text>
          <Text style={styles.itemText}>Edit Profil Saya</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Alamat Tersimpan', 'Alamat utama: Jl. Hayam Wuruk No. 45, Kesiman, Denpasar.')}
        >
          <Text style={styles.itemIcon}>📍</Text>
          <Text style={styles.itemText}>Daftar Alamat Pengantaran</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <Text style={styles.itemIcon}>📦</Text>
          <Text style={styles.itemText}>Riwayat & Lacak Pesanan</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuCard}>
        <Text style={styles.menuSectionTitle}>Bantuan & Informasi</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.itemIcon}>💬</Text>
          <Text style={styles.itemText}>Pusat Bantuan & Kontak</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.itemIcon}>ℹ️</Text>
          <Text style={styles.itemText}>Tentang Jungut Fresh Cendol</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Syarat & Privasi', 'Kebijakan privasi & syarat penggunaan layanan Jungut Fresh Cendol.')}
        >
          <Text style={styles.itemIcon}>🛡️</Text>
          <Text style={styles.itemText}>Kebijakan Privasi</Text>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogout} onPress={handleLogout} activeOpacity={0.85}>
        <Text style={styles.btnLogoutText}>Keluar dari Akun</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Aplikasi Versi 1.0.0 (UTS Pemrograman Mobile)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 16, paddingBottom: 30 },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarEmoji: { fontSize: 34 },
  userName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  userEmail: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  memberBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },
  memberText: { fontSize: 11, fontWeight: '700', color: COLORS.primaryDark },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 14,
    elevation: 2,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
  statDivider: { width: 1, height: '70%', backgroundColor: COLORS.grayBorder, alignSelf: 'center' },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  menuSectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.gray, textTransform: 'uppercase', marginBottom: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    gap: 12,
  },
  itemIcon: { fontSize: 18 },
  itemText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  arrowText: { fontSize: 20, color: COLORS.gray },
  btnLogout: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  btnLogoutText: { color: '#DC2626', fontWeight: '700', fontSize: 14 },
  versionText: { fontSize: 11, color: COLORS.gray, textAlign: 'center' },
});

