import { useState, useRef, useEffect } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOWS } from "@/constants";

interface OptionSwitch {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const options: OptionSwitch[] = [
    {
        id: "notificacoes",
        title: "Notificações",
        description: "Receba alertas sobre novas trilhas e atualizações.",
        icon: "notifications",
    },
    {
        id: "gps",
        title: "Ativar GPS",
        description: "Mostre trilhas próximas e forneça navegação.",
        icon: "navigate",
    },
    {
        id: "offline",
        title: "Modo Offline",
        description: "Baixe trilhas para acessar sem internet.",
        icon: "cloud-offline",
    },
];

export default function Config() {
    const [states, setStates] = useState<Record<string, boolean>>({
        notificacoes: true,
        gps: true,
        offline: false,
    });

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
        ]).start();
    }, []);

    const toggle = (id: string) => {
        setStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const activesCount = Object.values(states).filter(Boolean).length;
    const barAnim = useRef(new Animated.Value(activesCount / options.length)).current;

    useEffect(() => {
        Animated.spring(barAnim, {
            toValue: activesCount / options.length,
            useNativeDriver: false,
            speed: 12,
            bounciness: 8,
        }).start();
    }, [activesCount]);

    const barWidth = barAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="settings" size={28} color={COLORS.forest} />
                    </View>
                    <View>
                        <Text style={styles.title}>Configurações</Text>
                        <Text style={styles.subtitle}>Personalize sua experiência</Text>
                    </View>
                </View>

                {/* Summary card */}
                <LinearGradient
                    colors={[COLORS.forest, COLORS.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.summaryCard, SHADOWS.card]}
                >
                    <View style={styles.summaryTop}>
                        <Ionicons name="shield-checkmark" size={20} color={COLORS.white} />
                        <Text style={styles.summaryTitle}>
                            {activesCount} de {options.length} ativas
                        </Text>
                    </View>
                    <View style={styles.barBg}>
                        <Animated.View style={[styles.barFill, { width: barWidth }]} />
                    </View>
                </LinearGradient>

                {/* Options */}
                {options.map((option) => (
                    <View key={option.id} style={[styles.card, SHADOWS.sm]}>
                        <View style={styles.cardRow}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    {
                                        backgroundColor: states[option.id]
                                            ? COLORS.tertiary
                                            : "#F0F0F0",
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={option.icon as any}
                                    size={22}
                                    color={states[option.id] ? COLORS.forest : COLORS.textMuted}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.optionTitle}>{option.title}</Text>
                                <Text style={styles.optionDescription}>{option.description}</Text>
                            </View>
                            <Switch
                                value={states[option.id]}
                                onValueChange={() => toggle(option.id)}
                                trackColor={{ false: "#E0E0E0", true: COLORS.secondary }}
                                thumbColor={states[option.id] ? COLORS.forest : "#FAFAFA"}
                            />
                        </View>
                    </View>
                ))}

                <View style={{ height: 24 }} />
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 20,
    },
    headerIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.tertiary,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.forest,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.textMuted,
        fontWeight: "500",
        marginTop: 2,
    },
    summaryCard: {
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
    },
    summaryTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    summaryTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.white,
    },
    barBg: {
        height: 6,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 3,
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        backgroundColor: COLORS.accent,
        borderRadius: 3,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        marginBottom: 12,
        padding: 16,
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    iconCircle: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.forest,
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: 12,
        color: COLORS.textMuted,
        lineHeight: 17,
    },
});