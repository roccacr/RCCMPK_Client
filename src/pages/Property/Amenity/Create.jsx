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

    const createAmenity = async (e) => {
        e.preventDefault();
        try {
            const amenity = await makeRequest.post(serverRoutes.createPropertyAmenity, inputs);
            alert("Registro creado correctamente: " + amenity.data.id + " - " + amenity.data.name);
            navigate("/admin/property/amenity");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="amenity-header">
                <h1>Crear Amenidad de Propiedad</h1>
                <button>
                    <Link to="/admin/property/amenity/">
                        Lista de Amenidades de Propiedad
                    </Link>
                </button>
            </div>
            <div className="amenity-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Alquilar' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createAmenity}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create