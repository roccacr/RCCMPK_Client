import React from 'react'
import { makeRequest } from '../../../config.js/axios';
import { useQuery } from "@tanstack/react-query";

//Importamos las páginas relacionadas.
import EstateComponent from '../../../components/Location/Estate/Estate.jsx';
import { Link } from 'react-router-dom';

const Home = () => {

    const { isLoading, error, data } = useQuery(["estates"], () =>
        makeRequest.get("/lm/location/estate/List")
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
                        <Link to="/location/estate/create">
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