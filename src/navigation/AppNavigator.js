import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '../data/menuData';
import { useApp } from '../context/AppContext';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import HomeScreen from '../screens/customer/HomeScreen';
import MenuScreen from '../screens/customer/MenuScreen';
import CartScreen from '../screens/customer/CartScreen';
import OrderHistoryScreen from '../screens/customer/OrderHistoryScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';

import ProductDetailScreen from '../screens/customer/ProductDetailScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import OrderSuccessScreen from '../screens/customer/OrderSuccessScreen';
import OrderTrackScreen from '../screens/customer/OrderTrackScreen';
import AboutScreen from '../screens/customer/AboutScreen';
import ContactScreen from '../screens/customer/ContactScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const { cart } = useApp();
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 1,
          shadowOpacity: 0.05,
        },
        headerTitleStyle: {
          fontWeight: '800',
          color: COLORS.primaryDark,
          fontSize: 17,
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: COLORS.grayBorder,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused }) => {
          let icon = '🏠';
          let badge = null;

          if (route.name === 'HomeTab') icon = '🏠';
          else if (route.name === 'MenuTab') icon = '🍵';
          else if (route.name === 'CartTab') {
            icon = '🛒';
            if (totalCartCount > 0) {
              badge = totalCartCount;
            }
          } else if (route.name === 'OrdersTab') icon = '📦';
          else if (route.name === 'ProfileTab') icon = '👤';

          return (
            <View style={styles.iconWrapper}>
              <Text style={{ fontSize: focused ? 22 : 19 }}>{icon}</Text>
              {badge ? (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ) : null}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Beranda', headerTitle: 'Jungut Fresh Cendol' }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{ title: 'Menu', headerTitle: 'Daftar Menu Cendol' }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{ title: 'Keranjang', headerTitle: 'Keranjang Pesanan' }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderHistoryScreen}
        options={{ title: 'Pesanan', headerTitle: 'Riwayat Pesanan' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profil', headerTitle: 'Profil Saya' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontWeight: '800', color: COLORS.text, fontSize: 16 },
        headerTintColor: COLORS.primary,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Daftar Akun Baru' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Lupa Password' }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Checkout & Pengiriman' }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderTrack"
        component={OrderTrackScreen}
        options={{ title: 'Lacak Pengiriman' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Tentang Kami' }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Kontak Outlet' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: COLORS.red,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});

