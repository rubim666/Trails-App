import { Tabs, router } from 'expo-router';
import { COLORS, SHADOWS } from '../../constants/index';
import { TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AbasLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.forest,
                tabBarInactiveTintColor: COLORS.textMuted,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopWidth: 0,
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
                    paddingTop: 8,
                    ...SHADOWS.sm,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
                headerStyle: {
                    backgroundColor: COLORS.white,
                    ...SHADOWS.sm,
                },
                headerTintColor: COLORS.forest,
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        style={{ marginLeft: 16, padding: 4 }}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.forest} />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="descobrir"
                options={{
                    title: 'Descobrir',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="minhas"
                options={{
                    title: 'Minhas Trilhas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="config"
                options={{
                    title: 'Config',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default AbasLayout;