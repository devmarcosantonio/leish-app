import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { Award, HelpCircle, LogOut, Map, Phone, Search, Shield, Trophy } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();
    const [quizScore, setQuizScore] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            carregarPontuacao();
        }, [])
    );

    const carregarPontuacao = async () => {
        try {
            const pontuacao = await SecureStore.getItemAsync("quizBestScore");
            setQuizScore(pontuacao ? parseInt(pontuacao) : null);
        } catch (error) {
            console.error('Erro ao carregar pontuação:', error);
        }
    };

    const featuredItems = [
        { id: 1, title: "O QUE É?", subtitle: "Conheça a doença", Icon: HelpCircle, color: "#5B8BA3", route: "o-que-e" },
        { id: 2, title: "COMO IDENTIFICAR", subtitle: "Sintomas e diagnóstico", Icon: Search, color: "#D47254", route: "como-identificar" },
        { id: 3, title: "PREVENÇÃO", subtitle: "Proteja-se", Icon: Shield, color: "#8B6B47", route: "prevencao" },
    ];

    const quickAccessItems = [
        { id: 4, title: "Mapa", Icon: Map, color: "#2C5F7E", route: "mapa" },
        { id: 5, title: "Quiz", Icon: Award, color: "#B87A5F", route: "quiz" },
        { id: 6, title: "Contatos", Icon: Phone, color: "#E8A55C", route: "contatos" },
    ];

    const handlePress = (route: string) => {
        router.push(route as any);
    };

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('userName');
            router.replace("/login");
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.title}>E-LEISH</Text>
                        <Text style={styles.subtitle}>Informações sobre Leishmaniose</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                        activeOpacity={0.7}
                    >
                        <LogOut size={22} color="#F4D8A7" strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Featured Cards */}
                    <Text style={styles.sectionTitle}>Principais Informações</Text>
                    <View style={styles.featuredGrid}>
                        {featuredItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.featuredCard, { backgroundColor: item.color }]}
                                onPress={() => handlePress(item.route)}
                                activeOpacity={0.85}
                            >
                                <View style={styles.featuredIconContainer}>
                                    <item.Icon size={36} color="#FFFFFF" strokeWidth={2.5} />
                                </View>
                                <Text style={styles.featuredTitle}>{item.title}</Text>
                                <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Quiz Card Destacado */}
                    <TouchableOpacity
                        style={styles.quizBanner}
                        onPress={() => handlePress("quiz")}
                        activeOpacity={0.85}
                    >
                        <View style={styles.quizBannerContent}>
                            <View style={styles.quizIconWrapper}>
                                <Trophy size={40} color="#F4D8A7" strokeWidth={2.5} />
                            </View>
                            <View style={styles.quizInfo}>
                                <Text style={styles.quizTitle}>
                                    {quizScore === null ? "🎮 Desafio Quiz" : "🏆 Seu Recorde"}
                                </Text>
                                <Text style={styles.quizDescription}>
                                    {quizScore === null
                                        ? "Teste seus conhecimentos!"
                                        : `${quizScore}/10 pontos - Jogue novamente!`}
                                </Text>
                            </View>
                            {quizScore !== null && (
                                <View style={styles.quizScoreBadge}>
                                    <Text style={styles.quizScoreText}>{quizScore}</Text>
                                    <Text style={styles.quizScoreMax}>/10</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.quizProgressBar}>
                            <View
                                style={[
                                    styles.quizProgressFill,
                                    { width: `${quizScore ? (quizScore / 10) * 100 : 0}%` },
                                ]}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Quick Access */}
                    <Text style={styles.sectionTitle}>Acesso Rápido</Text>
                    <View style={styles.quickAccessGrid}>
                        {quickAccessItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.quickAccessCard,
                                    item.title === "Contatos" && styles.quickAccessCardFull,
                                ]}
                                onPress={() => handlePress(item.route)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.quickIconBg, { backgroundColor: item.color + "20" }]}>
                                    <item.Icon size={28} color={item.color} strokeWidth={2.5} />
                                </View>
                                <Text style={styles.quickAccessText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    logoutButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(244, 216, 167, 0.15)",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "800",
        color: "#F4D8A7",
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: "#E8DCC8",
        fontWeight: "400",
        opacity: 0.95,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingTop: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    featuredGrid: {
        gap: 16,
        marginBottom: 32,
    },
    featuredCard: {
        borderRadius: 24,
        padding: 24,
        minHeight: 140,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    featuredIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    featuredTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 4,
        letterSpacing: 0.3,
    },
    featuredSubtitle: {
        fontSize: 14,
        color: "#FFFFFF",
        opacity: 0.9,
        fontWeight: "500",
    },
    quickAccessGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    quickAccessCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        width: "48%",
        alignItems: "center",
        shadowColor: "#2C5F7E",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        minHeight: 120,
        justifyContent: "center",
    },
    quickAccessCardFull: {
        width: "100%",
    },
    quickIconBg: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    quickAccessText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2C5F7E",
        textAlign: "center",
    },
    quizBanner: {
        backgroundColor: "#2C5F7E",
        borderRadius: 20,
        padding: 20,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        overflow: "hidden",
    },
    quizBannerContent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    quizIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: "rgba(244, 216, 167, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    quizInfo: {
        flex: 1,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#F4D8A7",
        marginBottom: 4,
    },
    quizDescription: {
        fontSize: 14,
        color: "#E8DCC8",
        fontWeight: "500",
    },
    quizScoreBadge: {
        backgroundColor: "#F4D8A7",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        minWidth: 60,
    },
    quizScoreText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#2C5F7E",
        lineHeight: 28,
    },
    quizScoreMax: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2C5F7E",
        opacity: 0.7,
    },
    quizProgressBar: {
        height: 6,
        backgroundColor: "rgba(244, 216, 167, 0.2)",
        borderRadius: 3,
        overflow: "hidden",
    },
    quizProgressFill: {
        height: "100%",
        backgroundColor: "#F4D8A7",
        borderRadius: 3,
    },
});
