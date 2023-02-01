import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos las páginas relacionadas.
import SubTypeComponent from '../../../components/Property/SubType/SubType.jsx';
import { Link } from 'react-router-dom';

const Home = () => {

    const { isLoading, error, data } = useQuery(["subTypes"], () =>
        makeRequest.get(serverRoutes.listPropertySubType)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="subTypes">
                <button><Link to={"/administration"}>Volver a Configuración</Link></button>
                <div className="subType-header">
                    <h1>Lista de Subtipos de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/subType/create">
                            Agregar SubTipo de Propiedad
                        </Link>
                    </button>
                </div>
                <div className="subType-body">
                    {
                        error
                            ? "Error al obtener la lista de subtipos de propiedad"
                            : isLoading
                                ? "Obteniendo subtipos de propiedad"
                                : (<div className='subType-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Descripcion</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {data.map(
                                            (subType) =>
                                                <SubTypeComponent subType={subType} key={subType.id} />
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