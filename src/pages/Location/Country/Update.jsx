import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config.js/axios'
import { useQuery } from "@tanstack/react-query";

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const countryId = location.pathname.split("/")[4];

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["countryToUpdate"], () =>
        makeRequest.get(`/lm/location/countryById/${countryId}`).then((response) => {
            return response.data;
        })
    );

    const updateCountry = async (e) => {
        try {
            e.preventDefault();
            const country = await makeRequest.put(`/lm/location/country/Update/${countryId}`, inputs);
            if (country.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/location/country");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="country-header">
                <h1>Actualizar País</h1>
                <button>
                    <Link to="/location/country/">
                        Lista de Paises
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
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={data.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={data.name} name='name' onChange={handleChange} />
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