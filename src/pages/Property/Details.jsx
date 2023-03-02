import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { Container, Row } from 'react-bootstrap';


import { serverRoutes } from '../../config/config';
import { makeRequest } from '../../config/axios';

import DetailsComponent from '../../components/Property/Details/Details'
import Carousel from "../../components/Property/Details/Carousel"

const Details = () => {
    //Obtiene el ID.
    const location = useLocation();
    const propertyId = location.pathname.split("/")[3];
    //Recupera los datos de la propiedad.
    const { isLoading, error, data } = useQuery(["propertyDetails"], async () =>
        await makeRequest.get(`${serverRoutes.getPropertyById}/${propertyId}`).then((response) => {
            return response.data;
        })
    );

    //Manejo la consulta
    if (error)
        return (
            <div>
                <h3> Error al obtener los detalles de la propiedad</h3>
            </div>
        )

    if (isLoading)
        return (
            <div>
                <h3> Cargando los detalles de la propiedad</h3>
            </div>
        )

    if (data) {
        const { propertyImages, ...otherData } = data;
        const {imageUrl, ...other} = propertyImages;
        return (
            <Container>
                <Row>
                    <Carousel imgArray={imageUrl} />
                    {/* <Carousel imgArray={imgUrl} /> */}
                </Row>
                <DetailsComponent data={otherData} />
            </Container>
        )
    }
}

export default Details