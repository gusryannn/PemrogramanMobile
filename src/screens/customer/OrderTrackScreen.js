import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, Modal, StatusBar, Alert,
} from 'react-native';
import { COLORS } from '../../data/menuData';

const TIMELINE_STEPS = [
  { step: 1, title: 'Menunggu Pembayaran', desc: 'Sistem menunggu konfirmasi pembayaran', emoji: '⏰' },
  { step: 2, title: 'Pembayaran Dikonfirmasi', desc: 'Pesanan sedang disiapkan di dapur Kesiman', emoji: '🍵' },
  { step: 3, title: 'Sedang Dikirim', desc: 'Kurir Gus Ryan sedang menuju lokasi Anda', emoji: '🛵' },
  { step: 4, title: 'Pesanan Telah Tiba', desc: 'Kurir telah sampai di depan rumah/lokasi', emoji: '📍' },
  { step: 5, title: 'Pesanan Selesai', desc: 'Transaksi selesai. Selamat menikmati cendol segar!', emoji: '✅' },
];

export default function OrderTrackScreen({ route, navigation }) {
  const { order } = route.params;

  const currentStep = order.status === 'SELESAI' ? 5 : order.status === 'SEDANG_DIKIRIM' ? 3 : 1;

  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'kurir', text: 'Halo kak, pesanan cendol sudah saya ambil dari outlet Kesiman ya.' },
    { id: 2, sender: 'kurir', text: 'Sedang otw ke alamat Kakak di ' + (order.address || 'Denpasar') },
    { id: 3, sender: 'user', text: 'Baik mas Gus Ryan, hati-hati di jalan ya.' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'kurir', text: 'Siap kak, 10 menit lagi saya sampai!' },
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerLabel}>Nomor Invoice</Text>
              <Text style={styles.headerInvoice}>{order.id}</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live Tracking</Text>
            </View>
          </View>
          <Text style={styles.headerDate}>{order.date}</Text>
        </View>

        <View style={styles.courierCard}>
          <View style={styles.courierAvatar}>
            <Text style={styles.courierEmoji}>👨‍🌾</Text>
          </View>
          <View style={styles.courierInfo}>
            <Text style={styles.courierName}>Gus Ryan (Kurir)</Text>
            <Text style={styles.courierVehicle}>Honda Scoopy • DK 4521 AB</Text>
            <Text style={styles.courierStatus}>🟢 Sedang di Perjalanan</Text>
          </View>
          <TouchableOpacity
            style={styles.btnChat}
            onPress={() => setChatVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnChatText}>💬 Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Status Perjalanan Pesanan</Text>

          {TIMELINE_STEPS.map((step, idx) => {
            const isDone = step.step <= currentStep;
            const isCurrent = step.step === currentStep;

            return (
              <View key={step.step} style={styles.stepRow}>
                <View style={styles.indicatorCol}>
                  <View
                    style={[
                      styles.circle,
                      isDone && styles.circleDone,
                      isCurrent && styles.circleCurrent,
                    ]}
                  >
                    <Text style={styles.stepEmoji}>{step.emoji}</Text>
                  </View>
                  {idx < TIMELINE_STEPS.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        step.step < currentStep && styles.lineDone,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      isDone && styles.stepTitleDone,
                      isCurrent && styles.stepTitleCurrent,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.destCard}>
          <Text style={styles.destTitle}>Alamat Pengantaran</Text>
          <Text style={styles.destName}>{order.customerName || 'Pelanggan Jungut'}</Text>
          <Text style={styles.destAddress}>{order.address}</Text>
          <Text style={styles.destZone}>Zona: {order.zone}</Text>
        </View>
      </ScrollView>

      {/* Modal Chat Kurir */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Chat dengan Kurir</Text>
              <Text style={styles.modalSub}>Gus Ryan (Kurir Pengantaran)</Text>
            </View>
            <TouchableOpacity onPress={() => setChatVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatContent}>
            {messages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.bubble,
                  m.sender === 'user' ? styles.bubbleUser : styles.bubbleKurir,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    m.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextKurir,
                  ]}
                >
                  {m.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.inputChat}
              placeholder="Tulis pesan untuk kurir..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Text style={styles.sendText}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 16, paddingBottom: 30 },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLabel: { fontSize: 12, color: COLORS.gray, textTransform: 'uppercase' },
  headerInvoice: { fontSize: 16, fontWeight: '800', color: COLORS.primaryDark, marginTop: 2 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  liveText: { fontSize: 11, fontWeight: '700', color: COLORS.primaryDark },
  headerDate: { fontSize: 12, color: COLORS.gray, marginTop: 6 },
  courierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    gap: 12,
  },
  courierAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierEmoji: { fontSize: 24 },
  courierInfo: { flex: 1 },
  courierName: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  courierVehicle: { fontSize: 12, color: COLORS.gray, marginTop: 1 },
  courierStatus: { fontSize: 11, color: '#059669', fontWeight: '700', marginTop: 2 },
  btnChat: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  btnChatText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  timelineTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  stepRow: { flexDirection: 'row', marginBottom: 12 },
  indicatorCol: { alignItems: 'center', width: 40, marginRight: 10 },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  circleDone: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  circleCurrent: { borderColor: COLORS.accent, borderWidth: 2 },
  stepEmoji: { fontSize: 16 },
  line: { width: 2, height: 36, backgroundColor: COLORS.grayBorder, marginVertical: 4 },
  lineDone: { backgroundColor: COLORS.primary },
  stepContent: { flex: 1, justifyContent: 'center' },
  stepTitle: { fontSize: 14, fontWeight: '600', color: COLORS.gray },
  stepTitleDone: { color: COLORS.text, fontWeight: '700' },
  stepTitleCurrent: { color: COLORS.primaryDark, fontWeight: '800' },
  stepDesc: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  destCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  destTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  destName: { fontSize: 13, fontWeight: '700', color: COLORS.primaryDark },
  destAddress: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2, lineHeight: 18 },
  destZone: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  modalContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 45,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayBorder,
  },
  modalTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  modalSub: { fontSize: 12, color: COLORS.primary, marginTop: 2 },
  closeBtn: { padding: 8 },
  closeBtnText: { fontSize: 18, color: COLORS.gray, fontWeight: 'bold' },
  chatScroll: { flex: 1, padding: 16 },
  chatContent: { paddingBottom: 16 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 14, marginBottom: 10 },
  bubbleKurir: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 2,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 2,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextKurir: { color: COLORS.text },
  bubbleTextUser: { color: '#FFFFFF' },
  inputBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.grayBorder,
    gap: 10,
  },
  inputChat: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
});

