import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRESETS_GLOW, USUARIO } from '@/constants';
import AnimatedGlow from 'react-native-animated-glow';
import { Image } from 'react-native';
import { View, Text } from 'react-native';

export default function Perfil() {
    return (
        <LinearGradient 
            colors={[COLORS.primary, COLORS.secondary]}
            style={{ padding: 16, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, alignItems: 'center' }}
        >
            <View>
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
                <View style={{ height: 1, backgroundColor: COLORS.white, width: '100%', marginVertical: 8 }} />
                <Text style={{ fontSize: 20, color: COLORS.white, fontWeight: '700' }}>Badges</Text>
            </View>
        </LinearGradient>
    )
}