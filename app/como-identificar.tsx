import { useRouter } from "expo-router";
import { Activity, AlertCircle, ArrowLeft, Eye, Stethoscope, Thermometer } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ComoIdentificar() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <ArrowLeft size={24} color="#F4D8A7" strokeWidth={2.5} />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Como Identificar a Leishmaniose</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Intro */}
                    <View style={styles.introCard}>
                        <Text style={styles.introTitle}>Identifique os Sintomas e Saiba Quando Procurar Ajuda</Text>
                        <Text style={styles.introText}>
                            Reconhecer os sintomas precocemente é essencial para um tratamento eficaz. Conheça as principais formas clínicas da leishmaniose e seus sintomas característicos.
                        </Text>
                    </View>

                    <Text style={styles.mainSectionTitle}>Principais Formas Clínicas da Leishmaniose</Text>

                    {/* Leishmaniose Cutânea */}
                    <View style={styles.diseaseCard}>
                        <View style={styles.diseaseHeader}>
                            <View style={styles.numberBadge}>
                                <Text style={styles.numberText}>1</Text>
                            </View>
                            <Text style={styles.diseaseTitle}>Leishmaniose Cutânea (LC)</Text>
                        </View>

                        <Text style={styles.diseaseDescription}>
                            A forma mais comum da doença, que afeta principalmente a pele.
                        </Text>

                        <Text style={styles.symptomsTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Lesões ulceradas</Text>
                                <Text style={styles.symptomText}>
                                    Surgem como pequenas bolhas que evoluem para úlceras abertas com bordas elevadas
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Localização das lesões</Text>
                                <Text style={styles.symptomText}>
                                    Geralmente aparecem em áreas expostas, como braços, pernas e rosto
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Sem dor</Text>
                                <Text style={styles.symptomText}>
                                    As lesões são indolores, mas podem coçar
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Cicatrização lenta</Text>
                                <Text style={styles.symptomText}>
                                    As feridas demoram a curar, podendo deixar cicatrizes permanentes
                                </Text>
                            </View>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/5.png")}
                                style={{ width: "100%", height: 500, marginTop: -200, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>


                    {/* Leishmaniose Mucosa */}
                    <View style={styles.diseaseCard}>
                        <View style={styles.diseaseHeader}>
                            <View style={styles.numberBadge}>
                                <Text style={styles.numberText}>2</Text>
                            </View>
                            <Text style={styles.diseaseTitle}>Leishmaniose Mucosa (LM)</Text>
                        </View>

                        <Text style={styles.diseaseDescription}>
                            Forma mais rara e grave, que afeta as mucosas do nariz, boca e faringe.
                        </Text>

                        <Text style={styles.symptomsTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Lesões nas mucosas</Text>
                                <Text style={styles.symptomText}>
                                    Iniciam no nariz, podendo se espalhar para a boca e garganta
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Congestão nasal e sangramentos</Text>
                                <Text style={styles.symptomText}>
                                    Podem ocorrer no início, seguidos de dificuldades respiratórias
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Destruição das mucosas</Text>
                                <Text style={styles.symptomText}>
                                    Sem tratamento, pode causar deformidades faciais e dificuldade para respirar e engolir
                                </Text>
                            </View>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/6.png")}
                                style={{ width: "100%", height: 500, marginTop: -200, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Leishmaniose Cutânea Difusa */}
                    <View style={styles.diseaseCard}>
                        <View style={styles.diseaseHeader}>
                            <View style={styles.numberBadge}>
                                <Text style={styles.numberText}>3</Text>
                            </View>
                            <Text style={styles.diseaseTitle}>Leishmaniose Cutânea Difusa (LCD)</Text>
                        </View>

                        <Text style={styles.diseaseDescription}>
                            Caracterizada por múltiplas lesões na pele, sem cicatrização e com distribuição extensa.
                        </Text>

                        <Text style={styles.symptomsTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Lesões disseminadas</Text>
                                <Text style={styles.symptomText}>
                                    Várias pequenas feridas espalhadas pelo corpo
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Dificuldade de cicatrização</Text>
                                <Text style={styles.symptomText}>
                                    As lesões permanecem por longos períodos sem cura
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Lesões sem bordas elevadas</Text>
                                <Text style={styles.symptomText}>
                                    Diferente da forma ulcerada, as lesões podem ser mais rasas
                                </Text>
                            </View>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/7.png")}
                                style={{ width: "100%", height: 500, marginTop: -180, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Leishmaniose Disseminada */}
                    <View style={styles.diseaseCard}>
                        <View style={styles.diseaseHeader}>
                            <View style={styles.numberBadge}>
                                <Text style={styles.numberText}>4</Text>
                            </View>
                            <Text style={styles.diseaseTitle}>Leishmaniose Disseminada (LD)</Text>
                        </View>

                        <Text style={styles.diseaseDescription}>
                            Forma rara que envolve a propagação do parasita para várias áreas da pele e órgãos internos.
                        </Text>

                        <Text style={styles.symptomsTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Lesões em várias partes do corpo</Text>
                                <Text style={styles.symptomText}>
                                    Grande quantidade de feridas que se espalham para outras áreas
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Comprometimento do sistema imunológico</Text>
                                <Text style={styles.symptomText}>
                                    Pode afetar sistemas hepático e sanguíneo
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItem}>
                            <Text style={styles.symptomBullet}>•</Text>
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Pele comprometida</Text>
                                <Text style={styles.symptomText}>
                                    Lesões mais profundas com grande área de comprometimento
                                </Text>
                            </View>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/8.png")}
                                style={{ width: "100%", height: 500, marginTop: -180, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Leishmaniose Visceral */}
                    <View style={styles.visceralCard}>
                        <View style={styles.diseaseHeader}>
                            <View style={styles.numberBadgeDanger}>
                                <Text style={styles.numberTextDanger}>5</Text>
                            </View>
                            <Text style={styles.diseaseTitleDanger}>Leishmaniose Visceral (Calazar)</Text>
                        </View>

                        <View style={styles.dangerBadge}>
                            <AlertCircle size={18} color="#991B1B" strokeWidth={2.5} />
                            <Text style={styles.dangerText}>Forma mais grave e potencialmente fatal</Text>
                        </View>

                        <Text style={styles.diseaseDescription}>
                            Afeta órgãos internos como fígado, baço e medula óssea.
                        </Text>

                        <Text style={styles.symptomsTitle}>Principais sintomas:</Text>

                        <View style={styles.symptomItemDanger}>
                            <Thermometer size={20} color="#C24229" strokeWidth={2} />
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Febre persistente</Text>
                                <Text style={styles.symptomText}>
                                    Pode durar semanas ou meses, sem resposta a medicamentos comuns
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItemDanger}>
                            <Activity size={20} color="#C24229" strokeWidth={2} />
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Aumento do baço e fígado</Text>
                                <Text style={styles.symptomText}>
                                    O abdômen fica inchado devido ao aumento desses órgãos
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItemDanger}>
                            <Activity size={20} color="#C24229" strokeWidth={2} />
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Perda de peso extrema</Text>
                                <Text style={styles.symptomText}>
                                    Emagrecimento rápido mesmo com alimentação normal
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItemDanger}>
                            <Eye size={20} color="#C24229" strokeWidth={2} />
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Pele pálida</Text>
                                <Text style={styles.symptomText}>
                                    Fraqueza e pele esbranquiçada devido à anemia
                                </Text>
                            </View>
                        </View>

                        <View style={styles.symptomItemDanger}>
                            <AlertCircle size={20} color="#C24229" strokeWidth={2} />
                            <View style={styles.symptomContent}>
                                <Text style={styles.symptomLabel}>Infecções recorrentes</Text>
                                <Text style={styles.symptomText}>
                                    A imunidade fica baixa, favorecendo outras infecções
                                </Text>
                            </View>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/4.png")}
                                style={{ width: "100%", height: 500, marginTop: -150, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Alerta */}
                    <View style={styles.urgentAlert}>
                        <AlertCircle size={32} color="#991B1B" strokeWidth={2.5} />
                        <Text style={styles.urgentTitle}>Procure ajuda imediatamente!</Text>
                        <Text style={styles.urgentText}>
                            Se você apresentar algum desses sintomas, procure um posto de saúde imediatamente. O diagnóstico precoce é crucial para um tratamento eficaz.
                        </Text>
                    </View>

                    {/* Diagnóstico */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBadge}>
                                <Stethoscope size={26} color="#2C5F7E" strokeWidth={2} />
                            </View>
                            <Text style={styles.sectionTitle}>Diagnóstico</Text>
                        </View>

                        <Text style={styles.sectionDescription}>
                            Para o diagnóstico de leishmaniose, é essencial a realização de exames laboratoriais e clínicos:
                        </Text>

                        <View style={styles.examCard}>
                            <Text style={styles.examTitle}>🔬 Exame microscópico</Text>
                            <Text style={styles.examText}>
                                Análise da lesão para identificação do parasita
                            </Text>
                        </View>

                        <View style={styles.examCard}>
                            <Text style={styles.examTitle}>🩸 Testes sorológicos</Text>
                            <Text style={styles.examText}>
                                Detectam a presença do parasita no sangue
                            </Text>
                        </View>

                        <View style={styles.examCard}>
                            <Text style={styles.examTitle}>💉 Punção de medula óssea</Text>
                            <Text style={styles.examText}>
                                Para diagnóstico de leishmaniose visceral
                            </Text>
                        </View>

                        <View style={{ overflow: "hidden", borderRadius: 10, marginTop: 12 }}>
                            <Image
                                source={require("../assets/images/aba-como-identificar/9.png")}
                                style={{ width: "100%", height: 500, marginTop: -200, marginBottom: -150 }}
                                resizeMode="cover"
                            />
                        </View>
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
        borderLeftColor: "#D47254",
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
    },
    mainSectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    diseaseCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#2C5F7E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: "#5B8BA3",
    },
    visceralCard: {
        backgroundColor: "#FFF5F5",
        borderRadius: 18,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#C24229",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 2,
        borderColor: "#FED7D7",
    },
    diseaseHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 12,
    },
    numberBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#5B8BA3",
        justifyContent: "center",
        alignItems: "center",
    },
    numberBadgeDanger: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#C24229",
        justifyContent: "center",
        alignItems: "center",
    },
    numberText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    numberTextDanger: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    diseaseTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
    },
    diseaseTitleDanger: {
        fontSize: 18,
        fontWeight: "800",
        color: "#C24229",
        flex: 1,
    },
    diseaseDescription: {
        fontSize: 15,
        color: "#4A5568",
        lineHeight: 23,
        marginBottom: 16,
    },
    dangerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEE2E2",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        gap: 8,
    },
    dangerText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#991B1B",
        flex: 1,
    },
    symptomsTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 12,
    },
    symptomItem: {
        flexDirection: "row",
        marginBottom: 14,
        gap: 10,
    },
    symptomItemDanger: {
        flexDirection: "row",
        marginBottom: 14,
        gap: 10,
        alignItems: "flex-start",
    },
    symptomBullet: {
        fontSize: 20,
        color: "#5B8BA3",
        fontWeight: "800",
        marginTop: 2,
    },
    symptomContent: {
        flex: 1,
    },
    symptomLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 4,
    },
    symptomText: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 21,
    },
    urgentAlert: {
        backgroundColor: "#FEE2E2",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        marginBottom: 24,
        borderWidth: 2,
        borderColor: "#FCA5A5",
        shadowColor: "#991B1B",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    urgentTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#991B1B",
        marginTop: 12,
        marginBottom: 8,
        textAlign: "center",
    },
    urgentText: {
        fontSize: 15,
        color: "#7F1D1D",
        lineHeight: 23,
        textAlign: "center",
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
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
    },
    sectionDescription: {
        fontSize: 15,
        color: "#4A5568",
        lineHeight: 24,
        marginBottom: 16,
    },
    examCard: {
        backgroundColor: "#F0F9FF",
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#2C5F7E",
    },
    examTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 6,
    },
    examText: {
        fontSize: 14,
        color: "#1E40AF",
        lineHeight: 21,
    },
    bottomPadding: {
        height: 40,
    },
});
