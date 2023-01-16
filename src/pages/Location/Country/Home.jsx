import React from 'react'
import { makeRequest } from '../../../config.js/axios';
import { useQuery } from "@tanstack/react-query";

//Importamos las páginas relacionadas.
import CountryComponent from '../../../components/Location/Country/Country.jsx';
import { Link } from 'react-router-dom';

const Country = () => {

    const { isLoading, error, data } = useQuery(["countries"], () =>
        makeRequest.get("/lm/location/country/List")
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="countries">
            <button> <Link to={"/administration"}>Volver a Ubicación</Link></button>
            <div className="country-header">
                <h1>Lista de Países</h1>
                <button>
                    <Link to="/location/country/create">
                        Agregar País
                    </Link>
                </button>
            </div>
            <div className="country-body">
                {
                    error
                        ? "Error al obtener la lista de paises"
                        : isLoading
                            ? "Obteniendo Paises"
                            : (<div className='country-list'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th colSpan={3}>Aciones</th>
                                        </tr>
                                    </thead>
                                    {data.map(
                                        (country) =>
                                            <CountryComponent country={country} key={country.id} />
                                    )}
                                </table>
                            </div>)
                }
            </div>
        </div>
    )
}

export default Country