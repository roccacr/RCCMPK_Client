import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Create = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "", description: "",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createTopography = async (e) => {
        e.preventDefault();
        try {
            const topography = await makeRequest.post(serverRoutes.createLandTopography, inputs);
            alert("Registro creado correctamente: " + topography.data.id + " - " + topography.data.name)
            navigate("/admin/property/topography");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="topography-header">
                <h1>Crear Topografía de Terreno</h1>
                <button>
                    <Link to="/admin/property/topography/">
                        Lista de Topografías de Terreno
                    </Link>
                </button>
            </div>
            <div className="topography-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Plano' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createTopography}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create