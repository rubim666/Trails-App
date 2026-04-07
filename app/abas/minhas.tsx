import { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOWS, TRILHAS_LISTA, USUARIO } from "@/constants";

export default function MinhasTrilhas() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
        ]).start();
    }, []);

    const trails = Object.values(TRILHAS_LISTA);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="heart" size={28} color={COLORS.forest} />
                    </View>
                    <View>
                        <Text style={styles.title}>Minhas Trilhas</Text>
                        <Text style={styles.subtitle}>Suas aventuras salvas</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, SHADOWS.sm]}>
                        <LinearGradient
                            colors={[COLORS.forest, COLORS.primary]}
                            style={styles.statGradient}
                        >
                            <Ionicons name="checkmark-circle" size={22} color={COLORS.white} />
                            <Text style={styles.statValue}>{USUARIO.trilhasConcluidas}</Text>
                            <Text style={styles.statLabel}>Concluídas</Text>
                        </LinearGradient>
                    </View>
                    <View style={[styles.statCard, SHADOWS.sm]}>
                        <View style={styles.statLight}>
                            <Ionicons name="time" size={22} color={COLORS.forest} />
                            <Text style={[styles.statValue, { color: COLORS.forest }]}>{USUARIO.tempoGasto}</Text>
                            <Text style={[styles.statLabel, { color: COLORS.textMuted }]}>Tempo Total</Text>
                        </View>
                    </View>
                    <View style={[styles.statCard, SHADOWS.sm]}>
                        <View style={styles.statLight}>
                            <Ionicons name="trophy" size={22} color={COLORS.forest} />
                            <Text style={[styles.statValue, { color: COLORS.forest }]}>Nv {USUARIO.nivelAtual}</Text>
                            <Text style={[styles.statLabel, { color: COLORS.textMuted }]}>Nível</Text>
                        </View>
                    </View>
                </View>

                {/* Trail list */}
                <Text style={styles.sectionTitle}>Trilhas Salvas</Text>

                {trails.map((trilha) => (
                    <TouchableOpacity
                        key={trilha.id}
                        style={[styles.card, SHADOWS.card]}
                        activeOpacity={0.85}
                        onPress={() =>
                            router.push({
                                pathname: "/trilha/[id]",
                                params: { id: trilha.id, origem: "minhas" },
                            })
                        }
                    >
                        <LinearGradient
                            colors={trilha.gradientColors}
                            style={styles.cardIcon}
                        >
                            <Ionicons name="trail-sign" size={20} color={COLORS.white} />
                        </LinearGradient>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardName}>{trilha.nome}</Text>
                            <View style={styles.cardMetaRow}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="location-outline" size={12} color={COLORS.textMuted} />
                                    <Text style={styles.metaText}>{trilha.local}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <Ionicons name="walk-outline" size={12} color={COLORS.textMuted} />
                                    <Text style={styles.metaText}>{trilha.distancia}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardRight}>
                            <View style={styles.ratingBadge}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.ratingText}>{trilha.nota.toFixed(1)}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                        </View>
                    </TouchableOpacity>
                ))}

                {trails.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="heart-outline" size={48} color={COLORS.tertiary} />
                        <Text style={styles.emptyTitle}>Nenhuma trilha salva</Text>
                        <Text style={styles.emptySubtitle}>Explore e salve suas trilhas favoritas</Text>
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => router.push("/abas/descobrir")}
                        >
                            <LinearGradient
                                colors={[COLORS.forest, COLORS.primary]}
                                style={styles.emptyButtonGradient}
                            >
                                <Ionicons name="compass" size={18} color={COLORS.white} />
                                <Text style={styles.emptyButtonText}>Descobrir Trilhas</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}

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
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
    },
    statGradient: {
        alignItems: "center",
        paddingVertical: 16,
        gap: 4,
    },
    statLight: {
        alignItems: "center",
        paddingVertical: 16,
        gap: 4,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: COLORS.tertiary,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.white,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "rgba(255,255,255,0.8)",
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 14,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        gap: 12,
    },
    cardIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    cardContent: {
        flex: 1,
        gap: 4,
    },
    cardName: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.forest,
    },
    cardMetaRow: {
        flexDirection: "row",
        gap: 12,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    metaText: {
        fontSize: 11,
        color: COLORS.textMuted,
        fontWeight: "500",
    },
    cardRight: {
        alignItems: "center",
        gap: 6,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        backgroundColor: COLORS.quaternary,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: "700",
        color: COLORS.forest,
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: 48,
        gap: 8,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.text,
    },
    emptySubtitle: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    emptyButton: {
        borderRadius: 24,
        overflow: "hidden",
        marginTop: 12,
    },
    emptyButtonGradient: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    emptyButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.white,
    },
});