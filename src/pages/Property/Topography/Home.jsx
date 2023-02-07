import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { BsFillCaretLeftFill } from 'react-icons/bs'

//Importamos las páginas relacionadas.
import TopographyComponent from '../../../components/Property/Topography/Topography';
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

const Home = () => {

    const { isLoading, error, data } = useQuery(["landTopography"], () =>
        makeRequest.get(serverRoutes.listLandTopography)
            .then((response) => {
                return response.data;
            })
    );

    return (
        <Container>
            <Row className='header'>
                <Col sm={3} className="my-1">
                    <Button> <BsFillCaretLeftFill /><Link to={"/administration"} style={{ textDecoration: "none", color: "white" }}>Volver a Administración</Link></Button>
                </Col>
                <Col sm={9} className="my-1">
                    <h1>Lista de Topografías de Terreno</h1>
                </Col>
            </Row>
            <Row className='body'>
                {
                    error
                        ? "Error al obtener la lista de topografías de Terreno"
                        : isLoading
                            ? "Obteniendo topografías de Terreno"
                            : (<div className='list'>
                                <Table responsive="sm" bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Aciones</th>
                                        </tr>
                                    </thead>
                                    {data.map(
                                        (topography) =>
                                            <TopographyComponent topography={topography} key={topography.id} />
                                    )}
                                </Table>
                            </div>)
                }
            </Row>
            <Row>
                <Col sm={12} className="my-1 d-flex justify-content-end">
                    <Button>
                        <Link to="/admin/property/topography/create" style={{ textDecoration: "none", color: "white" }}>
                            Agregar Topografía de Terreno
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Home