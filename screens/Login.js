import React, {useState} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import {saveToken} from "../templates/Token";

import {setGlobalUserName, url} from "../templates/Url"; // Importa la función


export default function Login(props) {

    //creamos un estado para el username
    const [username, setUsername] = useState();
    //creamos un estado para el password
    const [password, setPassword] = useState();
    /*
    * Estudiar scrollview
     */
    //creamos una funcion para el boton


    const ingresar = async () => {
        try {
            //creamos una variable para el fetch
            const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const json = await response.json();
            if (json.token) {
                await saveToken(json.token);

                Alert.alert('Inicio de sesión exitoso', 'Accediendo a la aplicación');
                setGlobalUserName(username)
                props.navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Credenciales incorrectas');
            }


        } catch (error) {
            console.log(error)

        }
    }


    return (
        <View style={styles.padre}>

            <View>
                <Image source={require('../assets/logo.png')} style={styles.profile}/>
            </View>

            <View style={styles.tarjeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Nombre de usuario' style={{paddingHorizontal: 15}}
                               onChangeText={(text) => setUsername(text)}/>
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Password' style={{paddingHorizontal: 15}} secureTextEntry={true}
                               onChangeText={(text) => setPassword(text)}/>
                </View>


                <View style={{
                    paddingVertical: 10,

                }}>
                    <Text>Recupera tu contraseña
                        <Text style={{color: 'blue'}}
                              onPress={() => props.navigation.navigate('ResetPassword')}> aquí</Text>
                    </Text>
                </View>


                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={ingresar}>
                        <Text style={styles.textoBoton}> Ingresar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.selector}>
                    <Text>¿No tienes una cuenta? Registrate
                        <Text style={{color: 'blue'}}
                              onPress={() => props.navigation.navigate('Register')}> aquí</Text>
                    </Text>
                </View>
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
    profile: {
        width: 150,
        height: 150,
        borderRadius: 200,
        marginTop: 50,
        marginLeft: 10
    },
    tarjeta: {
        margin: 20,
        backgroundColor: '#A0D8DE',
        borderRadius: 10,
        width: '90%',
        padding: 20,
        paddingTop: 40,
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
    selector: {
        alignItems: 'center',
        marginVertical: 10,
        fontSize: 30,
        fontWeight: 'bold'


    }

});