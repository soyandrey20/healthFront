import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getToken } from "../templates/Token";

export default function Home() {


    return (
        <View style={styles.container}>
            <Text>Bienvenido a Home</Text>

            <Text>{getToken()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
