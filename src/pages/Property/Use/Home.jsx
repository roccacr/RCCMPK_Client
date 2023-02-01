//Bibliotecas
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
//Archivos
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos los componentes relacionadas.
import UseComponent from '../../../components/Property/Use/Use.jsx';

const Home = () => {
    const { isLoading, error, data } = useQuery(["uses"], () =>
        makeRequest.get(serverRoutes.listPropertyUse)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="uses">
                <button> <Link to={"/administration"}>Volver a Usos</Link></button>
                <div className="use-header">
                    <h1>Lista de Usos de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/use/create">
                            Agregar Uso de Propiedad
                        </Link>
                    </button>
                </div>
                <div className="use-body">
                    {
                        error
                            ? "Error al obtener la lista de usos de propiedad"
                            : isLoading
                                ? "Obteniendo Usos de propiedad"
                                : (<div className='use-list'>
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
                                            (use) =>
                                                <UseComponent use={use} key={use.id} />
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