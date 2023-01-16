/**
 * Página para visualizar la lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config.js/axios';

//Importamos los componentes relacionadas.
import DistrictComponent from '../../../components/Location/District/District.jsx'

const Home = () => {
    //Inician consultas a la base de datos.
    const { isLoading, error, data } = useQuery(["districts"], () =>
        makeRequest.get("/lm/location/district/List")
            .then((response) => {
                return response.data;
            })
    );
    return (
        <div className="container">
            <div className="districts">
                <button><Link to={"/administration"}>Volver a Ubicación</Link></button>
                <div className="district-header">
                    <h1>Lista de Distritos</h1>
                    <button>
                        <Link to="/location/district/create">
                            Agregar Distritos
                        </Link>
                    </button>
                </div>
                <div className="district-body">
                    {/* Validamos información obtenida desde BD. */}
                    {
                        error
                            ? "Error al obtener la lista de Distritos"
                            : isLoading
                                ? "Obteniendo Distritos"
                                : (<div className='District-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>País</th>
                                                <th>Estado</th>
                                                <th>Ciudad</th>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {/* Iteramos y pasamos al componente. */}
                                        {data.map(
                                            (district) =>
                                                <DistrictComponent district={district} key={district.id} />
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