import { Stack } from "expo-router";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: Platform.OS === "android" ? "fade_from_bottom" : "slide_from_right",
                    contentStyle: { backgroundColor: "#F5F2ED" },
                    animationDuration: 200,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    presentation: "card",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        animation: "fade",
                        animationDuration: 150,
                    }}
                />
                <Stack.Screen
                    name="login"
                    options={{
                        animation: "fade",
                        animationDuration: 150,
                    }}
                />
                <Stack.Screen
                    name="home"
                    options={{
                        animation: "fade",
                        animationDuration: 250,
                    }}
                />
                <Stack.Screen name="mapa" />
                <Stack.Screen name="contatos" />
                <Stack.Screen name="forum" />
                <Stack.Screen name="o-que-e" />
                <Stack.Screen name="como-identificar" />
                <Stack.Screen name="prevencao" />
                <Stack.Screen name="quiz" />
            </Stack>
        </GestureHandlerRootView>
    );
}
