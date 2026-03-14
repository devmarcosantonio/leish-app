import { useRouter } from "expo-router";
import { AlertTriangle, ArrowLeft, Bug, Dog, Grid, MapPin, Shield, Shirt, SprayCan, Trash2 } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Prevencao() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <ArrowLeft size={24} color="#F4D8A7" strokeWidth={2.5} />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Prevenção da Leishmaniose</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Intro */}
                    <View style={styles.introCard}>
                        <Text style={styles.introTitle}>Controle e Prevenção do Mosquito-Palha</Text>
                        <Text style={styles.introText}>
                            O mosquito-palha (<Text style={styles.italic}>Lutzomyia spp.</Text>), transmissor da leishmaniose, se prolifera em ambientes úmidos e ricos em matéria orgânica.
                        </Text>
                        <Text style={styles.introText}>
                            Controlar sua população e adotar medidas de proteção são essenciais para reduzir os riscos de transmissão.
                        </Text>
                        <View style={{ overflow: "hidden", borderRadius: 12, marginTop: 12, marginBottom: 24 }}>
                            <Image
                                source={require("../assets/images/aba-prevencao/10.png")}
                                style={{ width: "100%", height: 600, marginTop: -240, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>




                    {/* Controle do Mosquito */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <Bug size={26} color="#8B6B47" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>Como Controlar o Mosquito-Palha?</Text>
                        </View>

                        {/* Eliminação de Criadouros */}
                        <View style={styles.preventionCard}>
                            <View style={styles.cardHeader}>
                                <Trash2 size={22} color="#D47254" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Eliminação de Criadouros</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                O mosquito deposita seus ovos em locais com matéria orgânica acumulada. Para evitar sua proliferação:
                            </Text>
                            <View style={styles.tipBox}>
                                <Text style={styles.tipText}>✓ Mantenha quintais e terrenos limpos e secos</Text>
                            </View>
                            <View style={styles.tipBox}>
                                <Text style={styles.tipText}>✓ Evite o acúmulo de folhas secas, fezes de animais e lixo orgânico</Text>
                            </View>
                            <View style={styles.tipBox}>
                                <Text style={styles.tipText}>✓ Remova entulhos e restos de madeira, que podem servir de abrigo</Text>
                            </View>

                            <View style={{ borderRadius: 12, marginTop: 12, marginBottom: 12 }}>
                                <Image
                                    source={require("../assets/images/aba-prevencao/11.png")}
                                    style={{ width: "100%", height: 520, marginTop: -150, marginBottom: -200 }}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>





                        {/* Uso de Inseticidas */}
                        <View style={styles.preventionCard}>
                            <View style={styles.cardHeader}>
                                <SprayCan size={22} color="#5B8BA3" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Uso de Inseticidas</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Em áreas endêmicas, pulverizações com inseticidas específicos podem ajudar a controlar o mosquito. Essas ações devem ser realizadas por órgãos de saúde pública.
                            </Text>
                        </View>

                        {/* Biocontrole Natural */}
                        <View style={styles.preventionCard}>
                            <View style={styles.cardHeader}>
                                <Bug size={22} color="#8B6B47" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Biocontrole Natural</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Estudos indicam que predadores naturais, como certos tipos de peixes, aranhas e outros insetos, podem auxiliar no controle das larvas do mosquito-palha.
                            </Text>
                        </View>
                    </View>

                    {/* Proteção Contra Picadas */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <Shield size={26} color="#2C5F7E" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>Formas de Proteção Contra Picadas</Text>
                        </View>

                        {/* Uso de Repelentes */}
                        <View style={styles.protectionCard}>
                            <View style={styles.cardHeader}>
                                <SprayCan size={22} color="#E8A55C" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Uso de Repelentes</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Aplique repelentes com <Text style={styles.bold}>DEET, Icaridina ou IR3535</Text> nas áreas expostas do corpo, principalmente ao entardecer e à noite, quando o mosquito é mais ativo.
                            </Text>
                        </View>

                        {/* Roupas de Proteção */}
                        <View style={styles.protectionCard}>
                            <View style={styles.cardHeader}>
                                <Shirt size={22} color="#E8A55C" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Roupas de Proteção</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Utilize mangas longas, calças e sapatos fechados para reduzir o contato da pele com o mosquito.
                            </Text>
                        </View>

                        {/* Telas e Mosquiteiros */}
                        <View style={styles.protectionCard}>
                            <View style={styles.cardHeader}>
                                <Grid size={22} color="#E8A55C" strokeWidth={2} />
                                <Text style={styles.cardTitle}>Telas e Mosquiteiros</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Instale telas protetoras em janelas e portas e use mosquiteiros impregnados com inseticida ao dormir.
                            </Text>
                        </View>

                        {/* Proteção para Cães */}
                        <View style={styles.dogCard}>
                            <View style={styles.cardHeader}>
                                <Dog size={24} color="#C24229" strokeWidth={2} />
                                <Text style={styles.cardTitleSpecial}>Proteção para Cães</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Os cães também podem ser infectados pela leishmaniose. Para protegê-los:
                            </Text>
                            <View style={styles.dogTipBox}>
                                <Text style={styles.dogTipText}>• Utilize coleiras impregnadas com deltametrina</Text>
                            </View>
                            <View style={styles.dogTipBox}>
                                <Text style={styles.dogTipText}>• Mantenha o ambiente limpo e livre de matéria orgânica</Text>
                            </View>
                            <View style={styles.dogTipBox}>
                                <Text style={styles.dogTipText}>• Consulte um veterinário regularmente para monitoramento</Text>
                            </View>
                        </View>
                    </View>

                    {/* Evite Áreas de Risco */}
                    <View style={styles.section}>
                        <View style={styles.warningCard}>
                            <View style={styles.cardHeader}>
                                <MapPin size={24} color="#92400E" strokeWidth={2} />
                                <Text style={styles.warningTitle}>Evite Áreas de Risco</Text>
                            </View>
                            <Text style={styles.warningText}>
                                O mosquito-palha é mais comum em locais com muita vegetação e matéria orgânica em decomposição. Evite permanecer em regiões de mata densa ou terrenos baldios sem proteção adequada.
                            </Text>
                        </View>
                    </View>

                    {/* Conclusão */}
                    <View style={styles.conclusionCard}>
                        <AlertTriangle size={32} color="#15803D" strokeWidth={2} />
                        <Text style={styles.conclusionTitle}>A prevenção é o melhor caminho!</Text>
                        <Text style={styles.conclusionText}>
                            Adote essas medidas e proteja sua saúde e a dos seus animais.
                        </Text>
                    </View>

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
        fontSize: 26,
        fontWeight: "800",
        color: "#F4D8A7",
        lineHeight: 32,
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
        borderLeftColor: "#8B6B47",
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
    italic: {
        fontStyle: "italic",
        color: "#5B8BA3",
    },
    bold: {
        fontWeight: "700",
        color: "#2C5F7E",
    },
    section: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    iconBadge: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
        lineHeight: 26,
    },
    preventionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#2C5F7E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: "#8B6B47",
    },
    protectionCard: {
        backgroundColor: "#FFFBF0",
        borderRadius: 18,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#E8A55C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: "#E8A55C",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 10,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
    },
    cardTitleSpecial: {
        fontSize: 18,
        fontWeight: "800",
        color: "#C24229",
        flex: 1,
    },
    cardDescription: {
        fontSize: 15,
        color: "#4A5568",
        lineHeight: 23,
        marginBottom: 12,
    },
    tipBox: {
        backgroundColor: "#F0F9FF",
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#5B8BA3",
    },
    tipText: {
        fontSize: 14,
        color: "#1E40AF",
        lineHeight: 21,
        fontWeight: "600",
    },
    dogCard: {
        backgroundColor: "#FFF5F5",
        borderRadius: 18,
        padding: 20,
        marginTop: 8,
        shadowColor: "#C24229",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 2,
        borderColor: "#FED7D7",
    },
    dogTipBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#C24229",
    },
    dogTipText: {
        fontSize: 14,
        color: "#991B1B",
        lineHeight: 21,
        fontWeight: "600",
    },
    warningCard: {
        backgroundColor: "#FEF3C7",
        borderRadius: 18,
        padding: 22,
        borderWidth: 2,
        borderColor: "#FCD34D",
        shadowColor: "#92400E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#92400E",
        flex: 1,
    },
    warningText: {
        fontSize: 15,
        color: "#78350F",
        lineHeight: 24,
        marginTop: 4,
    },
    conclusionCard: {
        backgroundColor: "#DCFCE7",
        borderRadius: 20,
        padding: 28,
        alignItems: "center",
        marginTop: 12,
        borderWidth: 2,
        borderColor: "#86EFAC",
        shadowColor: "#15803D",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    conclusionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#15803D",
        marginTop: 16,
        marginBottom: 8,
        textAlign: "center",
    },
    conclusionText: {
        fontSize: 15,
        color: "#166534",
        lineHeight: 23,
        textAlign: "center",
    },
    bottomPadding: {
        height: 40,
    },
});
