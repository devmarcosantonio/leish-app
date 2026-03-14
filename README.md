# E-Leish

Aplicativo móvel educativo sobre **Leishmaniose**, desenvolvido com React Native e Expo. O objetivo é levar informação acessível sobre a doença à população, com foco no estado do Maranhão.

---

## Sobre o app

A Leishmaniose é uma doença negligenciada causada por parasitas do gênero *Leishmania*, transmitida pela picada de flebotomíneos. O **E-Leish** reúne informações sobre a doença de forma clara e interativa para usuários de qualquer nível de instrução.

### Funcionalidades

| Tela | Descrição |
|---|---|
| **O que é?** | Explicação sobre a doença, agente causador e formas de transmissão |
| **Como identificar** | Sintomas, tipos (cutânea e visceral) e orientações sobre diagnóstico |
| **Prevenção** | Medidas preventivas individuais e coletivas |
| **Mapa** | Mapa interativo dos municípios do Maranhão com polígonos navegáveis (zoom e pan) |
| **Quiz** | Perguntas de múltipla escolha para testar o conhecimento sobre a doença, com pontuação salva localmente |
| **Contatos** | Canais de contato e serviços de saúde relevantes |
| **Fórum** | Espaço para discussão e troca de experiências |

---

## Tecnologias

- [Expo](https://expo.dev) SDK 54
- [React Native](https://reactnative.dev) 0.81
- [Expo Router](https://expo.github.io/router) — navegação baseada em arquivos
- [react-native-svg](https://github.com/software-mansion/react-native-svg) — renderização do mapa em SVG
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) + [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) — gestos de zoom e pan
- [expo-secure-store](https://docs.expo.dev/sdk/securestore/) — armazenamento local seguro da pontuação do quiz

---

## Como executar

### Pré-requisitos

- Node.js 18+
- Android Studio (para emulador Android) ou dispositivo físico com USB debug
- JDK 17

### Instalação

```bash
npm install
```

### Desenvolvimento (Metro com cache limpo)

```bash
npx expo start -c
```

### Build nativo Android

Necessário ao adicionar/atualizar dependências nativas (como `react-native-svg`):

```bash
npx expo run:android
```

---

## Estrutura principal

```
app/          # Telas (roteamento baseado em arquivos)
assets/       # JSONs geográficos, perguntas do quiz e imagens
components/   # Componentes reutilizáveis
constants/    # Tema de cores
hooks/        # Hooks customizados
```
