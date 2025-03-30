import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";


import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import Register from "../screens/Register";
import ResetPassword from "../screens/ResetPassword";
import NewPasswordScreen from "../screens/NewPassword";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// 🔹 Definir el Tab Navigator
function MyTabs() {
    return (
        <Tab.Navigator>


            <Tab.Screen name="Home" component={Home} options={{
                title: 'Inicio', headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Icon name="home" color={color} size={size}/>
                ),
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                title: 'Perfil', headerShown: false
                , tabBarIcon: ({color, size}) => (
                    <Icon name="person" color={color} size={size}/>
                ),
            }}/>
            <Tab.Screen name="Setting" component={Setting} options={{
                title: 'Ajustes', headerShown: false
                , tabBarIcon: ({color, size}) => (
                    <Icon name="settings" color={color} size={size}/>
                ),

            }}/>
        </Tab.Navigator>
    );
}

// 🔹 Definir el Stack Navigator
export default function MyStack() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Login',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={MyTabs}
                    options={{
                        title: 'Home',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: 'Perfil',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        title: 'Ajustes',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Registro',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        title: 'Recuperar Contraseña',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="NewPassword"
                    component={NewPasswordScreen}
                    options={{
                        title: 'Nueva Contraseña',
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
