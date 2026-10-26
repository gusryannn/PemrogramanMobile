import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TextInput, TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

const SUBJECTS = [
  'Pertanyaan Umum',
  'Pesanan dalam Jumlah Banyak',
  'Kerjasama / Franchise',
  'Kritik & Saran',
];

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Peringatan', 'Harap isi nama, email, dan pesan Anda.');
      return;
    }

    Alert.alert(
      'Pesan Terkirim',
      `Terima kasih ${name}, pesan Anda mengenai "${subject}" telah kami terima. Tim kami akan membalas via email secepatnya.`,
      [{ text: 'OK', onPress: () => { setMessage(''); } }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.badge}>KONTAK KAMI</Text>
        <Text style={styles.title}>Terhubung dengan Kami</Text>
        <Text style={styles.subtitle}>Punya pertanyaan atau ingin memesan untuk acara spesial?</Text>
      </View>

      <View style={styles.contactRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.infoTitle}>Lokasi Outlet</Text>
          <Text style={styles.infoDesc}>Jl. Turi No. 21, Kesiman, Denpasar Timur, Bali</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📞</Text>
          <Text style={styles.infoTitle}>WhatsApp</Text>
          <Text style={styles.infoDesc}>+62 858-7582-4679{'\n'}Setiap Hari 07.00 - 20.00</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Jam Operasional Outlet</Text>
        <View style={styles.hourRow}>
          <Text style={styles.dayText}>Senin - Jumat</Text>
          <Text style={styles.timeText}>07.00 - 20.00 WITA</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.dayText}>Sabtu</Text>
          <Text style={styles.timeText}>07.00 - 21.00 WITA</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.dayText}>Minggu / Hari Libur</Text>
          <Text style={styles.timeText}>08.00 - 19.00 WITA</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>Kirim Pesan Langsung</Text>

        <Text style={styles.label}>Nama Anda</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama Anda"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Alamat Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Topik / Keperluan</Text>
        <View style={styles.subGrid}>
          {SUBJECTS.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[styles.subBtn, subject === sub && styles.subBtnActive]}
              onPress={() => setSubject(sub)}
            >
              <Text style={[styles.subText, subject === sub && styles.subTextActive]}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Isi Pesan</Text>
        <TextInput
          style={[styles.input, { height: 90 }]}
          placeholder="Tuliskan detail pertanyaan atau pesanan Anda di sini..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity style={styles.btnSend} onPress={handleSendMessage} activeOpacity={0.85}>
          <Text style={styles.btnSendText}>Kirim Pesan Sekarang ✉️</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 16, paddingBottom: 30 },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },
  badge: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  subtitle: { fontSize: 13, color: COLORS.gray, textAlign: 'center', marginTop: 4 },
  contactRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
  },
  infoIcon: { fontSize: 26, marginBottom: 6 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  infoDesc: { fontSize: 11, color: COLORS.gray, textAlign: 'center', lineHeight: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  dayText: { fontSize: 13, color: COLORS.text },
  timeText: { fontSize: 13, fontWeight: '600', color: COLORS.primaryDark },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 10 },
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
  subGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 4 },
  subBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  subBtnActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  subText: { fontSize: 11, color: COLORS.gray, fontWeight: '600' },
  subTextActive: { color: COLORS.primaryDark, fontWeight: '700' },
  btnSend: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  btnSendText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});

