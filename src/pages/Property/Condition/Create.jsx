import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config/axios'
import {serverRoutes} from '../../../config/config'

const Create = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "", code:"", description:"",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createCondition = async (e) => {
        e.preventDefault();
        try {
            const condition = await makeRequest.post(serverRoutes.createPropertyCondition, inputs);
            alert("Registro creado correctamente: " + condition.data.id + " - " + condition.data.name )
            navigate("/admin/property/condition");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="condition-header">
                <h1>Crear Condición de Propiedad</h1>
                <button>
                    <Link to="/admin/property/condition/">
                        Lista de Condicións de Propiedad
                    </Link>
                </button>
            </div>
            <div className="condition-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Nuevo' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='new' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createCondition}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create