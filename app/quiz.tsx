import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Award, CheckCircle, XCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import perguntasData from "../assets/aba-quiz/perguntas.json";

type Pergunta = {
    id: number;
    pergunta: string;
    opcoes: string[];
    respostaCorreta: number;
};

type TelaEstado = "inicio" | "quiz" | "resultado";

export default function Quiz() {
    const router = useRouter();
    const [tela, setTela] = useState<TelaEstado>("inicio");
    const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
    const [indicePerguntaAtual, setIndicePerguntaAtual] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
    const [respondido, setRespondido] = useState(false);
    const [acertos, setAcertos] = useState(0);
    const [userName, setUserName] = useState("");
    const [melhorPontuacao, setMelhorPontuacao] = useState(0);
    const progressAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        carregarDados();
    }, []);

    useEffect(() => {
        if (tela === "quiz" && perguntas.length > 0) {
            Animated.timing(progressAnim, {
                toValue: ((indicePerguntaAtual + 1) / perguntas.length) * 100,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [indicePerguntaAtual, tela, perguntas.length, progressAnim]);

    const carregarDados = async () => {
        const nome = await SecureStore.getItemAsync("userName");
        setUserName(nome || "Jogador");

        const pontuacao = await SecureStore.getItemAsync("quizBestScore");
        setMelhorPontuacao(pontuacao ? parseInt(pontuacao) : 0);
    };

    const iniciarQuiz = () => {
        const perguntasAleatorias = [...perguntasData]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        setPerguntas(perguntasAleatorias);
        setIndicePerguntaAtual(0);
        setAcertos(0);
        setTela("quiz");
    };

    const selecionarResposta = (index: number) => {
        if (respondido) return;
        setRespostaSelecionada(index);
    };

    const confirmarResposta = () => {
        if (respostaSelecionada === null) return;

        setRespondido(true);
        if (respostaSelecionada === perguntas[indicePerguntaAtual].respostaCorreta) {
            setAcertos(acertos + 1);
        }
    };

    const proximaPergunta = () => {
        if (indicePerguntaAtual < perguntas.length - 1) {
            setIndicePerguntaAtual(indicePerguntaAtual + 1);
            setRespostaSelecionada(null);
            setRespondido(false);
        } else {
            finalizarQuiz();
        }
    };

    const finalizarQuiz = async () => {
        setTela("resultado");
        if (acertos > melhorPontuacao) {
            await SecureStore.setItemAsync("quizBestScore", acertos.toString());
            setMelhorPontuacao(acertos);
        }
    };

    const reiniciarQuiz = () => {
        setTela("inicio");
        setRespostaSelecionada(null);
        setRespondido(false);
    };

    // Tela de Início
    if (tela === "inicio") {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                        <Text style={styles.backText}>← Voltar</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Quiz E-Leish</Text>
                </View>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.inicioContainer}>
                        <View style={styles.iconContainer}>
                            <Award size={80} color="#2C5F7E" strokeWidth={2} />
                        </View>
                        <Text style={styles.welcomeTitle}>Olá, {userName}! 👋</Text>
                        <Text style={styles.welcomeText}>
                            Teste seus conhecimentos sobre leishmaniose de forma divertida!
                        </Text>

                        <View style={styles.regrasCard}>
                            <Text style={styles.regrasTitle}>📋 Como Funciona:</Text>
                            <View style={styles.regraItem}>
                                <Text style={styles.regraNumero}>1.</Text>
                                <Text style={styles.regraTexto}>Você responderá 10 perguntas aleatórias</Text>
                            </View>
                            <View style={styles.regraItem}>
                                <Text style={styles.regraNumero}>2.</Text>
                                <Text style={styles.regraTexto}>Selecione a alternativa que você acha correta</Text>
                            </View>
                            <View style={styles.regraItem}>
                                <Text style={styles.regraNumero}>3.</Text>
                                <Text style={styles.regraTexto}>Confirme sua resposta para ver o resultado</Text>
                            </View>
                            <View style={styles.regraItem}>
                                <Text style={styles.regraNumero}>4.</Text>
                                <Text style={styles.regraTexto}>Avance para a próxima pergunta</Text>
                            </View>
                        </View>

                        {melhorPontuacao > 0 && (
                            <View style={styles.recordeCard}>
                                <Text style={styles.recordeTexto}>🏆 Seu melhor: {melhorPontuacao}/10</Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.iniciarButton} onPress={iniciarQuiz} activeOpacity={0.8}>
                            <Text style={styles.iniciarButtonText}>Começar Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Tela do Quiz
    if (tela === "quiz" && perguntas.length > 0) {
        const perguntaAtual = perguntas[indicePerguntaAtual];
        const estaCorreto = respostaSelecionada === perguntaAtual.respostaCorreta;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                        <Text style={styles.backText}>← Sair</Text>
                    </TouchableOpacity>
                    <Text style={styles.progressText}>
                        Pergunta {indicePerguntaAtual + 1} de {perguntas.length}
                    </Text>
                </View>

                {/* Barra de Progresso */}
                <View style={styles.progressBarContainer}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ["0%", "100%"],
                                }),
                            },
                        ]}
                    />
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.quizContainer}>
                        <Text style={styles.perguntaTexto}>{perguntaAtual.pergunta}</Text>

                        <View style={styles.opcoesContainer}>
                            {perguntaAtual.opcoes.map((opcao, index) => {
                                const estilo: ViewStyle[] = [styles.opcaoButton];
                                let icone = null;

                                if (respondido) {
                                    if (index === perguntaAtual.respostaCorreta) {
                                        estilo.push(styles.opcaoCorreta);
                                        icone = <CheckCircle size={24} color="#2D6A4F" strokeWidth={2.5} />;
                                    } else if (index === respostaSelecionada) {
                                        estilo.push(styles.opcaoIncorreta);
                                        icone = <XCircle size={24} color="#C1121F" strokeWidth={2.5} />;
                                    }
                                } else if (respostaSelecionada === index) {
                                    estilo.push(styles.opcaoSelecionadaOverride);
                                }

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={estilo}
                                        onPress={() => selecionarResposta(index)}
                                        activeOpacity={0.7}
                                        disabled={respondido}
                                    >
                                        <View style={styles.opcaoConteudo}>
                                            <Text style={styles.opcaoLetra}>{String.fromCharCode(65 + index)}</Text>
                                            <Text style={styles.opcaoTexto}>{opcao}</Text>
                                            {icone && <View style={styles.opcaoIcone}>{icone}</View>}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {!respondido ? (
                            <TouchableOpacity
                                style={[
                                    styles.confirmarButton,
                                    respostaSelecionada === null && styles.confirmarButtonDisabled,
                                ]}
                                onPress={confirmarResposta}
                                disabled={respostaSelecionada === null}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.confirmarButtonText}>Confirmar Resposta</Text>
                            </TouchableOpacity>
                        ) : (
                            <View>
                                <View style={[styles.feedbackCard, estaCorreto ? styles.feedbackCorreto : styles.feedbackIncorreto]}>
                                    <Text style={styles.feedbackTitulo}>
                                        {estaCorreto ? "✓ Parabéns!" : "✗ Ops!"}
                                    </Text>
                                    <Text style={styles.feedbackTexto}>
                                        {estaCorreto
                                            ? "Você acertou! Continue assim!"
                                            : `A resposta correta é: ${String.fromCharCode(65 + perguntaAtual.respostaCorreta)}`}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.proximaButton}
                                    onPress={proximaPergunta}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.proximaButtonText}>
                                        {indicePerguntaAtual < perguntas.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Tela de Resultado
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
                    <Text style={styles.backText}>← Início</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Resultado</Text>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.resultadoContainer}>
                    <View style={styles.resultadoIcone}>
                        <Award size={100} color="#F4D8A7" strokeWidth={2} />
                    </View>
                    <Text style={styles.resultadoTitulo}>Quiz Finalizado!</Text>
                    <Text style={styles.resultadoSubtitulo}>{userName}</Text>

                    <View style={styles.pontuacaoCard}>
                        <Text style={styles.pontuacaoLabel}>Sua pontuação:</Text>
                        <Text style={styles.pontuacaoValor}>{acertos}/10</Text>
                        <Text style={styles.pontuacaoPercentual}>{((acertos / 10) * 100).toFixed(0)}%</Text>
                    </View>

                    {acertos === 10 && (
                        <Text style={styles.perfeitoTexto}>🎉 Perfeito! Você é um expert!</Text>
                    )}
                    {acertos >= 7 && acertos < 10 && (
                        <Text style={styles.bomTexto}>👏 Muito bem! Ótimo desempenho!</Text>
                    )}
                    {acertos >= 5 && acertos < 7 && (
                        <Text style={styles.medianoTexto}>📚 Bom trabalho! Continue estudando!</Text>
                    )}
                    {acertos < 5 && (
                        <Text style={styles.melhorarTexto}>💪 Continue praticando! Você vai melhorar!</Text>
                    )}

                    {melhorPontuacao > 0 && (
                        <View style={styles.recordeResultadoCard}>
                            <Text style={styles.recordeResultadoTexto}>
                                🏆 Melhor pontuação: {melhorPontuacao}/10
                            </Text>
                            {acertos > melhorPontuacao && (
                                <Text style={styles.novoRecordeTexto}>✨ NOVO RECORDE! ✨</Text>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.reiniciarButton} onPress={reiniciarQuiz} activeOpacity={0.8}>
                        <Text style={styles.reiniciarButtonText}>Jogar Novamente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.voltarButton}
                        onPress={() => router.push("/home")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.voltarButtonText}>Voltar ao Início</Text>
                    </TouchableOpacity>
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
    progressText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#F4D8A7",
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: "#E0E0E0",
        width: "100%",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2C5F7E",
    },
    scrollView: {
        flex: 1,
    },

    // Tela de Início
    inicioContainer: {
        padding: 24,
        alignItems: "center",
    },
    iconContainer: {
        marginVertical: 20,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 12,
        textAlign: "center",
    },
    welcomeText: {
        fontSize: 16,
        color: "#5B5B5B",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 24,
    },
    regrasCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        width: "100%",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    regrasTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 16,
    },
    regraItem: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "flex-start",
    },
    regraNumero: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2C5F7E",
        marginRight: 12,
        width: 24,
    },
    regraTexto: {
        fontSize: 15,
        color: "#5B5B5B",
        flex: 1,
        lineHeight: 22,
    },
    recordeCard: {
        backgroundColor: "#FFF4E6",
        borderRadius: 12,
        padding: 16,
        width: "100%",
        marginBottom: 24,
        borderWidth: 2,
        borderColor: "#F4D8A7",
    },
    recordeTexto: {
        fontSize: 16,
        fontWeight: "700",
        color: "#8B6B47",
        textAlign: "center",
    },
    iniciarButton: {
        backgroundColor: "#2C5F7E",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    iniciarButtonText: {
        color: "#F4D8A7",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },

    // Quiz
    quizContainer: {
        padding: 24,
    },
    perguntaTexto: {
        fontSize: 22,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 32,
        lineHeight: 32,
        textAlign: "center",
    },
    opcoesContainer: {
        marginBottom: 24,
    },
    opcaoButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    opcaoSelecionada: {
        backgroundColor: "#E3F2FD",
        borderColor: "#2C5F7E",
        borderWidth: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#2C5F7E",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    opcaoSelecionadaOverride: {
        backgroundColor: "#E3F2FD",
        borderColor: "#2C5F7E",
    },
    opcaoCorreta: {
        backgroundColor: "#D4EDDA",
        borderColor: "#2D6A4F",
    },
    opcaoIncorreta: {
        backgroundColor: "#F8D7DA",
        borderColor: "#C1121F",
    },
    opcaoConteudo: {
        flexDirection: "row",
        alignItems: "center",
    },
    opcaoLetra: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2C5F7E",
        marginRight: 12,
        width: 28,
    },
    opcaoTexto: {
        fontSize: 16,
        color: "#2C2C2C",
        flex: 1,
        lineHeight: 24,
    },
    opcaoIcone: {
        marginLeft: 8,
    },
    confirmarButton: {
        backgroundColor: "#2C5F7E",
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 12,
    },
    confirmarButtonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    confirmarButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    feedbackCard: {
        borderRadius: 12,
        padding: 20,
        marginVertical: 16,
    },
    feedbackCorreto: {
        backgroundColor: "#D4EDDA",
        borderLeftWidth: 4,
        borderLeftColor: "#2D6A4F",
    },
    feedbackIncorreto: {
        backgroundColor: "#F8D7DA",
        borderLeftWidth: 4,
        borderLeftColor: "#C1121F",
    },
    feedbackTitulo: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
        color: "#2C2C2C",
    },
    feedbackTexto: {
        fontSize: 16,
        color: "#2C2C2C",
        lineHeight: 24,
    },
    proximaButton: {
        backgroundColor: "#2C5F7E",
        borderRadius: 12,
        paddingVertical: 16,
    },
    proximaButtonText: {
        color: "#F4D8A7",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },

    // Resultado
    resultadoContainer: {
        padding: 24,
        alignItems: "center",
    },
    resultadoIcone: {
        backgroundColor: "#2C5F7E",
        borderRadius: 100,
        padding: 24,
        marginVertical: 20,
    },
    resultadoTitulo: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 8,
    },
    resultadoSubtitulo: {
        fontSize: 18,
        color: "#5B5B5B",
        marginBottom: 32,
    },
    pontuacaoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 32,
        width: "100%",
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    pontuacaoLabel: {
        fontSize: 16,
        color: "#5B5B5B",
        marginBottom: 8,
    },
    pontuacaoValor: {
        fontSize: 56,
        fontWeight: "800",
        color: "#2C5F7E",
        marginBottom: 4,
    },
    pontuacaoPercentual: {
        fontSize: 24,
        fontWeight: "600",
        color: "#8B6B47",
    },
    perfeitoTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2D6A4F",
        marginBottom: 16,
        textAlign: "center",
    },
    bomTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2C5F7E",
        marginBottom: 16,
        textAlign: "center",
    },
    medianoTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#8B6B47",
        marginBottom: 16,
        textAlign: "center",
    },
    melhorarTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#D47254",
        marginBottom: 16,
        textAlign: "center",
    },
    recordeResultadoCard: {
        backgroundColor: "#FFF4E6",
        borderRadius: 12,
        padding: 16,
        width: "100%",
        marginBottom: 24,
        borderWidth: 2,
        borderColor: "#F4D8A7",
    },
    recordeResultadoTexto: {
        fontSize: 16,
        fontWeight: "700",
        color: "#8B6B47",
        textAlign: "center",
    },
    novoRecordeTexto: {
        fontSize: 18,
        fontWeight: "800",
        color: "#D4AF37",
        textAlign: "center",
        marginTop: 8,
    },
    reiniciarButton: {
        backgroundColor: "#2C5F7E",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: "100%",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    reiniciarButtonText: {
        color: "#F4D8A7",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    voltarButton: {
        backgroundColor: "transparent",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: "100%",
        borderWidth: 2,
        borderColor: "#2C5F7E",
    },
    voltarButtonText: {
        color: "#2C5F7E",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
});
