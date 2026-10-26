import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Peringatan', 'Semua field wajib diisi.');
      return;
    }
    if (password !== confirmPass) {
      Alert.alert('Peringatan', 'Password dan konfirmasi password tidak cocok.');
      return;
    }
    Alert.alert('Berhasil!', 'Akun berhasil dibuat. Silakan masuk.', [
      { text: 'Masuk', onPress: () => navigation.replace('Login') },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logoEmoji}>🍃</Text>
          <Text style={styles.title}>Buat Akun Baru</Text>
          <Text style={styles.subtitle}>Bergabung dan nikmati promo eksklusif!</Text>
        </View>

        <View style={styles.card}>
          {[
            { label: 'Nama Lengkap', value: name, setter: setName, placeholder: 'Masukkan nama lengkap', type: 'default' },
            { label: 'Email', value: email, setter: setEmail, placeholder: 'Masukkan email Anda', type: 'email-address' },
            { label: 'No. HP / WhatsApp', value: phone, setter: setPhone, placeholder: '+62 xxx-xxxx-xxxx', type: 'phone-pad' },
            { label: 'Password', value: password, setter: setPassword, placeholder: 'Minimal 8 karakter', type: 'default', secure: true },
            { label: 'Konfirmasi Password', value: confirmPass, setter: setConfirmPass, placeholder: 'Ulangi password', type: 'default', secure: true },
          ].map((field, i) => (
            <View key={i}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#9CA3AF"
                value={field.value}
                onChangeText={field.setter}
                keyboardType={field.type}
                secureTextEntry={field.secure}
                autoCapitalize={field.type === 'email-address' ? 'none' : 'words'}
              />
            </View>
          ))}

          <View style={styles.tosRow}>
            <Text style={styles.tosText}>Dengan mendaftar, Anda menyetujui </Text>
            <TouchableOpacity><Text style={styles.tosLink}>Syarat & Ketentuan</Text></TouchableOpacity>
            <Text style={styles.tosText}> kami.</Text>
          </View>

          <TouchableOpacity style={styles.btnRegister} onPress={handleRegister} activeOpacity={0.85}>
            <Text style={styles.btnRegisterText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Masuk</Text>
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
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: COLORS.white, borderRadius: 20, padding: 24,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,
  },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: COLORS.grayLight, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    color: COLORS.text, borderWidth: 1, borderColor: COLORS.grayBorder,
  },
  tosRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16 },
  tosText: { fontSize: 12, color: COLORS.gray },
  tosLink: { fontSize: 12, color: COLORS.primary, fontWeight: '700' },
  btnRegister: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', elevation: 2,
  },
  btnRegisterText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  loginText: { fontSize: 14, color: COLORS.gray },
  loginLink: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
});

