import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const conditionId = location.pathname.split("/")[5];

    const [inputs, setInputs] = useState({ name: "", code: "", description: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["propertyConditionToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyConditionById}/${conditionId}`).then((response) => {
            return response.data;
        })
    );

    const updateCountry = async (e) => {
        try {
            e.preventDefault();
            const condition = await makeRequest.put(`${serverRoutes.updatePropertyCondition}/${conditionId}`, inputs);
            if (condition.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/condition");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="condition-header">
                <h1>Actualizar Condicion de Propiedad</h1>
                <button>
                    <Link to="/admin/property/condition/">
                        Lista de Condiciones de Propiedad.
                    </Link>
                </button>
            </div>
            <div className="condition-body">
                {
                    error
                        ? "Error al obtener la lista de condiciones de propiedad"
                        : isLoading
                            ? "Obteniendo Condiciones de Propiedad"
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
                                        <button onClick={updateCountry}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update