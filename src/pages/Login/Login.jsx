import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext.js";

//Importamos los elementos de diseño.
import "./login.scss"
import { BsFillHouseFill } from "react-icons/bs"

const Login = () => {
    const navigate = useNavigate(); //useNavigate para redirección.
    const { login } = useContext(AuthContext); //Contexto de Authenticación.
    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        email: "",
        password: "",
    });
    const [err, setErr] = useState(null); //useState para manejo de errores
    const [visible, setVisible] = useState(false); //useState para mostrar errores.
    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleError = () => { //Manejo de Errores
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }

    const handleLogin = async (e) => { //Manejamos la solicitud de inicio de sesión.
        e.preventDefault(); //para los usuarios locales.
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            setErr(err.response.data.msg);
            handleError();
        }
    };
    const google = () => { //Inicio de sesión con google.
        //window.open("http://localhost:3250/api/auth/google", "_self"); //Desarrollo
        window.open("http://marketplace.roccacr.com/api/auth/google", "_self"); //Producción.
    }
    const facebook = () => { //Inicio de sesión con google.
        //window.open("http://localhost:3250/api/auth/facebook", "_self"); //Desarrollo
        window.open("http://marketplace.roccacr.com/api/auth/facebook", "_self"); //Producción.
    }
    //Retornamos contenido HTML a renderizar.
    return (
        <div className='loginForm'>
            <div className="loginForm-container">
                <div className="container-center">
                    <div className="container-center-up">
                        <h1>RCCMKP <BsFillHouseFill /></h1>
                        <h2>Iniciar Sesión</h2>
                        <form action="">
                            <input type="text" placeholder='Correo Electrónico' name="email" onChange={handleChange} />
                            <input type="password" placeholder='Contraseña' name="password" onChange={handleChange} />
                            <button onClick={handleLogin}> Iniciar </button>
                        </form>
                        <div className="container-center-up-error">
                            {visible && err && err}
                        </div>
                    </div>
                    <div className="container-center-middle">
                        <h4>Iniciar con: </h4>
                        <div className="buttons">
                            <button className='container-center-google' id="Google" onClick={google}>Google</button>
                            <button className='container-center-facebook' id='Facebook' onClick={facebook}>Facebook</button>
                        </div>
                    </div>
                    <div className="container-center-down">
                        <span>
                            ¿No tienes una cuenta?
                            <Link to="/register">
                                Registrarse
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login