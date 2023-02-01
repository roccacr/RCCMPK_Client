import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";

//Importamos las páginas relacionadas.
import TypeComponent from '../../../components/Property/Type/Type';
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

const Home = () => {

    const { isLoading, error, data } = useQuery(["propertyTypes"], () =>
        makeRequest.get(serverRoutes.listPropertyType)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="types">
                <button> <Link to={"/administration"}>Volver a Administración</Link></button>
                <div className="type-header">
                    <h1>Lista de Tipos de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/type/create">
                            Agregar Tipo de Propiedad
                        </Link>
                    </button>
                </div>
                <div className="type-body">
                    {
                        error
                            ? "Error al obtener la lista de tipos de propiedad"
                            : isLoading
                                ? "Obteniendo Paises"
                                : (<div className='type-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Descripción</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {data.map(
                                            (type) =>
                                                <TypeComponent type={type} key={type.id} />
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