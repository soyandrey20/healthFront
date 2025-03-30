import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Setting(props) {
    const salir = () => {
        Alert.alert('Salir', '¿Estás seguro que deseas salir?', [
            {text: 'Cancelar', onPress: () => console.log('Cancelar')},
            {text: 'Salir', onPress: () => salirAplicacion()}
        ]);

    }
    const salirAplicacion = async () => {
        await SecureStore.deleteItemAsync('authToken');
        props.navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.padre}>
                <View style={styles.tarjeta}>
                    <View style={styles.cajaTexto}>
                        <Text>Configuración</Text>
                        <Text>Notificaciones</Text>
                        <Text>Privacidad</Text>
                        <Text>Idioma</Text>
                        <Text>Soporte</Text>
                        <Text>Acerca de</Text>
                        <TouchableOpacity style={styles.cajaBoton} onPress={salir}>
                            <Text style={styles.textoBoton}> Salir</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tarjeta: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        width: "90%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
