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
    const useId = location.pathname.split("/")[5];
    const [inputs, setInputs] = useState({ name: "", description: "", code:"" });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["useToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyUseById}/${useId}`).then((response) => {
            return response.data;
        })
    );

    const updateUse = async (e) => {
        try {
            e.preventDefault();
            const use = await makeRequest.put(`${serverRoutes.updatePropertyUse}/${useId}`, inputs);
            if (use.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/use");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="use-header">
                <h1>Actualizar Uso de Propiedad</h1>
                <button>
                    <Link to="/admin/property/use/">
                        Lista de Usos de propiedad
                    </Link>
                </button>
            </div>
            <div className="use-body">
                {
                    error
                        ? "Error al obtener la lista de usos de propiedad"
                        : isLoading
                            ? "Obteniendo Usos de propiedad"
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
                                        <button onClick={updateUse}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update