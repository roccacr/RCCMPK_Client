//Biblioteca
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//Archivos
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Create = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: "", code: "", description: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createUse = async (e) => {
        e.preventDefault();
        try {
            const use = await makeRequest.post(serverRoutes.createPropertyUse, inputs);
            alert("Registro creado correctamente: " + use.data.id + " - " + use.data.name)
            navigate("/admin/property/use");

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='container'>
            <div className="use-header">
                <h1>Crear Uso de Propiedad</h1>
                <button>
                    <Link to="/admin/property/use/">
                        Lista de Usos de Propiedad
                    </Link>
                </button>
            </div>
            <div className="use-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Alquilar' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createUse}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create