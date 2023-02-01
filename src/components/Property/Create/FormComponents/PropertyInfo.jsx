import React, { useContext } from 'react'
import FormContext from '../../../../context/formContext';
import { FaBed, FaShower, FaParking } from "react-icons/fa"

import "./propertyInfo.scss"
import { Form, Row, Col } from 'react-bootstrap';

const currentYear = new Date().getFullYear();

const PropertyInfo = () => {

    const { propertyInfo, setPropertyInfo, } = useContext(FormContext);

    const handlePropertyInfo = (e) => {
        setPropertyInfo({ ...propertyInfo, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Form.Group>
                <Row className="align-items-center">
                    <Col sm={6} className="my-1">
                        <Form.Label>Año de Construcción</Form.Label>
                        <Form.Control type='number' name="buildYear" placeholder="Indique año de construcción" value={propertyInfo.buildYear} onChange={handlePropertyInfo} min="1900" max={currentYear} />
                    </Col>
                    <Col sm={6} className="my-1">
                        <Form.Label>Área en M²</Form.Label>
                        <Form.Control type='number' name="buildSize" placeholder="Área de construcción" value={propertyInfo.buildSize} onChange={handlePropertyInfo} min="0" />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6} className="my-1">
                        <Form.Label>Ancho</Form.Label>
                        <Form.Control type='number' name="buildWidth" placeholder="Ancho lineal" value={propertyInfo.buildWidth} onChange={handlePropertyInfo} min="0" />
                    </Col>
                    <Col sm={6} className="my-1">
                        <Form.Label>Largo</Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Largo lineal." value={propertyInfo.buildLength} onChange={handlePropertyInfo} min="0" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row className="align-items-center">
                    <Col sm={12} className="my-1">
                        <Form.Label>Empresa Constructora</Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Nombre de la empresa encargada de la construcción." value={propertyInfo.buildCompany} onChange={handlePropertyInfo} />
                    </Col>
                    <Col sm={6} className="my-1">
                        <Form.Label>Ingeniero</Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Nombre Ingeniero." value={propertyInfo.buildEngineer} onChange={handlePropertyInfo} />
                    </Col>
                    <Col sm={6} className="my-1">
                        <Form.Label>Arquitecto</Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Nombre Arquitecto." value={propertyInfo.buildArchitect} onChange={handlePropertyInfo} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={4} className="my-1">
                        <Form.Label> # Cuartos <FaBed /></Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Cant. Habitaciones." value={propertyInfo.bedrooms} onChange={handlePropertyInfo} />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label> # Baños <FaShower /></Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Cant. Baños." value={propertyInfo.bathrooms} onChange={handlePropertyInfo} />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label> # Parqueo <FaParking /></Form.Label>
                        <Form.Control type='number' name="buildLength" placeholder="Cant. Espacios parqueo." value={propertyInfo.parking} onChange={handlePropertyInfo} />
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default PropertyInfo