import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../config/axios";

/** Creamos un contexto, en este caso seré utilizado por autenticación. */
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Validamos y definimos la información del usuario, este  usuario debe ser obtenido desde la base de datos.
    const [currentUser, setCurrentUser] = useState(
        //Buscamos en el LocalStorage si existe una llave con nombre user, y obtenemos el valor.
        //En caso de no existir, lo definimos en nulo.
        JSON.parse(localStorage.getItem("user")) || null
    );

    /**Esta es una funcionalidad falsa, del usuario Login, en el próximo video será modificada. 
     * Porque debe obtener la información desde el API y desde la BD.
    */
    const login = async (inputs) => {
        const res = await makeRequest.post("/auth/localLogin", inputs, {
            withCredentials: true
        })

        setCurrentUser(res.data)
    };


    /**
     * Esta es la funcionalidad para el registro de los usuarios.
     * Obtiene la información desde el servidor y base de datos.
     */

    const register = async (inputs) => {
        const res = await makeRequest.post("/auth/localRegister", inputs, {
            withCredentials: true,
        })
        setCurrentUser(res.data);
    }

    /**
     * Esta es la funcionalidad para cerrar la sesión del usuario.
     */
    const logout = async () => {
        await makeRequest.post("/auth/logout");
        setCurrentUser(null);
    }

    /**
     * Método para establecer la información del usuario desde autenticación externa.
     */

    const setExternalUser = async (data) => {
        setCurrentUser(data);
    }

    /** El Use Effect se encargará de guaardar un objeto en la memoria Local, por esta razón es importante guardarlo como String.
     * Esto lo logramos haciendo un JSON.stringify del usuario.
     */
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, setExternalUser }}>
            {children}
        </AuthContext.Provider>
    );
};