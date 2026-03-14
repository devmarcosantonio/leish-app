import { useRouter } from "expo-router";
import { AlertCircle, Hospital, MapPin, MessageCircle, Phone } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Contatos() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Contatos</Text>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Phone color="#2C5F7E" size={28} />
                        <Text style={styles.sectionTitle}>ATENDIMENTO RÁPIDO E INFORMAÇÕES</Text>
                    </View>
                    <Text style={styles.subtitle}>Para informações, orientações ou atendimento especializado (suspeita de leishmaniose e outras doenças tropicais)</Text>

                    <View style={styles.contactItem}>
                        <Phone color="#4A90A4" size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>Disque Saúde (SUS)</Text>
                            <Text style={styles.contactDetail}>136 (Ligação gratuita)</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <MessageCircle color="#4A90A4" size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>WhatsApp Saúde</Text>
                            <Text style={styles.contactDetail}>(98) 3210-9090</Text>
                            <Text style={styles.contactNote}>Agendamentos e Dúvidas</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <Phone color="#4A90A4" size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>Vigilância Epidemiológica (SES/MA)</Text>
                            <Text style={styles.contactDetail}>(98) 3218-8700</Text>
                        </View>
                    </View>

                    <View style={styles.contactItem}>
                        <Phone color="#4A90A4" size={20} />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>Secretaria Municipal de Saúde (SEMUS)</Text>
                            <Text style={styles.contactDetail}>(98) 3212-8282</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Hospital color="#2C5F7E" size={28} />
                        <Text style={styles.sectionTitle}>HOSPITAIS DE REFERÊNCIA EM SÃO LUÍS</Text>
                    </View>

                    <View style={styles.hospitalItem}>
                        <Text style={styles.hospitalName}>Hospital Presidente Vargas</Text>
                        <Text style={styles.hospitalRef}>(Referência em Doenças Tropicais)</Text>
                        <Text style={styles.hospitalAddress}>📍 Rua 5 de Janeiro, nº 166, Jordoa</Text>
                        <Text style={styles.hospitalPhone}>☎️ (98) 3243-9809 | (98) 3221-5034</Text>
                    </View>

                    <View style={styles.hospitalItem}>
                        <Text style={styles.hospitalName}>Hospital Universitário (HUFMA)</Text>
                        <Text style={styles.hospitalPhone}>☎️ (98) 2109-1000</Text>
                    </View>

                    <View style={styles.hospitalItem}>
                        <Text style={styles.hospitalName}>Hospital Infantil Juvêncio Mattos</Text>
                        <Text style={styles.hospitalRef}>(Crianças)</Text>
                        <Text style={styles.hospitalPhone}>☎️ (98) 3218-8750</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MapPin color="#2C5F7E" size={28} />
                        <Text style={styles.sectionTitle}>UNIDADES DE PRONTO ATENDIMENTO (UPA 24H)</Text>
                    </View>

                    <View style={styles.upaItem}>
                        <Text style={styles.upaName}>UPA Vinhais</Text>
                        <Text style={styles.upaPhone}>☎️ (98) 3246-0531</Text>
                    </View>

                    <View style={styles.upaItem}>
                        <Text style={styles.upaName}>UPA Cidade Operária</Text>
                        <Text style={styles.upaPhone}>☎️ (98) 3247-2393</Text>
                    </View>

                    <View style={styles.upaItem}>
                        <Text style={styles.upaName}>UPA Itaqui-Bacanga</Text>
                        <Text style={styles.upaPhone}>☎️ (98) 3272-0346</Text>
                    </View>

                    <View style={styles.upaItem}>
                        <Text style={styles.upaName}>UPA Parque Vitória</Text>
                        <Text style={styles.upaPhone}>☎️ (98) 3190-8076</Text>
                    </View>
                </View>

                <View style={styles.alertBox}>
                    <AlertCircle color="#D9534F" size={24} />
                    <View style={styles.alertContent}>
                        <Text style={styles.alertTitle}>Importante:</Text>
                        <Text style={styles.alertText}>
                            Se você apresenta febre persistente, feridas que não cicatrizam ou inchaço abdominal,
                            procure a Unidade Básica de Saúde (UBS) mais próxima ou o Hospital Presidente Vargas imediatamente.
                            O diagnóstico e o tratamento são gratuitos pelo SUS.
                        </Text>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#2C5F7E",
        flex: 1,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
        gap: 12,
        backgroundColor: "#F9F9F9",
        padding: 12,
        borderRadius: 8,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 4,
    },
    contactDetail: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4A90A4",
        marginBottom: 2,
    },
    contactNote: {
        fontSize: 13,
        color: "#666",
        fontStyle: "italic",
    },
    hospitalItem: {
        backgroundColor: "#F9F9F9",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#4A90A4",
    },
    hospitalName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 4,
    },
    hospitalRef: {
        fontSize: 14,
        color: "#4A90A4",
        fontStyle: "italic",
        marginBottom: 8,
    },
    hospitalAddress: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
        lineHeight: 20,
    },
    hospitalPhone: {
        fontSize: 14,
        color: "#666",
        fontWeight: "600",
    },
    upaItem: {
        backgroundColor: "#F9F9F9",
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    upaName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2C5F7E",
    },
    upaPhone: {
        fontSize: 14,
        color: "#666",
        fontWeight: "600",
    },
    alertBox: {
        backgroundColor: "#FFF3CD",
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
        flexDirection: "row",
        gap: 12,
        borderWidth: 1,
        borderColor: "#FFE69C",
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#856404",
        marginBottom: 8,
    },
    alertText: {
        fontSize: 14,
        color: "#856404",
        lineHeight: 20,
    },
});
