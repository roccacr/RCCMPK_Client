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
    const amenityId = location.pathname.split("/")[5];
    const [inputs, setInputs] = useState({ name: "", description: "", code: "" });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["amenityToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertyAmenityById}/${amenityId}`).then((response) => {
            return response.data;
        })
    );

    const updateAmenity = async (e) => {
        try {
            e.preventDefault();
            const amenity = await makeRequest.put(`${serverRoutes.updatePropertyAmenity}/${amenityId}`, inputs);
            if (amenity.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/amenity");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="amenity-header">
                <h1>Actualizar Amenidad</h1>
                <button>
                    <Link to="/admin/property/use/">
                        Lista de Amenidades
                    </Link>
                </button>
            </div>
            <div className="amenity-body">
                {
                    error
                        ? "Error al obtener la lista de amenidades"
                        : isLoading
                            ? "Obteniendo Amenidades"
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
                                        <button onClick={updateAmenity}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update