import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext.js";

import "./register.scss"

import { BsFillHouseFill } from "react-icons/bs"

const Register = () => {
    //Inicializamos el UseNavigate para redirigir a los sitios.
    const navigate = useNavigate()

    //Inicializamos el contexto para el manejo de sesión.
    const { register } = useContext(AuthContext);

    //Creamos el UseState para actualizar y obtener el valor de los inputs.
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    //Craemos el UseState para manejo y seteo de errores del proceso.
    const [err, setErr] = useState(null);

    //Manejamos los cambios que suceden en los inputs.
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //Manejamos la solicitud de inicio de sesión.
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(inputs);
            navigate("/")
        } catch (err) {
            console.log(err);
            setErr(err.response.data.msg);
            handleError();
        }
    };


    //Creamos el UseState para la visibilidad del error.
    const [visible, setVisible] = useState(false);

    const handleError = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }

    return (
        <div className='registerForm'>
            <div className="registerForm-container">
                <div className="container-center">
                    <div className="container-center-up">
                        <h1>RCCMKP <BsFillHouseFill /></h1>
                        <h2>Registro de usuario</h2>
                        <form action="">
                            <input type="text" placeholder='Correo Electrónico' name="email" onChange={handleChange} />
                            <input type="password" placeholder='Contraseña' name="password" onChange={handleChange} />
                            <button onClick={handleRegister}> Registrarse </button>
                        </form>
                        <div className="container-center-up-error">
                            {visible && err && err}
                        </div>
                    </div>
                    <div className="container-center-middle">
                        <h4>Registrarse con: </h4>
                        <div className="buttons">
                            <button className='container-center-google' id="Google">Google</button>
                            <button className='container-center-facebook' id='Facebook'>Facebook</button>
                        </div>
                    </div>
                    <div className="container-center-down">
                        <span>
                            ¿Ya posees cuenta?
                            <Link to="/login">
                                Iniciar sesión
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register