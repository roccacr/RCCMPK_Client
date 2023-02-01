import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config/axios'
import {serverRoutes} from '../../../config/config'

const Create = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "", description:"",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createType = async (e) => {
        e.preventDefault();
        try {
            const type = await makeRequest.post(serverRoutes.createPropertyType, inputs);
            alert("Registro creado correctamente: " + type.data.id + " - " + type.data.name )
            navigate("/admin/property/type");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="city-header">
                <h1>Crear Tipo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/type/">
                        Lista de Tipos de Propiedad
                    </Link>
                </button>
            </div>
            <div className="city-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Residencial' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createType}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create