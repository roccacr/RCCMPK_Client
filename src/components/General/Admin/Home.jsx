import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { BsFillCaretLeftFill } from 'react-icons/bs'

const HomeComponent = ({ type, data, createURL }) => {

    console.log(data);

    return (
        <Container>
            <Row className='header'>
                <Col sm={3} className="my-1">
                    <Button> <BsFillCaretLeftFill /><Link to={"/administration"} style={{ textDecoration: "none", color: "white" }}>Volver a Administración</Link></Button>
                </Col>
                <Col sm={9} className="my-1">
                    <h1>Lista de {type}</h1>
                </Col>
            </Row>
            <Row className='body'>
                {data.length > 0 ?
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((item, index) => {
                                    return (<th> {item}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.keys(item).map((key, index) => {
                                            if (typeof item[key] !== "object") {
                                                return (<td key={index}> {item[key]}</td>)
                                            } else {
                                                return (<td key={index}> {item[key].name}</td>)
                                            }
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    :
                    <h3>No hay existen registros de {type}</h3>
                }
            </Row>
            <Row>
                <Col sm={12} className="my-1 d-flex justify-content-end">
                    <Button>
                        <Link to={createURL} style={{ textDecoration: "none", color: "white" }}>
                            Agregar {type}
                        </Link>
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeComponent