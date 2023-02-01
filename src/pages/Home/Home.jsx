import React from 'react'

//Importamos la configuración del Axios.
import { makeRequest } from '../../config/axios'
//Importamos lo requerido para utilizar el React-Query
import { useQuery } from "@tanstack/react-query";

//Importamos las páginas relacionadas.
import Property from '../../components/Property/Property.jsx';

//Importamos la hoja de diseño css
import "./home.scss"

const Home = () => {

    //React Query.
    const { isLoading, error, data } = useQuery(["properties"], () =>
        makeRequest.get("/pm/property/allpropertiesResumeDetails").then((response) => {
            return response.data;
        })
    );

    return (
        <div className="main">
            <div className="banner">
                <div className="title">
                    <h1>Sitio en construcción</h1>
                </div>
                <div className="search">
                    <input type="text" placeholder='Cuéntanos lo que te interesa ...' />
                </div>
            </div>
            <div className="container">
                <div className="title">
                    <h4>Ideas Recomendadas para ti</h4>
                    <span> Basado en tu historial</span>
                    <hr />
                </div>
                <div className="properties">
                    {
                        error
                            ? "Error al obtener propiedades"
                            : isLoading
                                ? "Obteniendo Propiedades"
                                : data.map(
                                    (property) =>
                                        //console.log(property)
                                        < Property property = { property } key = { property.id } />
                                )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home