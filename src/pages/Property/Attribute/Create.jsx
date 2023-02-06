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

    const createAttribute = async (e) => {
        e.preventDefault();
        try {
            const attribute = await makeRequest.post(serverRoutes.createPropertyAttribute, inputs);
            alert("Registro creado correctamente: " + attribute.data.id + " - " + attribute.data.name)
            navigate("/admin/property/attribute/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="attribute-header">
                <h1>Crear Atributo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/attribute/">
                        Lista de Atributos de Propiedad
                    </Link>
                </button>
            </div>
            <div className="attribute-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Terraza' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createAttribute}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create