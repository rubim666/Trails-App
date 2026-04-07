import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOWS, TRILHAS_LISTA } from "@/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Mapa() {
    const trails = Object.values(TRILHAS_LISTA);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <Ionicons name="map" size={28} color={COLORS.forest} />
                </View>
                <View>
                    <Text style={styles.title}>Mapa de Trilhas</Text>
                    <Text style={styles.subtitle}>{trails.length} trilhas encontradas</Text>
                </View>
            </View>

            <View style={styles.mapPlaceholder}>
                <LinearGradient
                    colors={[COLORS.tertiary, COLORS.secondary, COLORS.primary]}
                    style={styles.mapGradient}
                >
                    <Ionicons name="earth" size={64} color="rgba(255,255,255,0.4)" />
                    <Text style={styles.mapText}>Área do Mapa</Text>
                </LinearGradient>

                {trails.map((trilha, index) => (
                    <TouchableOpacity
                        key={trilha.id}
                        style={[
                            styles.pin,
                            {
                                top: `${25 + (index * 25)}%`,
                                left: `${20 + (index * 25)}%`,
                            },
                        ]}
                        onPress={() =>
                            router.push({
                                pathname: "/trilha/[id]",
                                params: { id: trilha.id, origem: "mapa" },
                            })
                        }
                    >
                        <LinearGradient
                            colors={trilha.gradientColors}
                            style={styles.pinGradient}
                        >
                            <Ionicons name="location-sharp" size={18} color={COLORS.white} />
                        </LinearGradient>
                        <View style={styles.pinLabel}>
                            <Text style={styles.pinLabelText} numberOfLines={1}>
                                {trilha.nome}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Trilhas Próximas</Text>

            {trails.map((trilha) => (
                <TouchableOpacity
                    key={trilha.id}
                    style={[styles.card, SHADOWS.card]}
                    activeOpacity={0.85}
                    onPress={() =>
                        router.push({
                            pathname: "/trilha/[id]",
                            params: { id: trilha.id, origem: "mapa" },
                        })
                    }
                >
                    <LinearGradient
                        colors={trilha.gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardAccent}
                    />
                    <View style={styles.cardContent}>
                        <View style={styles.cardTop}>
                            <Text style={styles.cardName}>{trilha.nome}</Text>
                            <View style={[styles.diffBadge, { backgroundColor: trilha.dificuldade === 'Fácil' ? '#E8F5E9' : trilha.dificuldade === 'Média' ? '#FFF3E0' : '#FFEBEE' }]}>
                                <Text style={[styles.diffText, { color: trilha.dificuldade === 'Fácil' ? '#4CAF50' : trilha.dificuldade === 'Média' ? '#FF9800' : '#F44336' }]}>
                                    {trilha.dificuldade}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.cardMeta}>
                            <View style={styles.metaItem}>
                                <Ionicons name="location-outline" size={14} color={COLORS.textMuted} />
                                <Text style={styles.metaText}>{trilha.local}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="walk-outline" size={14} color={COLORS.textMuted} />
                                <Text style={styles.metaText}>{trilha.distancia}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
                                <Text style={styles.metaText}>{trilha.duracao}</Text>
                            </View>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
            ))}

            <View style={{ height: 24 }} />
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
    mapPlaceholder: {
        height: 220,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 24,
        ...SHADOWS.card,
    },
    mapGradient: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mapText: {
        fontSize: 14,
        color: "rgba(255,255,255,0.6)",
        fontWeight: "600",
        marginTop: 8,
    },
    pin: {
        position: "absolute",
        alignItems: "center",
    },
    pinGradient: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: COLORS.white,
        ...SHADOWS.sm,
    },
    pinLabel: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        marginTop: 4,
        ...SHADOWS.sm,
    },
    pinLabelText: {
        fontSize: 10,
        fontWeight: "600",
        color: COLORS.forest,
        maxWidth: 80,
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
        marginBottom: 12,
        overflow: "hidden",
    },
    cardAccent: {
        width: 5,
        alignSelf: "stretch",
    },
    cardContent: {
        flex: 1,
        padding: 14,
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    cardName: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.forest,
        flex: 1,
    },
    diffBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
        marginLeft: 8,
    },
    diffText: {
        fontSize: 11,
        fontWeight: "700",
    },
    cardMeta: {
        flexDirection: "row",
        gap: 14,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: COLORS.textMuted,
        fontWeight: "500",
    },
});
