import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import municipiosMaranhao from "../assets/aba-mapa/geojs-21-mun.json";

type Point = { latitude: number; longitude: number };

type MunicipioShape = {
    id: string;
    name: string;
    rings: Point[][];
};

export default function Mapa() {
    const router = useRouter();
    const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [anoSelecionado, setAnoSelecionado] = useState<number>(2025);

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Mapa do Maranhão</Text>
                {selectedMunicipio && (
                    <Text style={styles.subtitle}>{selectedMunicipio}</Text>
                )}
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
            <View style={styles.mapContainer} onLayout={handleCanvasLayout}>
                <GestureDetector gesture={composed}>
                    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                        <Svg width="100%" height="100%">
                            {projectedMunicipios.map((municipio) => (
                                <Path
                                    key={municipio.id}
                                    d={municipio.pathData}
                                    fill={
                                        selectedMunicipio === municipio.name
                                            ? "rgba(244, 216, 167, 0.65)"
                                            : "rgba(44, 95, 126, 0.30)"
                                    }
                                    stroke="#2C5F7E"
                                    strokeWidth={0.8}
                                    onPress={() => setSelectedMunicipio(municipio.name)}
                                />
                            ))}
                        </Svg>
                    </Animated.View>
                </GestureDetector>
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
        paddingTop: 60,
        paddingBottom: 20,
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
        fontSize: 32,
        fontWeight: "800",
        color: "#F4D8A7",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#F4D8A7",
        marginTop: 5,
    },
    mapContainer: {
        flex: 1,
        backgroundColor: "#ECE7DF",
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
