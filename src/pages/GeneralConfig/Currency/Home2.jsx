import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';
import HomeComponent from '../../../components/General/Admin/Home'

const Home = () => {
    const type = "Monedas"

    const { isLoading, error, data } = useQuery([type], () =>
        makeRequest.get(serverRoutes.listGeneralCurrency)
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
                        : <HomeComponent type={type} data={data}/> 
                        
            }
        </>
    )
}

export default Home