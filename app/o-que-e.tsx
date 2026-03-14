import { useRouter } from "expo-router";
import { Activity, AlertCircle, ArrowLeft, Heart, Shield } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OQueE() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <ArrowLeft size={24} color="#F4D8A7" strokeWidth={2.5} />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>O que é Leishmaniose?</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Intro */}
                    <View style={styles.introCard}>
                        <Text style={styles.introTitle}>Descubra o Universo da Leishmaniose!</Text>
                        <Text style={styles.introText}>
                            Você já ouviu falar sobre leishmaniose? Essa é uma doença infecciosa causada por parasitas do gênero <Text style={styles.bold}>Leishmania</Text>, transmitidos pela picada do mosquito-palha (<Text style={styles.italic}>Lutzomyia</Text>).
                        </Text>
                        <Text style={styles.introText}>
                            Apesar de ser negligenciada, a leishmaniose afeta milhares de pessoas e animais anualmente. Vamos entender melhor essa doença e como nos proteger?
                        </Text>
                    </View>

                    {/* LTA */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <AlertCircle size={24} color="#D47254" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>1. Leishmaniose Tegumentar Americana (LTA)</Text>
                        </View>

                        <Text style={styles.sectionDescription}>
                            Afeta pele e mucosas. Causada por diferentes espécies de Leishmania, como <Text style={styles.italic}>L. braziliensis</Text>, <Text style={styles.italic}>L. guyanensis</Text> e <Text style={styles.italic}>L. amazonensis</Text>.
                        </Text>

                        <Text style={styles.subsectionTitle}>Formas principais:</Text>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>• Cutânea Localizada (LCL)</Text>
                            <Text style={styles.cardText}>Feridas na pele, geralmente únicas ou múltiplas.</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>• Cutânea Difusa (LCD)</Text>
                            <Text style={styles.cardText}>Múltiplos nódulos na pele, sem tendência à cicatrização.</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>• Cutânea Disseminada (LCDi)</Text>
                            <Text style={styles.cardText}>Várias lesões ulceradas espalhadas pelo corpo.</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>• Mucosa (LM)</Text>
                            <Text style={styles.cardText}>Acomete nariz, boca e garganta, podendo causar deformações.</Text>
                        </View>
                    </View>

                    {/* LV */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <Heart size={24} color="#C24229" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>2. Leishmaniose Visceral (LV) – Calazar</Text>
                        </View>

                        <Text style={styles.sectionDescription}>
                            Forma mais grave, atingindo órgãos internos como fígado, baço e medula óssea. Causada por <Text style={styles.italic}>Leishmania infantum</Text> (<Text style={styles.italic}>L. chagasi</Text>).
                        </Text>

                        <Text style={styles.subsectionTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomCard}>
                            <Text style={styles.symptomText}>• Febre prolongada</Text>
                            <Text style={styles.symptomText}>• Perda de peso intensa</Text>
                            <Text style={styles.symptomText}>• Inchaço do baço e fígado</Text>
                            <Text style={styles.symptomText}>• Palidez e fraqueza</Text>
                        </View>
                    </View>

                    {/* Transmissão */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <Activity size={24} color="#5B8BA3" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>Como ocorre a transmissão?</Text>
                        </View>

                        <Text style={styles.sectionDescription}>
                            A leishmaniose é transmitida pela picada das fêmeas do mosquito-palha, insetos pertencentes ao grupo dos flebotomíneos. Esses mosquitos se infectam ao picar animais que já carregam o protozoário Leishmania, como cães, raposas e roedores silvestres.
                        </Text>

                        <View style={styles.alertBox}>
                            <Text style={styles.alertTitle}>Importante:</Text>
                            <Text style={styles.alertText}>
                                A leishmaniose não é transmitida diretamente de uma pessoa para outra e nem pelo contato com animais infectados. Apenas a picada do mosquito infectado pode transmitir a doença.
                            </Text>
                        </View>
                    </View>



                    {/* Ciclo da Doença */}
                    <View style={styles.section}>
                        <Text style={styles.subsectionTitle}>Ciclo da Doença</Text>

                        <Text style={styles.sectionDescription}>
                            A leishmaniose se espalha por meio da interação entre o mosquito transmissor, os animais reservatórios e os seres humanos, formando um ciclo contínuo de transmissão.
                        </Text>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>🦟 MOSQUITO-PALHA</Text>
                            <Text style={styles.cardText}>
                                Inseto pequeno, de cor clara e aspecto aveludado. Costuma ficar parado com as asas levantadas e vive em locais úmidos, sombreados e com matéria orgânica.
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>💉 TRANSMISSÃO</Text>
                            <Text style={styles.cardText}>
                                A infecção acontece quando a fêmea do mosquito-palha, já contaminada, pica um animal ou uma pessoa saudável, liberando o parasita durante a alimentação sanguínea.
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>🐕 RESERVATÓRIO</Text>
                            <Text style={styles.cardText}>
                                O cão infectado não transmite diretamente a doença para outros animais ou para humanos. Ele atua como hospedeiro do parasita, permitindo que o mosquito adquira a infecção ao sugar seu sangue.
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>⚠️ RISCO</Text>
                            <Text style={styles.cardText}>
                                Pessoas que vivem próximas a áreas com grande presença de cães infectados e alta circulação do mosquito-palha apresentam maior chance de exposição ao parasita.
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>⚡ ATENÇÃO</Text>
                            <Text style={styles.cardText}>
                                Indivíduos com imunidade baixa são mais vulneráveis às formas graves da doença. Quando não tratada corretamente, a leishmaniose pode levar a complicações sérias e até ao óbito.
                            </Text>
                        </View>


                    </View>

                    <View style={{ backgroundColor: "#dbe8fa", overflow: "hidden", borderRadius: 12, marginTop: 12 }}>
                        <Image
                            source={require("../assets/images/aba-oque-e/2.png")}
                            style={{ width: "100%", height: 650, marginTop: -150, marginBottom: -150 }}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={{ backgroundColor: "#dbe8fa", overflow: "hidden", borderRadius: 12, marginTop: 12 }}>
                        <Image
                            source={require("../assets/images/aba-oque-e/3.png")}
                            style={{ width: "100%", height: 550, marginTop: -150, marginBottom: -200 }}
                            resizeMode="cover"
                        />
                    </View>


                    {/* Fatores de Risco */}
                    <View style={styles.section}>
                        <Text style={styles.subsectionTitle}>Fatores de risco para a transmissão:</Text>

                        <View style={styles.riskCard}>
                            <Text style={styles.riskText}>
                                ✓ Ambientes com muita vegetação e matéria orgânica acumulada (folhas, fezes e restos de madeira)
                            </Text>
                        </View>

                        <View style={styles.riskCard}>
                            <Text style={styles.riskText}>
                                ✓ Presença de cães infectados, pois eles podem atuar como reservatórios da doença
                            </Text>
                        </View>

                        <View style={styles.riskCard}>
                            <Text style={styles.riskText}>
                                ✓ Áreas urbanas e rurais com baixa higiene ambiental
                            </Text>
                        </View>
                    </View>

                    {/* Link para Prevenção */}
                    <TouchableOpacity
                        style={styles.preventionLink}
                        onPress={() => router.push("/prevencao")}
                        activeOpacity={0.8}
                    >
                        <Shield size={28} color="#15803D" strokeWidth={2.5} />
                        <View style={styles.linkTextContainer}>
                            <Text style={styles.linkTitle}>Sabe como prevenir?</Text>
                            <Text style={styles.linkSubtitle}>Veja dicas de prevenção e proteção</Text>
                        </View>
                        <ArrowLeft size={24} color="#15803D" strokeWidth={2.5} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>

                    <View style={styles.bottomPadding} />
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
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 8,
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
        lineHeight: 34,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    introCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: "#2C5F7E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#5B8BA3",
    },
    introTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 16,
        lineHeight: 28,
    },
    introText: {
        fontSize: 15,
        color: "#4A5568",
        lineHeight: 24,
        marginBottom: 12,
    },
    bold: {
        fontWeight: "700",
        color: "#2C5F7E",
    },
    italic: {
        fontStyle: "italic",
        color: "#5B8BA3",
    },
    section: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 12,
    },
    iconBadge: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
        lineHeight: 24,
    },
    sectionDescription: {
        fontSize: 15,
        color: "#4A5568",
        lineHeight: 24,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    subsectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 12,
        marginTop: 8,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#2C5F7E",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderLeftWidth: 3,
        borderLeftColor: "#E8A55C",
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 6,
    },
    cardText: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 20,
    },
    symptomCard: {
        backgroundColor: "#FFF5F5",
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: "#FED7D7",
    },
    symptomText: {
        fontSize: 15,
        color: "#C24229",
        lineHeight: 26,
        fontWeight: "600",
    },
    alertBox: {
        backgroundColor: "#FEF3C7",
        borderRadius: 16,
        padding: 18,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#FCD34D",
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#92400E",
        marginBottom: 8,
    },
    alertText: {
        fontSize: 14,
        color: "#78350F",
        lineHeight: 22,
    },
    riskCard: {
        backgroundColor: "#F0F9FF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: "#5B8BA3",
    },
    riskText: {
        fontSize: 14,
        color: "#1E40AF",
        lineHeight: 22,
    },
    preventionLink: {
        backgroundColor: "#DCFCE7",
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        gap: 14,
        shadowColor: "#15803D",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 2,
        borderColor: "#86EFAC",
    },
    linkTextContainer: {
        flex: 1,
    },
    linkTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#15803D",
        marginBottom: 4,
    },
    linkSubtitle: {
        fontSize: 14,
        color: "#166534",
        fontWeight: "500",
    },
    bottomPadding: {
        height: 40,
    },
});
