import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const typeId = location.pathname.split("/")[5];

    const [inputs, setInputs] = useState({ name: "", description: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["propertyTypeToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyTypeById}/${typeId}`).then((response) => {
            return response.data;
        })
    );

    const updateType = async (e) => {
        try {
            e.preventDefault();
            const type = await makeRequest.put(`${serverRoutes.updatePropertyType}/${typeId}`, inputs);
            if (type.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/type");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="type-header">
                <h1>Actualizar Tipo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/type/">
                        Lista de Tipos de Propiedad.
                    </Link>
                </button>
            </div>
            <div className="type-body">
                {
                    error
                        ? "Error al obtener la lista de tipos de propiedad"
                        : isLoading
                            ? "Obteniendo Tipos de Propiedad"
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
                                        <button onClick={updateType}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update