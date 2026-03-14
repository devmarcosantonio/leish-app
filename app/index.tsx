import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const timer = setTimeout(async () => {
                try {
                    const userName = await SecureStore.getItemAsync('userName');
                    if (userName) {
                        router.replace("/home");
                    } else {
                        router.replace("/login");
                    }
                } catch (error) {
                    router.replace("/login");
                }
                setIsReady(true);
            }, 100);

            return () => clearTimeout(timer);
        };

        checkUser();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#2C5F7E" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F2ED",
        justifyContent: "center",
        alignItems: "center",
    },
});