import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { Edit2, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [savedName, setSavedName] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadSavedName();
    }, []);

    const loadSavedName = async () => {
        try {
            const userName = await SecureStore.getItemAsync('userName');
            if (userName) {
                setSavedName(userName);
                setName(userName);
            }
        } catch (error) {
            console.error('Erro ao carregar nome:', error);
        }
    };

    const handleLogin = async () => {
        if (name.trim()) {
            try {
                await SecureStore.setItemAsync('userName', name.trim());
                router.replace("/home");
            } catch (error) {
                console.error('Erro ao salvar nome:', error);
            }
        }
    };

    const handleContinue = () => {
        router.replace("/home");
    };

    const handleEdit = () => {
        setIsEditing(true);
        setSavedName(null);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <User size={80} color="#2C5F7E" strokeWidth={1.5} />
                </View>

                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>
                    {savedName && !isEditing ? `Olá, ${savedName}!` : 'Digite seu nome para continuar'}
                </Text>

                {savedName && !isEditing ? (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Continuar como {savedName}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={handleEdit}
                            activeOpacity={0.8}
                        >
                            <Edit2 size={18} color="#2C5F7E" strokeWidth={2} />
                            <Text style={styles.editButtonText}>Alterar nome</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu nome"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                                onSubmitEditing={handleLogin}
                                autoCapitalize="words"
                                autoCorrect={false}
                                autoFocus={isEditing}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, !name.trim() && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={!name.trim()}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F2ED",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#2C5F7E15",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 40,
        textAlign: "center",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 24,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        fontSize: 16,
        color: "#2C5F7E",
        borderWidth: 2,
        borderColor: "#E5E7EB",
        shadowColor: "#2C5F7E",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    button: {
        width: "100%",
        backgroundColor: "#2C5F7E",
        borderRadius: 16,
        padding: 18,
        alignItems: "center",
        shadowColor: "#2C5F7E",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: "#9CA3AF",
        shadowOpacity: 0.1,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 16,
        paddingVertical: 12,
    },
    editButtonText: {
        color: "#2C5F7E",
        fontSize: 16,
        fontWeight: "600",
    },
});