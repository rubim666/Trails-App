import { useState, useRef, useEffect } from "react";
import {
    View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
    Animated, Dimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SHADOWS, TRILHAS_LISTA } from "@/constants";
import type { Dificuldade } from "@/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const difficultyColor: Record<Dificuldade, string> = {
    "Fácil": "#4CAF50",
    "Média": "#FF9800",
    "Difícil": "#F44336",
};

function StarRating({ nota }: { nota: number }) {
    const full = Math.floor(nota);
    const half = nota - full >= 0.5;
    return (
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            {Array.from({ length: 5 }).map((_, i) => {
                const name =
                    i < full ? "star" : i === full && half ? "star-half" : "star-outline";
                return <Ionicons key={i} name={name as any} size={13} color="#FFD700" />;
            })}
            <Text style={{ fontSize: 12, color: "#FFD700", fontWeight: "600", marginLeft: 3 }}>
                {nota.toFixed(1)}
            </Text>
        </View>
    );
}

export default function Descobrir() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<string>("Todas");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
        ]).start();
    }, []);

    const filters = ["Todas", "Fácil", "Média", "Difícil"];
    const trails = Object.values(TRILHAS_LISTA).filter((t) => {
        const matchFilter = activeFilter === "Todas" || t.dificuldade === activeFilter;
        const matchSearch =
            search.trim() === "" ||
            t.nome.toLowerCase().includes(search.toLowerCase()) ||
            t.local.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="compass" size={28} color={COLORS.forest} />
                    </View>
                    <View>
                        <Text style={styles.title}>Descobrir</Text>
                        <Text style={styles.subtitle}>Encontre sua próxima aventura</Text>
                    </View>
                </View>

                <View style={[styles.searchBar, SHADOWS.sm]}>
                    <Ionicons name="search" size={20} color={COLORS.textMuted} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar trilhas..."
                        placeholderTextColor={COLORS.textMuted}
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipRow}
                >
                    {filters.map((f) => {
                        const isActive = activeFilter === f;
                        const color =
                            f === "Todas"
                                ? COLORS.primary
                                : (difficultyColor[f as Dificuldade] ?? COLORS.primary);
                        return isActive ? (
                            <TouchableOpacity key={f} activeOpacity={0.8} onPress={() => setActiveFilter(f)}>
                                <LinearGradient
                                    colors={[COLORS.forest, color]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.chipActive}
                                >
                                    <Text style={styles.chipActiveText}>{f}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                key={f}
                                activeOpacity={0.7}
                                onPress={() => setActiveFilter(f)}
                                style={[styles.chipInactive, { borderColor: color }]}
                            >
                                <Text style={[styles.chipInactiveText, { color }]}>{f}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <Text style={styles.resultCount}>
                    {trails.length} {trails.length === 1 ? "trilha encontrada" : "trilhas encontradas"}
                </Text>

                {trails.map((trilha) => (
                    <TouchableOpacity
                        key={trilha.id}
                        style={[styles.card, SHADOWS.card]}
                        activeOpacity={0.85}
                        onPress={() =>
                            router.push({
                                pathname: "/trilha/[id]",
                                params: { id: trilha.id, origem: "descobrir" },
                            })
                        }
                    >
                        <LinearGradient
                            colors={trilha.gradientColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.cardImage}
                        >
                            <View style={styles.cardDiffBadge}>
                                <Text style={styles.cardDiffText}>{trilha.dificuldade}</Text>
                            </View>
                            <Ionicons
                                name="trail-sign"
                                size={32}
                                color="rgba(255,255,255,0.25)"
                            />
                        </LinearGradient>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardName}>{trilha.nome}</Text>
                            <View style={styles.cardLocationRow}>
                                <Ionicons name="location-outline" size={13} color={COLORS.textMuted} />
                                <Text style={styles.cardLocation}>{trilha.local}</Text>
                            </View>
                            <View style={styles.cardMetaRow}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="walk-outline" size={13} color={COLORS.primary} />
                                    <Text style={styles.metaText}>{trilha.distancia}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <Ionicons name="time-outline" size={13} color={COLORS.primary} />
                                    <Text style={styles.metaText}>{trilha.duracao}</Text>
                                </View>
                            </View>
                            <StarRating nota={trilha.nota} />
                        </View>
                    </TouchableOpacity>
                ))}

                {trails.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="leaf-outline" size={48} color={COLORS.tertiary} />
                        <Text style={styles.emptyTitle}>Nenhuma trilha encontrada</Text>
                        <Text style={styles.emptySubtitle}>Tente ajustar os filtros</Text>
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
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 16,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        paddingVertical: 0,
    },
    chipRow: {
        gap: 10,
        paddingVertical: 4,
        marginBottom: 20,
    },
    chipActive: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 24,
    },
    chipActiveText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },
    chipInactive: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 24,
        borderWidth: 1.5,
        backgroundColor: "transparent",
    },
    chipInactiveText: {
        fontWeight: "600",
        fontSize: 13,
    },
    resultCount: {
        fontSize: 13,
        color: COLORS.textMuted,
        fontWeight: "500",
        marginBottom: 14,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 14,
    },
    cardImage: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 12,
    },
    cardDiffBadge: {
        backgroundColor: "rgba(255,255,255,0.22)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    cardDiffText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    cardBody: {
        padding: 14,
        gap: 6,
    },
    cardName: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.forest,
    },
    cardLocationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    cardLocation: {
        fontSize: 12,
        color: COLORS.textMuted,
        fontWeight: "500",
    },
    cardMetaRow: {
        flexDirection: "row",
        gap: 16,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: COLORS.text,
        fontWeight: "500",
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
});