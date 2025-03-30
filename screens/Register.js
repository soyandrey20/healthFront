import React, {useState} from "react";

import {
    Alert,
    Image, Keyboard, KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    View,
    SafeAreaView
} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {saveToken} from "../templates/Token";
import {url} from "../templates/Url";

export default function Register(props) {


    const [id, setId] = useState();
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [email, setEmail] = useState();
    const [sexo, setSexo] = useState();
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [estatura, setEstatura] = useState();
    const [peso, setPeso] = useState();
    const [rh, setRh] = useState();
    const [edad, setEdad] = useState();
    const [contactoEmergenciaNombre, setContactoEmergenciaNombre] = useState();
    const [contactoEmergenciaTelefono, setContactoEmergenciaTelefono] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const data = [{
        id: '1', title: 'Masculino',
    }, {
        id: '2', title: 'Femenino',
    }, {
        id: '3', title: 'Otro',
    }];


    const registrar = async () => {
        try {


            const response = await fetch(`${url}/auth/register`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({


                    "username": username,
                    "password": password,
                    "password2": password2,
                    "email": email,
                    "perfil": {
                        "id": id,
                        "name": nombre,
                        "lastname": apellido,
                        "genero": sexo,
                        "fechaNacimiento": fechaNacimiento.toISOString().split('T')[0],
                        "edad": edad,
                        "estatura": estatura,
                        "peso": peso,
                        "rh": rh,
                        "contactoEmergenciaNombre": contactoEmergenciaNombre,
                        "contactoEmergenciaTelefono": contactoEmergenciaTelefono,


                    }
                })
            });
            const json = await response.json();
            console.log(json)
            if (json.token) {
                await saveToken(json.token);
                console.log(json.token + ' token');
                Alert.alert('Registro exitoso', 'Accediendo a la aplicación');
                props.navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Debe llenar todos los campos');
            }

        } catch (e) {

        }


    }

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFechaNacimiento(selectedDate);
        }
    };


    return (

        <SafeAreaView style={{flex: 1}}>
            <View style={styles.padre}>
                <KeyboardAvoidingView

                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                            <View style={styles.cajaInformation}>
                                <View>
                                    <Image
                                        source={{uri: "https://a.storyblok.com/f/160385/f3a9b92e2c/1188_gastronomia-carne-a-la-llanera_1024x600.jpg"}}
                                        style={styles.profile}/>
                                </View>

                                <Text style={styles.cajaInformationTexto}>Información personal</Text>
                            </View>

                            <View style={styles.tarjeta}>
                                <View>


                                    <View>
                                        <Text>Id</Text>
                                        <TextInput style={styles.input}
                                                   onChangeText={(text) => setId(text)}/>
                                    </View>

                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Nombre de usuario</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setUsername(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Correo</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setEmail(text)}/>
                                        </View>
                                    </View>

                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Contraseña</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setPassword(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Confirmar contraseña</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setPassword2(text)}/>
                                        </View>
                                    </View>


                                    {/* Nombre y Apellido */}
                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Nombre</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setNombre(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Apellido</Text>
                                            <TextInput style={styles.input}

                                                       onChangeText={(text) => setApellido(text)}/>

                                        </View>
                                    </View>

                                    {/* Sexo y Fecha de nacimiento */}
                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Sexo</Text>
                                            <Dropdown
                                                style={styles.dropdown}
                                                data={data}
                                                labelField="title"
                                                valueField="id"
                                                placeholder="Seleccione una opción"
                                                value={sexo}
                                                onChange={(item) => setSexo(item.id)}
                                            />


                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Fecha de nacimiento</Text>
                                            <TouchableOpacity onPress={() => setShowDatePicker(true)}
                                                              style={styles.input}>
                                                <Text>{fechaNacimiento.toISOString().split('T')[0]}</Text>

                                            </TouchableOpacity>
                                            {showDatePicker && (<DateTimePicker
                                                value={fechaNacimiento}
                                                mode="date"
                                                display="default"
                                                onChange={handleDateChange}

                                            />)}
                                        </View>
                                    </View>

                                    {/* Estatura y Peso */}
                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Estatura</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setEstatura(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Peso</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setPeso(text)}/>
                                        </View>
                                    </View>

                                    {/* RH y Edad */}
                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>RH</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setRh(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Edad</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setEdad(text)}/>
                                        </View>
                                    </View>

                                    {/* Contacto de emergencia */}
                                    <Text style={styles.subTitulos}>Contacto de emergencia</Text>
                                    <View style={styles.fila}>
                                        <View style={styles.inputContainer}>
                                            <Text>Nombre</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setContactoEmergenciaNombre(text)}/>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text>Teléfono</Text>
                                            <TextInput style={styles.input}
                                                       onChangeText={(text) => setContactoEmergenciaTelefono(text)}/>
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.fila}>
                                    <View style={styles.padreBoton}>
                                        <TouchableOpacity style={styles.cajaBoton}>
                                            <Text style={styles.textoBoton}
                                                  onPress={props.navigation.goBack}> Cancelar </Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.padreBoton}>
                                        <TouchableOpacity style={styles.cajaBoton}>
                                            <Text style={styles.textoBoton}
                                                  onPress={registrar}
                                            > Registrarse</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({


    scrollView: {
        flex: 1,
    },
    padre: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ACE3E0',

    }, profile: {
        width: 100, height: 100, borderRadius: 200, marginTop: 75, marginLeft: 10, marginBottom: 50
    },
    cajaInformation: {
        alignItems: 'center', marginBottom: 20
    },
    cajaInformationTexto: {
        alignItems: 'center', fontSize: 30
    },
    tarjeta: {

        margin: 20,
        backgroundColor: '#A0D8DE',
        borderRadius: 10,
        width: "90%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,


    }, cajaTexto: {
        paddingVertical: 20,
        backgroundColor: 'rgba(85,78,78,0.2)',
        borderRadius: 30,
        marginVertical: 10

    }, fila: {
        flexDirection: "row", justifyContent: "space-between", // Asegura que haya espacio entre los elementos
        alignItems: "center", // Alinea verticalmente los textos e inputs
        marginVertical: 10,
    }, inputContainer: {
        flex: 1, // Hace que cada input tenga el mismo ancho
        marginHorizontal: 5, // Da espacio entre inputs


    }, input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'rgba(85,78,78,0.2)',



    }, subTitulos: {
        fontSize: 20,
        marginVertical: 10,
        textAlign: "center",
        fontWeight: "bold",
    }, padreBoton: {
        alignItems: 'center',

    }, cajaBoton: {
        backgroundColor: '#525FE1', borderRadius: 30, paddingVertical: 20, width: 150, marginTop: 20,
    }, textoBoton: {
        color: 'white', textAlign: 'center',

    }, dropdown: {
        height: 50, borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 8,
    },

});