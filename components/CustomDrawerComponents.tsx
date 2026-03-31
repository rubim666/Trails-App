import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRESETS_GLOW, USUARIO, ITEMS } from '@/constants';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { navigation } = props;

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            {/* Perfil demo */}
            <LinearGradient 
                colors={[COLORS.primary, COLORS.secondary]}
                style={{ padding: 16, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, alignItems: 'center' }}
            >
                {/* profile picture */}
                <AnimatedGlow preset={PRESETS_GLOW}>
                    <Image
                        source={{ uri: 'https://avatars.githubusercontent.com/u/200701804?v=4' }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }}
                    />
                </AnimatedGlow>
                <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.white }}>Rique</Text>
                {/* line separator */}
                <View style={{ height: 1, backgroundColor: COLORS.white, width: '100%', marginVertical: 8 }} />
                <Text style={{ fontSize: 14, color: COLORS.white }}>Trilhas concluídas: {USUARIO.trilhasConcluidas}</Text>
                <Text style={{ fontSize: 14, color: COLORS.white }}>Tempo gasto: {USUARIO.tempoGasto}</Text>
                <Text style={{ fontSize: 14, color: COLORS.white }}>Nível atual: {USUARIO.nivelAtual}</Text>
            </LinearGradient>



            <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Explorar</Text>
            </View>

            {ITEMS.map((item) => (
                <View key={item.screen}>
                    <DrawerItem
                        label={item.label}
                        onPress={() => {
                            if (item.screen === 'sair') {
                                router.replace('/');
                                return;
                            }
// 
                            navigation.navigate(item.screen as never);
                        }}
                    />
                </View>
            ))}

            {/* Estatísticas */}
            {/* gradientBackground */}
            <LinearGradient
                colors={[COLORS.primary]}
                style={{ paddingHorizontal: 16, paddingVertical: 20, borderRadius: 8, marginTop: 20 }}
            >
                <Text style={{ fontSize: 18, fontWeight: '700'}}>Estatísticas</Text>
                {[
                    { valor: USUARIO.trilhasConcluidas, screen: 'trilhas-concluidas' },
                    { valor: USUARIO.tempoGasto, screen: 'tempo-gasto' },
                    { valor: USUARIO.nivelAtual, screen: 'nivel-atual' },
                ].map((item) => (
                    <DrawerItem
                        key={item.screen}
                        label={`${item.valor}`}
                        onPress={() => navigation.navigate(item.screen as never)}
                    />
                ))}
            </LinearGradient>

        </DrawerContentScrollView>
    )
}