import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

class DisplayCard extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View style={styles.helloCard}>
        <Text style={styles.helloText}>{this.props.text}</Text>
      </View>
    );
  }
}

class ResultCard extends Component {
  render() {
    if (!this.props.value) {
      return (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Belum ada data yang disubmit</Text>
        </View>
      );
    }

    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Hasil Input:</Text>
        <Text style={styles.resultText}>{this.props.value}</Text>
        {this.props.onClear && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={this.props.onClear}
            activeOpacity={0.7}
          >
            <Text style={styles.clearBtnText}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelloVisible: false,
      inputText: '',
      submittedText: '',
    };
  }

  toggleHello = () => {
    this.setState((prevState) => ({
      isHelloVisible: !prevState.isHelloVisible,
    }));
  };

  handleInputChange = (text) => {
    this.setState({ inputText: text });
  };

  handleSubmit = () => {
    if (!this.state.inputText.trim()) {
      Alert.alert('Peringatan', 'Silakan masukkan teks terlebih dahulu');
      return;
    }

    this.setState({
      submittedText: this.state.inputText,
      inputText: '',
    });
  };

  handleClearResult = () => {
    this.setState({
      submittedText: '',
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.badge}>MODUL III</Text>
              <Text style={styles.title}>Props, State, Method</Text>
              <Text style={styles.subtitle}>Tugas Mandiri Pemrograman Mobile</Text>
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.sectionTitle}>Tugas 1: Toggle Hello World</Text>
              
              <TouchableOpacity
                style={[
                  styles.btn,
                  this.state.isHelloVisible ? styles.btnHide : styles.btnShow,
                ]}
                onPress={this.toggleHello}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>
                  {this.state.isHelloVisible ? 'Sembunyikan' : 'Tampilkan'}
                </Text>
              </TouchableOpacity>

              <DisplayCard
                visible={this.state.isHelloVisible}
                text="Hello World"
              />
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.sectionTitle}>Tugas 2: Input & Submit Text</Text>

              <TextInput
                style={styles.input}
                placeholder="Ketik teks di sini..."
                placeholderTextColor="#9CA3AF"
                value={this.state.inputText}
                onChangeText={this.handleInputChange}
              />

              <TouchableOpacity
                style={[styles.btn, styles.btnSubmit]}
                onPress={this.handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>

              <ResultCard
                value={this.state.submittedText}
                onClear={this.handleClearResult}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 35 : 16,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  badge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 14,
  },
  btn: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnShow: {
    backgroundColor: '#2563EB',
  },
  btnHide: {
    backgroundColor: '#DC2626',
  },
  btnSubmit: {
    backgroundColor: '#059669',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  helloCard: {
    marginTop: 14,
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  helloText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 12,
  },
  emptyCard: {
    marginTop: 14,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  resultCard: {
    marginTop: 14,
    padding: 14,
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 10,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  resultText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '600',
  },
  clearBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  clearBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
});
