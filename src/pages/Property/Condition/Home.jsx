import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

//Importamos las páginas relacionadas.
import ConditionComponent from '../../../components/Property/Condition/Condition';
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

const Home = () => {

    const { isLoading, error, data } = useQuery(["propertyCondition"], () =>
        makeRequest.get(serverRoutes.listPropertyCondition)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="conditions">
                <button> <Link to={"/administration"}>Volver a Administración</Link></button>
                <div className="condition-header">
                    <h1>Lista de Condiciones de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/condition/create">
                            Agregar Condición de Propiedad
                        </Link>
                    </button>
                </div>
                <div className="condition-body">
                    {
                        error
                            ? "Error al obtener la lista de condiciones de propiedad"
                            : isLoading
                                ? "Obteniendo Condiciones de Propiedad"
                                : (<div className='condition-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Codigo</th>
                                                <th>Descripción</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {data.map(
                                            (condition) =>
                                                <ConditionComponent condition={condition} key={condition.id} />
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