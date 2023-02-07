import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { AuthContext } from "../../context/authContext.js";


const Validate = () => {

    const navigate = useNavigate();

    //Inicializamos el contexto para el manejo de sesión.
    const { setExternalUser } = useContext(AuthContext);

    const queryParameters = new URLSearchParams(window.location.search);
    const ioeua = queryParameters.get("ioeua");
    const emoeua = queryParameters.get("emoeua");

    const decodeBase64 = (data) => {
        return Buffer.from(data, 'base64').toString('utf-8')
    }

    useEffect(() => {
        if (ioeua == null) {
            alert("Hay algo nulo");
            //navigate("/login")
        }
    })

    useEffect(() => {
        const userData = {
            id: decodeBase64(ioeua),
            email: decodeBase64(emoeua),
        }
        try {
            alert("Los datos llegaron bien");
            setExternalUser(userData);
            navigate("/");
        } catch (err) {
            alert(err);
            //navigate("/login");
        }
    }, [navigate, setExternalUser, ioeua, emoeua])

    return (
        <div>
            <h3>Información</h3>
        </div>
    )
}

export default Validate