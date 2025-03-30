
export let url = "http://192.168.1.4:9090"


let _userName = ""; // Variable privada para almacenar el nombre de usuario

export const setGlobalUserName = (username) => {
    _userName = username;
};

export const getGlobalUserName = () => {
    return _userName;
};