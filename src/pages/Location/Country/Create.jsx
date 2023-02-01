//Biblioteca
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//Archivos
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Create = () => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: "", code: "", phoneCode: "", latitude: "", longitude: "" });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createCountry = async (e) => {
        e.preventDefault();
        try {
            const country = await makeRequest.post(serverRoutes.createLocationCountry, inputs);
            alert("Registro creado correctamente: " + country.data.id + " - " + country.data.name)
            navigate("/admin/location/country");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="country-header">
                <h1>Crear País</h1>
                <button>
                    <Link to="/admin/location/country/">
                        Lista de Paises
                    </Link>
                </button>
            </div>
            <div className="country-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Costa Rica' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='CR' name='code' onChange={handleChange} />
                        <label htmlFor="phoneCode">Teléfono Código</label>
                        <input type="number" placeholder='506' name='phoneCode' onChange={handleChange} />
                        <label htmlFor="latitude">Latitud</label>
                        <input type="text" placeholder='10' name='latitude' onChange={handleChange} />
                        <label htmlFor="longitude">Longitud</label>
                        <input type="text" placeholder='-84' name='longitude' onChange={handleChange} />
                        <button onClick={createCountry}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create