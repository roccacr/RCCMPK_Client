import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos las páginas relacionadas.
import EstateComponent from '../../../components/Location/Estate/Estate.jsx';
import { Link } from 'react-router-dom';

const Home = () => {

    const { isLoading, error, data } = useQuery(["estates"], () =>
        makeRequest.get(serverRoutes.listLocationEstate)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="estates">
                <button><Link to={"/administration"}>Volver a Ubicación</Link></button>
                <div className="estate-header">
                    <h1>Lista de Estados</h1>
                    <button>
                        <Link to="/admin/location/estate/create">
                            Agregar Estado
                        </Link>
                    </button>
                </div>
                <div className="estate-body">
                    {
                        error
                            ? "Error al obtener la lista de estados"
                            : isLoading
                                ? "Obteniendo estados"
                                : (<div className='estate-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>País</th>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Latitud</th>
                                                <th>Longitud</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {data.map(
                                            (estate) =>
                                                <EstateComponent estate={estate} key={estate.id} />
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