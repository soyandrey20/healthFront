import {StyleSheet, View, Text, Alert, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {setGlobalUserName, url} from "../templates/Url";

export default function NewPassword({route, navigation}) {

    const {username} = route.params;

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch(`${url}/auth/change-password`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: newPassword
                }),
            });

            const json = await response.json();

            if (json.status === 200) {
                Alert.alert('Éxito', 'Contraseña cambiada correctamente');
                navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
            } else {
                Alert.alert('Error', json.message || 'No se pudo cambiar la contraseña');
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            Alert.alert('Error', 'Hubo un problema con la solicitud');
        }
    };

    return (
        <View style={styles.padre}>
            <View style={styles.tarjeta}>
                <Text style={styles.textTittle}>Nueva Contraseña</Text>

                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Nueva contraseña'
                        secureTextEntry
                        style={{paddingHorizontal: 15}}
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                    />
                </View>

                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Confirmar contraseña'
                        secureTextEntry
                        style={{paddingHorizontal: 15}}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                    />
                </View>

                <TouchableOpacity style={styles.cajaBoton} onPress={changePassword}>
                    <Text style={styles.textoBoton}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ACE3E0',
    },
    tarjeta: {
        margin: 20,
        backgroundColor: '#A0D8DE',
        borderRadius: 10,
        width: '90%',
        padding: 20,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: 'rgba(85,78,78,0.2)',
        borderRadius: 30,
        marginVertical: 10,
    },
    cajaBoton: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 250,
        alignSelf: 'center',
    },
    textoBoton: {
        color: 'white',
        textAlign: 'center',
    },
    textTittle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 20,
    },
});
