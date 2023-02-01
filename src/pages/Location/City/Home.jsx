/**
 * Página para visualizar la lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom';
import { makeRequest } from '../../../config/axios';
import { useQuery } from "@tanstack/react-query";

//Importamos los componentes relacionadas.
import CityComponent from '../../../components/Location/City/City.jsx'

const Home = () => {
    //Inician consultas a la base de datos.
    const { isLoading, error, data } = useQuery(["cities"], () =>
        makeRequest.get("/lm/location/city/List")
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="cities">
                <button><Link to={"/administration"}>Volver a Ubicación</Link></button>
                <div className="city-header">
                    <h1>Lista de Ciudades</h1>
                    <button>
                        <Link to="/admin/location/city/create">
                            Agregar Ciudad
                        </Link>
                    </button>
                </div>
                <div className="city-body">
                    {/* Validamos información obtenida desde BD. */}
                    {
                        error
                            ? "Error al obtener la lista de Ciudades"
                            : isLoading
                                ? "Obteniendo Ciudades"
                                : (<div className='city-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>País</th>
                                                <th>Estado</th>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Latitud</th>
                                                <th>Longitud</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {/* Iteramos y pasamos al componente. */}
                                        {data.map(
                                            (city) =>
                                                <CityComponent city={city} key={city.id} />
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