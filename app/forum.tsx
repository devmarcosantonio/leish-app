import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Forum() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Fórum</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.icon}>💬</Text>
                <Text style={styles.description}>
                    Espaço para discussões e troca de experiências sobre leishmaniose.
                </Text>
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
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    icon: {
        fontSize: 80,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: "#2C5F7E",
        textAlign: "center",
        lineHeight: 24,
    },
});
