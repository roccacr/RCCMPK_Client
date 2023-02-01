//Bibliotecas
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
//Archivos.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const attributeId = location.pathname.split("/")[5];
    const [inputs, setInputs] = useState({ name: "", description: "", code: "" });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["attributeToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyAttributeById}/${attributeId}`).then((response) => {
            return response.data;
        })
    );

    const updateAttribute = async (e) => {
        try {
            e.preventDefault();
            const attribute = await makeRequest.put(`${serverRoutes.updatePropertyAttribute}/${attributeId}`, inputs);
            if (attribute.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/attribute");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="attribute-header">
                <h1>Actualizar Atributo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/attribute/">
                        Lista de Atributos de propiedad
                    </Link>
                </button>
            </div>
            <div className="attribute-body">
                {
                    error
                        ? "Error al obtener la lista de atributos de propiedad"
                        : isLoading
                            ? "Obteniendo Atributos de propiedad"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="id">Id</label>
                                        <input type="text" placeholder={data.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={data.name} name='name' onChange={handleChange} />
                                        <label htmlFor="code">Código</label>
                                        <input type="text" placeholder={data.code} name='code' onChange={handleChange} />
                                        <label htmlFor="description">Descripcion</label>
                                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                                        <button onClick={updateAttribute}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update