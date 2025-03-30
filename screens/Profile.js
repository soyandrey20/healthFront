import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image, } from "react-native";
import {TextInput} from "react-native-gesture-handler";
import {getToken} from "../templates/Token";
import {url, getGlobalUserName} from "../templates/Url";


export default function Profile() {

    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        sexo: "",
        fechaNacimiento: "",
        estatura: "",
        peso: "",
        rh: "",
        edad: "",
        contactoEmergenciaNombre: "",
        contactoEmergenciaTelefono: ""
    });

    // Obtener el token del usuario
    const token = getToken();


    const obtenerUsuario = async () => {
        try {
            const response = await fetch(`${url}/profiles/${getGlobalUserName()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token // <-- El token debe ir dentro del header
                }
            });

            const json = await response.json();


            // Actualizar el estado con la información obtenida
            setUsuario({
                nombre: json.name || "",
                apellido: json.lastname || "",
                sexo: json.genero === "1" ? "Hombre" : "Mujer",
                fechaNacimiento: json.fechaNacimiento || "",
                estatura: json.estatura ? json.estatura.toString() : "",
                peso: json.peso ? json.peso.toString() : "",
                rh: json.rh || "",
                edad: json.edad ? json.edad.toString() : "",
                contactoEmergenciaNombre: json.contactoEmergenciaNombre || "",
                contactoEmergenciaTelefono: json.contactoEmergenciaTelefono || ""
            });

        } catch (error) {
            console.log("Error al obtener usuario:", error);
        }
    };
    useEffect(() => {
        obtenerUsuario();
    }, []);

    return (
        <View style={styles.padre}>
            <View>
                <Image
                    source={{uri: "https://a.storyblok.com/f/160385/f3a9b92e2c/1188_gastronomia-carne-a-la-llanera_1024x600.jpg"}}
                    style={styles.profile}/>
            </View>
            <Text style={{alignItems: 'center', fontSize: 30}}>Información personal</Text>

            <View style={styles.tarjeta}>
                <View style={styles.cajaPerfil}>

                    {/* Nombre y Apellido */}
                    <View style={styles.fila}>
                        <View style={styles.inputContainer}>
                            <Text>Nombre</Text>
                            <TextInput style={styles.input} value={usuario.nombre} editable={false}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Apellido</Text>
                            <TextInput style={styles.input} value={usuario.apellido} editable={false}/>
                        </View>
                    </View>

                    {/* Sexo y Fecha de nacimiento */}
                    <View style={styles.fila}>
                        <View style={styles.inputContainer}>
                            <Text>Sexo</Text>
                            <TextInput style={styles.input} value={usuario.sexo} editable={false}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Fecha de nacimiento</Text>
                            <TextInput style={styles.input} value={usuario.fechaNacimiento} editable={false}/>
                        </View>
                    </View>

                    {/* Estatura y Peso */}
                    <View style={styles.fila}>
                        <View style={styles.inputContainer}>
                            <Text>Estatura</Text>
                            <TextInput style={styles.input} value={usuario.estatura} editable={false}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Peso</Text>
                            <TextInput style={styles.input} value={usuario.peso} editable={false}/>
                        </View>
                    </View>

                    {/* RH y Edad */}
                    <View style={styles.fila}>
                        <View style={styles.inputContainer}>
                            <Text>RH</Text>
                            <TextInput style={styles.input} value={usuario.rh} editable={false}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Edad</Text>
                            <TextInput style={styles.input} value={usuario.edad} editable={false}/>
                        </View>
                    </View>

                    {/* Contacto de emergencia */}
                    <Text style={styles.subTitulos}>Contacto de emergencia</Text>
                    <View style={styles.fila}>
                        <View style={styles.inputContainer}>
                            <Text>Nombre</Text>
                            <TextInput style={styles.input} value={usuario.contactoEmergenciaNombre} editable={false}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Teléfono</Text>
                            <TextInput style={styles.input} value={usuario.contactoEmergenciaTelefono}
                                       editable={false}/>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {

        justifyContent: 'center',
        alignItems: 'center',


    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 200,
        marginTop: 150,
        marginLeft: 10,
        marginBottom: 50
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
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10

    },
    fila: {
        flexDirection: "row",
        justifyContent: "space-between", // Asegura que haya espacio entre los elementos
        alignItems: "center", // Alinea verticalmente los textos e inputs
        marginVertical: 10,
    },
    inputContainer: {
        flex: 1, // Hace que cada input tenga el mismo ancho
        marginHorizontal: 5, // Da espacio entre inputs
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        flex: 1, // Permite que el input se expanda de manera uniforme
    },
    subTitulos: {
        fontSize: 20,
        marginVertical: 10,
        textAlign: "center",
    },
});