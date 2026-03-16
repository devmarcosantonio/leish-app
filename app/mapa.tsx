import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import dadosPorMunicipio from "../assets/aba-mapa/dados_por_municipio.json";
import municipiosMaranhao from "../assets/aba-mapa/geojs-21-mun.json";

type Point = { latitude: number; longitude: number };

type MunicipioShape = {
    id: string;
    name: string;
    rings: Point[][];
};

type DoencaData = {
    CASOS: number;
    POPULACAO: number;
    INCIDENCIA: number;
    ESCALA: string;
};

type AnoData = {
    Tegumentar: DoencaData;
    Viceral: DoencaData;
};

type MunicipioData = {
    NOME_MUNICIPIO: string;
    [year: string]: AnoData | string;
};

type IncidenciaTipo = "Tegumentar" | "Viceral";

export default function Mapa() {
    const router = useRouter();
    const [selectedMunicipioId, setSelectedMunicipioId] = useState<string | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [anoSelecionado, setAnoSelecionado] = useState<number>(2025);
    const [incidenciaTipo, setIncidenciaTipo] = useState<IncidenciaTipo>("Tegumentar");

    const anos = [2021, 2022, 2023, 2024, 2025];

    // Zoom + pan
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = Math.max(1, Math.min(10, savedScale.value * e.scale));
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = savedTranslateX.value + e.translationX;
            translateY.value = savedTranslateY.value + e.translationY;
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        });

    const composed = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    const municipios = useMemo<MunicipioShape[]>(() => {
        return municipiosMaranhao.features
            .map((feature: any) => {
                const geometry = feature.geometry;
                const rings: Point[][] = [];

                if (geometry.type === "Polygon") {
                    geometry.coordinates.forEach((ring: number[][]) => {
                        rings.push(
                            ring.map((coord) => ({
                                latitude: coord[1],
                                longitude: coord[0],
                            }))
                        );
                    });
                }

                if (geometry.type === "MultiPolygon") {
                    geometry.coordinates.forEach((polygon: number[][][]) => {
                        polygon.forEach((ring) => {
                            rings.push(
                                ring.map((coord) => ({
                                    latitude: coord[1],
                                    longitude: coord[0],
                                }))
                            );
                        });
                    });
                }

                return {
                    id: String(feature.properties.id),
                    name: String(feature.properties.name),
                    rings,
                };
            })
            .filter((municipio) => municipio.rings.length > 0);
    }, []);

    const dadosMunicipios = dadosPorMunicipio as Record<string, MunicipioData>;

    const municipioSelecionado = useMemo(() => {
        if (!selectedMunicipioId) {
            return null;
        }

        const municipioData = dadosMunicipios[selectedMunicipioId];
        if (!municipioData) {
            return {
                id: selectedMunicipioId,
                nome: "Municipio nao encontrado",
                anoData: null,
            };
        }

        const anoKey = String(anoSelecionado);
        const anoData = municipioData[anoKey] as AnoData | undefined;

        return {
            id: selectedMunicipioId,
            nome: municipioData.NOME_MUNICIPIO,
            anoData: anoData ?? null,
        };
    }, [anoSelecionado, dadosMunicipios, selectedMunicipioId]);

    const escalaPorMunicipio = useMemo(() => {
        const anoKey = String(anoSelecionado);
        const escalaMap = new Map<string, string>();

        municipios.forEach((municipio) => {
            const municipioData = dadosMunicipios[municipio.id];
            if (!municipioData) {
                return;
            }

            const anoData = municipioData[anoKey] as AnoData | undefined;
            const escala = anoData?.[incidenciaTipo]?.ESCALA;
            if (escala) {
                escalaMap.set(municipio.id, escala);
            }
        });

        return escalaMap;
    }, [anoSelecionado, dadosMunicipios, incidenciaTipo, municipios]);

    const bounds = useMemo(() => {
        let minLat = Infinity;
        let maxLat = -Infinity;
        let minLng = Infinity;
        let maxLng = -Infinity;

        municipios.forEach((municipio) => {
            municipio.rings.forEach((ring) => {
                ring.forEach((coord) => {
                    const lat = coord.latitude;
                    const lng = coord.longitude;

                    if (lat < minLat) minLat = lat;
                    if (lat > maxLat) maxLat = lat;
                    if (lng < minLng) minLng = lng;
                    if (lng > maxLng) maxLng = lng;
                });
            });
        });

        return {
            minLat,
            maxLat,
            minLng,
            maxLng,
        };
    }, [municipios]);

    const projectedMunicipios = useMemo(() => {
        if (canvasSize.width === 0 || canvasSize.height === 0) {
            return [];
        }

        const lonRange = Math.max(bounds.maxLng - bounds.minLng, 0.0001);
        const latRange = Math.max(bounds.maxLat - bounds.minLat, 0.0001);
        const padding = 12;
        const safeWidth = Math.max(canvasSize.width - padding * 2, 1);
        const safeHeight = Math.max(canvasSize.height - padding * 2, 1);

        const scale = Math.min(safeWidth / lonRange, safeHeight / latRange);
        const contentWidth = lonRange * scale;
        const contentHeight = latRange * scale;
        const offsetX = (canvasSize.width - contentWidth) / 2;
        const offsetY = (canvasSize.height - contentHeight) / 2;

        const projectPoint = (point: Point) => {
            const x = offsetX + (point.longitude - bounds.minLng) * scale;
            const y = offsetY + (bounds.maxLat - point.latitude) * scale;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        };

        return municipios.map((municipio) => {
            const pathData = municipio.rings
                .map((ring) => {
                    if (ring.length === 0) {
                        return "";
                    }

                    const segments = ring.map(projectPoint);
                    const [first, ...rest] = segments;
                    const lines = rest.map((segment) => `L${segment}`).join(" ");
                    return `M${first} ${lines} Z`;
                })
                .filter(Boolean)
                .join(" ");

            return {
                id: municipio.id,
                name: municipio.name,
                pathData,
            };
        });
    }, [bounds.maxLat, bounds.maxLng, bounds.minLat, bounds.minLng, canvasSize.height, canvasSize.width, municipios]);

    const handleCanvasLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setCanvasSize({ width, height });
    };

    const getEscalaColor = (escala?: string) => {
        if (!escala) {
            return "#D8D3CA";
        }

        const escalaNormalizada = escala.toLowerCase();
        if (escalaNormalizada === "baixa") return "#86BBD8";
        if (escalaNormalizada === "media") return "#F4D8A7";
        if (escalaNormalizada === "alta") return "#E38B4F";
        if (escalaNormalizada === "muito alta") return "#C85B5B";
        return "#D8D3CA";
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Mapa do Maranhão</Text>
            </View>
            <View style={styles.yearSelector}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.yearScrollContent}>
                    {anos.map((ano) => (
                        <TouchableOpacity
                            key={ano}
                            style={[
                                styles.yearPill,
                                anoSelecionado === ano && styles.yearPillActive,
                            ]}
                            onPress={() => setAnoSelecionado(ano)}
                        >
                            <Text style={[
                                styles.yearPillText,
                                anoSelecionado === ano && styles.yearPillTextActive,
                            ]}>
                                {ano}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.typeSelector}>
                {(["Tegumentar", "Viceral"] as IncidenciaTipo[]).map((tipo) => (
                    <TouchableOpacity
                        key={tipo}
                        style={[
                            styles.typePill,
                            incidenciaTipo === tipo && styles.typePillActive,
                        ]}
                        onPress={() => setIncidenciaTipo(tipo)}
                    >
                        <Text style={[
                            styles.typePillText,
                            incidenciaTipo === tipo && styles.typePillTextActive,
                        ]}>
                            {tipo}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.mapContainer} onLayout={handleCanvasLayout}>
                <GestureDetector gesture={composed}>
                    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                        <Svg width="100%" height="100%">
                            {projectedMunicipios.map((municipio) => (
                                <Path
                                    key={municipio.id}
                                    d={municipio.pathData}
                                    fill={
                                        selectedMunicipioId === municipio.id
                                            ? "white"
                                            : getEscalaColor(escalaPorMunicipio.get(municipio.id))
                                    }
                                    stroke={selectedMunicipioId === municipio.id ? "#1C1C1C" : "#2C5F7E"}
                                    strokeWidth={selectedMunicipioId === municipio.id ? 2.6 : 0.8}
                                    onPress={() => setSelectedMunicipioId(municipio.id)}
                                />
                            ))}
                        </Svg>
                    </Animated.View>
                </GestureDetector>
                <View style={styles.legendContainer}>
                    <Text style={styles.legendTitle}>Legenda</Text>
                    <View style={styles.legendRow}>
                        <View style={[styles.legendSwatch, { backgroundColor: "#86BBD8" }]} />
                        <Text style={styles.legendLabel}>Baixa</Text>
                    </View>
                    <View style={styles.legendRow}>
                        <View style={[styles.legendSwatch, { backgroundColor: "#F4D8A7" }]} />
                        <Text style={styles.legendLabel}>Media</Text>
                    </View>
                    <View style={styles.legendRow}>
                        <View style={[styles.legendSwatch, { backgroundColor: "#E38B4F" }]} />
                        <Text style={styles.legendLabel}>Alta</Text>
                    </View>
                    <View style={styles.legendRow}>
                        <View style={[styles.legendSwatch, { backgroundColor: "#C85B5B" }]} />
                        <Text style={styles.legendLabel}>Muito alta</Text>
                    </View>
                </View>
            </View>
            <View style={styles.infoPanel}>
                {!municipioSelecionado && (
                    <Text style={styles.infoHint}>Selecione um municipio para ver os dados.</Text>
                )}
                {municipioSelecionado && (
                    <View style={styles.infoContent}>
                        <View style={styles.infoHeaderRow}>
                            <Text style={styles.infoTitle}>{municipioSelecionado.nome}</Text>
                            <Text style={styles.infoYear}>Ano {anoSelecionado}</Text>
                        </View>
                        {municipioSelecionado.anoData ? (
                            <View style={styles.infoGrid}>
                                <View style={styles.infoCard}>
                                    <Text style={styles.infoCardTitle}>Tegumentar</Text>
                                    <Text style={styles.infoLine}>Casos: {municipioSelecionado.anoData.Tegumentar.CASOS}</Text>
                                    <Text style={styles.infoLine}>Populacao: {municipioSelecionado.anoData.Tegumentar.POPULACAO}</Text>
                                    <Text style={styles.infoLine}>Incidencia: {municipioSelecionado.anoData.Tegumentar.INCIDENCIA}</Text>
                                    <Text style={styles.infoBadge}>{municipioSelecionado.anoData.Tegumentar.ESCALA}</Text>
                                </View>
                                <View style={styles.infoCard}>
                                    <Text style={styles.infoCardTitle}>Viceral</Text>
                                    <Text style={styles.infoLine}>Casos: {municipioSelecionado.anoData.Viceral.CASOS}</Text>
                                    <Text style={styles.infoLine}>Populacao: {municipioSelecionado.anoData.Viceral.POPULACAO}</Text>
                                    <Text style={styles.infoLine}>Incidencia: {municipioSelecionado.anoData.Viceral.INCIDENCIA}</Text>
                                    <Text style={styles.infoBadge}>{municipioSelecionado.anoData.Viceral.ESCALA}</Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={styles.infoHint}>Sem dados para este ano.</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F2ED",
    },
    header: {
        backgroundColor: "#2C5F7E",
        paddingTop: 44,
        paddingBottom: 14,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    backText: {
        color: "#F4D8A7",
        fontSize: 16,
        fontWeight: "600",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#F4D8A7",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#F4D8A7",
        marginTop: 5,
    },
    mapContainer: {
        flex: 1,
        backgroundColor: "#ECE7DF",
        overflow: "hidden",
    },
    typeSelector: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#F5F2ED",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD9D3",
    },
    typePill: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: "#2C5F7E",
        backgroundColor: "transparent",
    },
    typePillActive: {
        backgroundColor: "#2C5F7E",
    },
    typePillText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2C5F7E",
    },
    typePillTextActive: {
        color: "#F4D8A7",
    },
    legendContainer: {
        position: "absolute",
        right: 14,
        top: 14,
        backgroundColor: "rgba(253, 251, 247, 0.92)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#E0DBD3",
        gap: 6,
    },
    legendTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 2,
    },
    legendRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    legendSwatch: {
        width: 12,
        height: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#C8C2BA",
    },
    legendLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#4B5862",
    },
    infoPanel: {
        backgroundColor: "#FDFBF7",
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 18,
        borderTopWidth: 1,
        borderTopColor: "#DDD9D3",
    },
    infoContent: {
        gap: 12,
    },
    infoHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
    },
    infoYear: {
        fontSize: 14,
        fontWeight: "700",
        color: "#6B7B86",
    },
    infoHint: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7B86",
        textAlign: "center",
        paddingVertical: 8,
    },
    infoGrid: {
        flexDirection: "row",
        gap: 12,
    },
    infoCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#E6E1DA",
    },
    infoCardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 6,
    },
    infoLine: {
        fontSize: 12,
        fontWeight: "600",
        color: "#4B5862",
        marginBottom: 2,
    },
    infoBadge: {
        marginTop: 6,
        alignSelf: "flex-start",
        backgroundColor: "#F4D8A7",
        color: "#2C5F7E",
        fontSize: 11,
        fontWeight: "700",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        overflow: "hidden",
    },
    yearSelector: {
        backgroundColor: "#F5F2ED",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD9D3",
    },
    yearScrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    yearPill: {
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#2C5F7E",
        backgroundColor: "transparent",
    },
    yearPillActive: {
        backgroundColor: "#2C5F7E",
    },
    yearPillText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2C5F7E",
    },
    yearPillTextActive: {
        color: "#F4D8A7",
    },
});
