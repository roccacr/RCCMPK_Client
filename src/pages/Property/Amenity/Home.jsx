//Bibliotecas
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
//Archivos
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

//Importamos los componentes relacionadas.
import AmenityComponent from '../../../components/Property/Amenity/Amenity';

const Home = () => {
    const { isLoading, error, data } = useQuery(["amenities"], () =>
        makeRequest.get(serverRoutes.listPropertyAmenity)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <div className="container">
            <div className="amenities">
                <button> <Link to={"/administration"}>Volver a Amenidades</Link></button>
                <div className="amenity-header">
                    <h1>Lista de Amenidades de Propiedad</h1>
                    <button>
                        <Link to="/admin/property/use/amenity">
                            Agregar Amenidades
                        </Link>
                    </button>
                </div>
                <div className="amenity-body">
                    {
                        error
                            ? "Error al obtener la lista de amenidades para la propiedad"
                            : isLoading
                                ? "Obteniendo Amenidades de Propiedad"
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
                                            (amenity) =>
                                                <AmenityComponent use={amenity} key={amenity.id} />
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