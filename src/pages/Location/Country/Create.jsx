import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config.js/axios'

const Create = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createCountry = async (e) => {
        e.preventDefault();
        try {
            const country = await makeRequest.post("/lm/location/country/Create", inputs);
            alert("Registro creado correctamente: " + country.data.id + " - " + country.data.name )
            navigate("/location/country");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="country-header">
                <h1>Crear País</h1>
                <button>
                    <Link to="/location/country/">
                        Lista de Paises
                    </Link>
                </button>
            </div>
            <div className="country-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Costa Rica' name='name' onChange={handleChange} />
                        <button onClick={createCountry}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create