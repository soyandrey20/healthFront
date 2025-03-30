import {StyleSheet, View, Text, Alert, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {url} from "../templates/Url";


export default function ResetPassword(props) {


    const [id, setId] = useState("");
    const [emailSent, setEmailSent] = useState(false); // Controla si se envió el email
    const [resetCode, setResetCode] = useState("");
    const [email, setEmail] = useState(""); // Guarda el email del usuario
    const [username, setUsername] = useState("");


    // Función para solicitar el código de recuperación
    const requestResetCode = async () => {
        try {
            const response = await fetch(`${url}/auth/resetpassword/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const json = await response.json();

            if (json.status === 200) {
                setEmail(json.email); // Guardar el email del usuario
                setUsername(json.username); // Guardar el username del usuario
                setEmailSent(true); // Cambiar a la pantalla de ingreso de código
                Alert.alert('Código enviado', 'Revisa tu correo electrónico');
            } else {
                Alert.alert('Error', 'El usuario no existe');
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Alert.alert('Error', 'Hubo un problema con la solicitud');
        }
    };

    // Función para verificar el código ingresado
    const verifyResetCode = async () => {
        try {
            const response = await fetch(`${url}/auth/validate-reset-code`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    resetCode: resetCode
                }),
            });

            const json = await response.json();

            if (json.status === 200) {
                Alert.alert('Código correcto', 'Ahora puedes establecer una nueva contraseña');

                props.navigation.navigate('NewPassword', {username: username}); // Navega a la nueva pantalla
            } else {
                Alert.alert('Error', 'Código incorrecto o expirado');
            }
        } catch (error) {
            console.error("Error en la validación:", error);
            Alert.alert('Error', 'Hubo un problema con la validación del código');
        }
    };

    return (
        <View style={styles.padre}>
            <View style={styles.tarjeta}>
                <View style={styles.tittle}>
                    <Text style={styles.textTittle}>Restablecer contraseña</Text>
                </View>

                {!emailSent ? (
                    <>
                        <View style={styles.cajaTexto}>
                            <TextInput
                                placeholder='Ingresar identificación'
                                style={{paddingHorizontal: 15}}
                                onChangeText={(text) => setId(text)}
                                value={id}

                            />
                        </View>


                        <View style={styles.fila}>


                            <View style={styles.padreBoton}>
                                <TouchableOpacity style={styles.cajaBoton} onPress={props.navigation.goBack}>
                                    <Text style={styles.textoBoton}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.padreBoton}>
                                <TouchableOpacity style={styles.cajaBoton} onPress={requestResetCode}>
                                    <Text style={styles.textoBoton}>Enviar código</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </>
                ) : (
                    <>
                        <Text style={{textAlign: "center", marginBottom: 10}}>
                            Ingresa el código enviado a {email}
                        </Text>
                        <View style={styles.cajaTexto}>
                            <TextInput
                                placeholder='Ingresar código'
                                style={{paddingHorizontal: 15}}
                                onChangeText={(text) => setResetCode(text)}
                                value={resetCode}
                            />
                        </View>
                        <View style={styles.padreBoton}>
                            <TouchableOpacity style={styles.cajaBoton} onPress={verifyResetCode}>
                                <Text style={styles.textoBoton}>Validar código</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )

                }
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
        boxShadowColor: '#000',
        boxShadowOffset: {width: 0, height: 2},
        boxShadowOpacity: 0.25,
        boxShadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: 'rgba(85,78,78,0.2)',
        borderRadius: 30,
        marginVertical: 10,
    },
    padreBoton: {
        alignItems: 'center',
    },
    cajaBoton: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20,
    },
    textoBoton: {
        color: 'white',
        textAlign: 'center',
    },
    tittle: {
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
    },
    textTittle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fila: {
        flexDirection: "row", justifyContent: "space-between", // Asegura que haya espacio entre los elementos
        alignItems: "center", // Alinea verticalmente los textos e inputs
        marginVertical: 10,
    },
});
