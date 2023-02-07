import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const topographyId = location.pathname.split("/")[5];

    const [inputs, setInputs] = useState({ name: "", description: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["landTopographytoUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyTypeById}/${topographyId}`).then((response) => {
            return response.data;
        })
    );

    const updateTopography = async (e) => {
        try {
            e.preventDefault();
            const topography = await makeRequest.put(`${serverRoutes.updatePropertyType}/${topographyId}`, inputs);
            if (topography.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/topography");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="topography-header">
                <h1>Actualizar Topografía de Terreno</h1>
                <button>
                    <Link to="/admin/property/topography/">
                    Lista de Topografías de Terreno
                    </Link>
                </button>
            </div>
            <div className="topography-body">
                {
                        error
                        ? "Error al obtener la lista de topografías de Terreno"
                        : isLoading
                            ? "Obteniendo topografías de Terreno"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={data.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={data.name} name='name' onChange={handleChange} />
                                        <label htmlFor="code">Código</label>
                                        <input type="text" placeholder={data.code} name='code' onChange={handleChange} />
                                        <label htmlFor="description">Descripcion</label>
                                        <textarea name="description" placeholder={data.description} id="" cols="30" rows="10" onChange={handleChange}></textarea>
                                        <button onClick={updateTopography}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update