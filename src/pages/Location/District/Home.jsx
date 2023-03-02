import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';
import HomeComponent from '../../../components/General/Admin/Home'

const Home = () => {
    const type = "Distritos"
    const route = serverRoutes.listLocationDistrict
    const createURL = "/admin/Location/district/create"

    const { isLoading, error, data } = useQuery([type], () =>
        makeRequest.get(route)
            .then((response) => {
                return response.data;
            })
    );
    return (
        <>
            {
                error
                    ? (<h3>Error al obtener la lista de {type}</h3>)
                    : isLoading
                        ? (<h3>Obteniendo la lista de {type}</h3>)
                        : <HomeComponent type={type} data={data} createURL={createURL}/> 
                        
            }
        </>
    )
}

export default Home