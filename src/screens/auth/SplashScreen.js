import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { COLORS } from '../../data/menuData';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🍃</Text>
        </View>
        <Text style={styles.brand}>Jungut</Text>
        <Text style={styles.brandSub}>Fresh Cendol</Text>
        <Text style={styles.tagline}>🌿 Dibuat Segar Setiap Hari</Text>
        <Text style={styles.since}>Tradisi Sejak 1987</Text>
      </Animated.View>
      <Text style={styles.footer}>Kesiman, Denpasar, Bali</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { alignItems: 'center' },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoEmoji: { fontSize: 52 },
  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 22,
    fontWeight: '400',
    color: '#a7f3c1',
    letterSpacing: 2,
    marginTop: -4,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  since: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 6,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
});

