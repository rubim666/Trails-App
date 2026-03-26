import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/index';
import { Text } from 'react-native';

function TabIcon({ name, color }: { name: string; color: string }) {
    return <Text style={{ color, fontSize: 24 }}>{name}</Text>;
}

const AbasLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.subtitle,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.surface,
                    height: 60,
                },
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color }) => <TabIcon name="🗺️" color={color} />,
                }}
            />

            <Tabs.Screen
                name="descobrir"
                options={{
                    title: 'Descobrir',
                    tabBarIcon: ({ color }) => <TabIcon name="🔍" color={color} />,
                }}
            />

            <Tabs.Screen
                name="minhas"
                options={{
                    title: 'Minhas Trilhas',
                    tabBarIcon: ({ color }) => <TabIcon name="🗺️" color={color} />,
                }}
            />

            <Tabs.Screen
                name="config"
                options={{
                    title: 'Config',
                    tabBarIcon: ({ color }) => <TabIcon name="⚙️" color={color} />,
                }}
            />
        </Tabs>
    )
}

export default AbasLayout;