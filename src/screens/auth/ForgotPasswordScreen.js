import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert('Peringatan', 'Silakan masukkan email Anda');
      return;
    }
    setSubmitted(true);
    Alert.alert(
      'Email Terkirim',
      `Tautan pemulihan kata sandi telah dikirim ke ${email}. Silakan cek kotak masuk Anda.`,
      [{ text: 'Kembali ke Login', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Kembali</Text>
          </TouchableOpacity>
          <Text style={styles.logoEmoji}>🔑</Text>
          <Text style={styles.title}>Lupa Password?</Text>
          <Text style={styles.subtitle}>
            Masukkan alamat email yang terdaftar untuk menerima instruksi reset kata sandi.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Alamat Email Terdaftar</Text>
          <TextInput
            style={styles.input}
            placeholder="nama@email.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.btnSubmit} onPress={handleReset} activeOpacity={0.85}>
            <Text style={styles.btnSubmitText}>Kirim Instruksi Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Ingat kata sandi Anda? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingTop: 40, paddingBottom: 32 },
  header: { marginBottom: 24 },
  backBtn: { marginBottom: 20 },
  backText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
  logoEmoji: { fontSize: 50, marginBottom: 12, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.primaryDark, textAlign: 'center' },
  subtitle: { fontSize: 13, color: COLORS.gray, marginTop: 6, textAlign: 'center', lineHeight: 20 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    marginBottom: 20,
  },
  btnSubmit: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
  },
  btnSubmitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14, color: COLORS.gray },
  footerLink: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
});

