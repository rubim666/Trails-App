import { router } from "expo-router";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, TRILHAS_LISTA } from "../constants/index";
import type { Dificuldade } from "../constants/index";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HERO_HEIGHT = 300;
const CARD_WIDTH = SCREEN_WIDTH * 0.62;
const CARD_HEIGHT = 180;

// helpers
const difficultyColor: Record<Dificuldade, string> = {
    "Fácil": "#4CAF50",
    "Média": "#FF9800",
    "Difícil": "#F44336",
};

function StarRating({ nota }: { nota: number }) {
    const full = Math.floor(nota);
    const half = nota - full >= 0.5;
    return (
        <View style={{ flexDirection: "row", gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => {
                const name =
                    i < full ? "star" : i === full && half ? "star-half" : "star-outline";
                return (
                    <Ionicons
                        key={i}
                        name={name as any}
                        size={12}
                        color="#FFD700"
                    />
                );
            })}
            <Text style={styles.ratingText}>{nota.toFixed(1)}</Text>
        </View>
    );
}

function Skeleton({ width, height, borderRadius = 8 }: { width: number | string; height: number; borderRadius?: number }) {
    const opacity = useRef(new Animated.Value(0.4)).current;
    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);
    return (
        <Animated.View
            style={{
                width: width as any,
                height,
                borderRadius,
                backgroundColor: COLORS.tertiary,
                opacity,
            }}
        />
    );
}

function PressCard({
    onPress,
    style,
    children,
}: {
    onPress: () => void;
    style?: object;
    children: React.ReactNode;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const handleIn = () =>
        Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
    const handleOut = () =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }).start();
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleIn}
            onPressOut={handleOut}
            onPress={onPress}
        >
            <Animated.View style={[style, { transform: [{ scale }] }]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
}

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>("Todas");

    const scrollY = useRef(new Animated.Value(0)).current;

    const heroOpacity = useRef(new Animated.Value(0)).current;
    const heroSlide = useRef(new Animated.Value(24)).current;
    const cardsOpacity = useRef(new Animated.Value(0)).current;
    const cardsSlide = useRef(new Animated.Value(32)).current;
    const filtersOpacity = useRef(new Animated.Value(0)).current;
    const trailsOpacity = useRef(new Animated.Value(0)).current;
    const trailsSlide = useRef(new Animated.Value(32)).current;

    useEffect(() => {
        Animated.stagger(120, [
            Animated.parallel([
                Animated.timing(heroOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.spring(heroSlide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
            ]),
            Animated.parallel([
                Animated.timing(cardsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.spring(cardsSlide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
            ]),
            Animated.timing(filtersOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
            Animated.parallel([
                Animated.timing(trailsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.spring(trailsSlide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
            ]),
        ]).start();

        const t = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    const heroParallax = scrollY.interpolate({
        inputRange: [0, HERO_HEIGHT],
        outputRange: [0, -HERO_HEIGHT * 0.4],
        extrapolate: "clamp",
    });

    const filters: string[] = ["Todas", "Fácil", "Média", "Difícil"];
    const trails = Object.values(TRILHAS_LISTA);

    const handleFilterPress = (filter: string) => {
        setActiveFilter(filter);
    };

    const filteredTrails = activeFilter === "Todas"
        ? trails
        : trails.filter((t) => t.dificuldade === activeFilter);

    return (
        <View style={styles.root}>
            <Animated.ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                })}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero */}
                <Animated.View style={[styles.heroWrapper, { transform: [{ translateY: heroParallax }] }]}>
                    <LinearGradient
                        colors={["#2D5016", "#84B179", "#C7EABB"]}
                        locations={[0, 0.6, 1]}
                        style={styles.hero}
                    >
                        <SafeAreaView edges={["top"]} style={styles.heroSafe}>
                            <Animated.View
                                style={{
                                    opacity: heroOpacity,
                                    transform: [{ translateY: heroSlide }],
                                    alignItems: "center",
                                }}
                            >
                                <View style={styles.logoCircle}>
                                    <Ionicons name="trail-sign" size={34} color={COLORS.forest} />
                                </View>
                                <Text style={styles.heroTitle}>TrailNav</Text>
                                <Text style={styles.heroSubtitle}>
                                    Descubra trilhas e viva novas aventuras
                                </Text>
                                <View style={styles.heroBadge}>
                                    <Ionicons name="location-sharp" size={12} color={COLORS.forest} />
                                    <Text style={styles.heroBadgeText}>
                                        {trails.length} trilhas disponíveis
                                    </Text>
                                </View>
                            </Animated.View>
                        </SafeAreaView>
                    </LinearGradient>
                </Animated.View>

                <View style={styles.body}>
                    {/* Quick Action Cards */}
                    <Animated.View
                        style={{
                            opacity: cardsOpacity,
                            transform: [{ translateY: cardsSlide }],
                            flexDirection: "row",
                            gap: 12,
                            marginBottom: 28,
                        }}
                    >
                        <PressCard
                            style={styles.actionCard}
                            onPress={() => router.push("/abas/descobrir")}
                        >
                            <LinearGradient
                                colors={[COLORS.forest, COLORS.primary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.actionCardGradient}
                            >
                                <View style={styles.actionIconCircle}>
                                    <Ionicons name="map" size={22} color={COLORS.forest} />
                                </View>
                                <Text style={styles.actionCardTitle}>Explorar</Text>
                                <Text style={styles.actionCardSub}>Trilhas</Text>
                            </LinearGradient>
                        </PressCard>

                        <PressCard
                            style={styles.actionCard}
                            onPress={() => router.push("/explorar/perfil")}
                        >
                            <View style={[styles.actionCardGradient, styles.actionCardLight]}>
                                <View style={[styles.actionIconCircle, { backgroundColor: COLORS.tertiary }]}>
                                    <Ionicons name="person" size={22} color={COLORS.forest} />
                                </View>
                                <Text style={[styles.actionCardTitle, { color: COLORS.forest }]}>
                                    Minha
                                </Text>
                                <Text style={[styles.actionCardSub, { color: COLORS.textMuted }]}>
                                    Conta
                                </Text>
                            </View>
                        </PressCard>
                    </Animated.View>

                    {/* Difficulty Filters */}
                    <Animated.View style={{ opacity: filtersOpacity, marginBottom: 28 }}>
                        <Text style={styles.sectionTitle}>Filtrar por dificuldade</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
                        >
                            {filters.map((f) => {
                                const isActive = activeFilter === f;
                                const color = f === "Todas" ? COLORS.primary : (difficultyColor[f as Dificuldade] ?? COLORS.primary);
                                return isActive ? (
                                    <PressCard key={f} onPress={() => handleFilterPress(f)}>
                                        <LinearGradient
                                            colors={[COLORS.forest, color]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.chipActive}
                                        >
                                            <Text style={styles.chipActiveText}>{f}</Text>
                                        </LinearGradient>
                                    </PressCard>
                                ) : (
                                    <PressCard key={f} onPress={() => handleFilterPress(f)}>
                                        <View style={[styles.chipInactive, { borderColor: color }]}>
                                            <Text style={[styles.chipInactiveText, { color }]}>{f}</Text>
                                        </View>
                                    </PressCard>
                                );
                            })}
                        </ScrollView>
                    </Animated.View>

                    {/* Featured Trails */}
                    <Animated.View
                        style={{
                            opacity: trailsOpacity,
                            transform: [{ translateY: trailsSlide }],
                        }}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Destaques</Text>
                            <TouchableOpacity onPress={() => router.push("/abas/descobrir")}>
                                <Text style={styles.sectionLink}>Ver todas</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                            snapToInterval={CARD_WIDTH + 14}
                            contentContainerStyle={{ gap: 14, paddingRight: 24 }}
                        >
                            {isLoading
                                ? Array.from({ length: 3 }).map((_, i) => (
                                      <Skeleton key={i} width={CARD_WIDTH} height={CARD_HEIGHT} borderRadius={16} />
                                  ))
                                : filteredTrails.map((trilha) => (
                                      <PressCard
                                          key={trilha.id}
                                          style={[styles.trailCard, SHADOWS.card]}
                                          onPress={() =>
                                              router.push({
                                                  pathname: "/trilha/[id]",
                                                  params: { id: trilha.id, origem: "destaque" },
                                              })
                                          }
                                      >
                                          <LinearGradient
                                              colors={trilha.gradientColors}
                                              start={{ x: 0, y: 0 }}
                                              end={{ x: 1, y: 1 }}
                                              style={styles.trailCardGradient}
                                          >
                                              <View style={styles.trailCardTop}>
                                                  <View style={styles.diffPill}>
                                                      <Text style={styles.diffPillText}>
                                                          {trilha.dificuldade}
                                                      </Text>
                                                  </View>
                                                  <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.7)" />
                                              </View>

                                              <View style={styles.trailCardBottom}>
                                                  <Text style={styles.trailCardName} numberOfLines={1}>
                                                      {trilha.nome}
                                                  </Text>
                                                  <Text style={styles.trailCardLocal}>
                                                      {trilha.local}
                                                  </Text>
                                                  <View style={styles.trailCardMeta}>
                                                      <View style={styles.metaBadge}>
                                                          <Ionicons name="walk-outline" size={12} color={COLORS.tertiary} />
                                                          <Text style={styles.metaText}>{trilha.distancia}</Text>
                                                      </View>
                                                      <View style={styles.metaBadge}>
                                                          <Ionicons name="time-outline" size={12} color={COLORS.tertiary} />
                                                          <Text style={styles.metaText}>{trilha.duracao}</Text>
                                                      </View>
                                                  </View>
                                                  <StarRating nota={trilha.nota} />
                                              </View>
                                          </LinearGradient>
                                      </PressCard>
                                  ))}
                        </ScrollView>
                    </Animated.View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroWrapper: {
        height: HERO_HEIGHT,
        overflow: "hidden",
    },
    hero: {
        flex: 1,
    },
    heroSafe: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    logoCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: "rgba(255,255,255,0.92)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        ...SHADOWS.card,
    },
    heroTitle: {
        fontSize: 34,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    heroSubtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
        textAlign: "center",
        marginBottom: 14,
        lineHeight: 20,
    },
    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "rgba(255,255,255,0.92)",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    heroBadgeText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.forest,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    actionCard: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
        ...SHADOWS.card,
    },
    actionCardGradient: {
        padding: 18,
        borderRadius: 16,
        justifyContent: "flex-end",
        minHeight: 130,
    },
    actionCardLight: {
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.tertiary,
    },
    actionIconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    actionCardTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
        lineHeight: 20,
    },
    actionCardSub: {
        fontSize: 13,
        color: "rgba(255,255,255,0.75)",
        fontWeight: "500",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 12,
    },
    sectionLink: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.primary,
        marginBottom: 12,
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
    trailCard: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: "hidden",
    },
    trailCardGradient: {
        flex: 1,
        padding: 14,
        justifyContent: "space-between",
    },
    trailCardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    diffPill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    diffPillText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    trailCardBottom: {
        gap: 3,
    },
    trailCardName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    trailCardLocal: {
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
        marginBottom: 4,
    },
    trailCardMeta: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 4,
    },
    metaBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    metaText: {
        fontSize: 11,
        color: COLORS.tertiary,
        fontWeight: "500",
    },
    ratingText: {
        fontSize: 11,
        color: "#FFD700",
        fontWeight: "600",
        marginLeft: 2,
    },
});

export default HomeScreen;