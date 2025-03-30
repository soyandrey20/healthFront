// Guardar el token
import * as SecureStore from "expo-secure-store";

export const saveToken = async (token) => {
    try {

        await SecureStore.setItemAsync('authToken', token)

    } catch (error) {
        console.log(error);
    }

};

// Obtener el token
export const getToken = async () => {
    return await SecureStore.getItemAsync('authToken');
};