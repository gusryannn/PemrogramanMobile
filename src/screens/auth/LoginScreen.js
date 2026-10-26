import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Peringatan', 'Email dan password wajib diisi.');
      return;
    }
    navigation.replace('MainApp');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logoEmoji}>🍃</Text>
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>Masuk ke akun Anda</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email / Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan email Anda"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Masukkan password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(!showPass)}>
              <Text style={styles.eyeText}>{showPass ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Lupa password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnLoginText}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.btnGuest} onPress={() => navigation.replace('MainApp')} activeOpacity={0.85}>
            <Text style={styles.btnGuestText}>Masuk Sebagai Tamu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingTop: 48, paddingBottom: 32 },
  header: { alignItems: 'center', marginBottom: 28 },
  logoEmoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.primaryDark },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 4 },
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
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    marginBottom: 4,
  },
  passWrapper: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  eyeBtn: { padding: 8 },
  eyeText: { fontSize: 18 },
  forgotText: { fontSize: 13, color: COLORS.primary, textAlign: 'right', marginTop: 6, marginBottom: 20 },
  btnLogin: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
  },
  btnLoginText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  divider: { flex: 1, height: 1, backgroundColor: COLORS.grayBorder },
  dividerText: { marginHorizontal: 12, color: COLORS.gray, fontSize: 13 },
  btnGuest: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnGuestText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  registerText: { fontSize: 14, color: COLORS.gray },
  registerLink: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
});

