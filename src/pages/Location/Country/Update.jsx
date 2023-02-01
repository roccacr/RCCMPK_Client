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
    const countryId = location.pathname.split("/")[5];
    const [inputs, setInputs] = useState({ name: "", code: "", phoneCode: "", latitude: "", longitude: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["countryToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findLocationCountryById}/${countryId}`).then((response) => {
            return response.data;
        })
    );

    const updateCountry = async (e) => {
        try {
            e.preventDefault();
            const country = await makeRequest.put(`${serverRoutes.updateLocationCountry}/${countryId}`, inputs);
            if (country.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/location/country");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="country-header">
                <h1>Actualizar País</h1>
                <button>
                    <Link to="/admin/location/country/">
                        Volver a Lista de Paises
                    </Link>
                </button>
            </div>
            <div className="country-body">
                {
                    error
                        ? "Error al obtener la lista de paises"
                        : isLoading
                            ? "Obteniendo Paises"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="id">Id</label>
                                        <input type="text" placeholder={data.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={data.name} name='name' onChange={handleChange} />
                                        <label htmlFor="code">Código</label>
                                        <input type="text" placeholder={data.code} name='code' onChange={handleChange} />
                                        <label htmlFor="phoneCode">Teléfono Código</label>
                                        <input type="text" placeholder={data.phoneCode} name='phoneCode' onChange={handleChange} />
                                        <label htmlFor="latitude">Latitud</label>
                                        <input type="text" placeholder={data.latitude} name='latitude' onChange={handleChange} />
                                        <label htmlFor="longitude">Longitud</label>
                                        <input type="text" placeholder={data.longitude} name='longitude' onChange={handleChange} />
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