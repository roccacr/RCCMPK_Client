//Bibliotecas
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
//Archivos
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos los componentes relacionadas.
import AttributeComponent from '../../../components/Property/Attribute/Attribute';

const Home = () => {
    const { isLoading, error, data } = useQuery(["attributes"], () =>
        makeRequest.get(serverRoutes.listPropertyAttribute)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="attributes">
                <button> <Link to={"/administration"}>Volver a Atributos</Link></button>
                <div className="attribute-header">
                    <h1>Lista de Atributos de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/attribute/create">
                            Agregar Atributos de Propiedad
                        </Link>
                    </button>
                </div>
                <div className="attribute-body">
                    {
                        error
                            ? "Error al obtener la lista de atributos de propiedad"
                            : isLoading
                                ? "Obteniendo atributos de propiedad"
                                : (<div className='attribute-list'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Descripcion</th>
                                                <th colSpan={3}>Aciones</th>
                                            </tr>
                                        </thead>
                                        {data.map(
                                            (attribute) =>
                                                <AttributeComponent attribute={attribute} key={attribute.id} />
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