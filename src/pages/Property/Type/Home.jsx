import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { BsFillCaretLeftFill } from 'react-icons/bs'

//Importamos las páginas relacionadas.
import TypeComponent from '../../../components/Property/Type/Type';
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

const Home = () => {

    const { isLoading, error, data } = useQuery(["propertyTypes"], () =>
        makeRequest.get(serverRoutes.listPropertyType)
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
                    <h1>Lista de Tipos de Propiedad</h1>
                </Col>
            </Row>
            <Row className='body'>
                {
                    error
                        ? "Error al obtener la lista de tipos de propiedad"
                        : isLoading
                            ? "Obteniendo tipos de propiedad"
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
                                        (type) =>
                                            <TypeComponent type={type} key={type.id} />
                                    )}
                                </Table>
                            </div>)
                }
            </Row>
            <Row>
                <Col sm={12} className="my-1 d-flex justify-content-end">
                    <Button>
                        <Link to="/admin/property/type/create" style={{ textDecoration: "none", color: "white" }}>
                            Agregar Tipo de Propiedad
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Home