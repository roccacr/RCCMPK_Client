//Bibliotecas
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
//Archivos
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos los componentes relacionadas.
import CountryComponent from '../../../components/Location/Country/Country.jsx';

const Home = () => {

    const { isLoading, error, data } = useQuery(["countries"], () =>
        makeRequest.get(serverRoutes.listLocationCountry)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="countries">
                <button> <Link to={"/administration"}>Volver a Configuración</Link></button>
                <div className="country-header">
                    <h1>Lista de Países</h1>
                    <button>
                        <Link to="/admin/location/country/create">
                            Agregar País
                        </Link>
                    </button>
                </div>
                <div className="country-body">
                    {
                        error
                            ? "Error al obtener la lista de países"
                            : isLoading
                                ? "Obteniendo lista de países"
                                : (<div className='country-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código Teléfono</th>
                                                <th>Código</th>
                                                <th>Latitud</th>
                                                <th>Longitud</th>
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
        </div>
    )
}

export default Home