import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { RxRulerSquare, RxRulerHorizontal } from 'react-icons/rx'
import { TfiRuler } from 'react-icons/tfi'
import { BsBuilding } from 'react-icons/bs'
import { MdEngineering } from 'react-icons/md'
import ShowerIcon from '@mui/icons-material/Shower';
import BedIcon from '@mui/icons-material/Bed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Details = ({ data }) => {
    console.log(data);
    return (
        <React.Fragment>
            <Row>
                <Col sm={6} className="my-1 d-flex justify-content-start">
                    <h3>{data.title}</h3>
                </Col>
                <Col sm={6} className="my-1 d-flex justify-content-end">
                    <h3>{data.price}</h3>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="my-1">
                    <h5>{data.description}</h5>
                </Col>
            </Row>
            <hr />
            <h4>Detalles de la Construcción:</h4>
            <Row>
                <Col sm={4} className="my-1">
                    <h6><RxRulerSquare /> 'Área': {data.buildDetails.buildSize}</h6>
                    <h6><RxRulerHorizontal /> Ancho: {data.buildDetails.buildWidth}</h6>
                    <h6><TfiRuler /> Largo: {data.buildDetails.buildLength}</h6>
                </Col>
                <Col sm={4} className="my-1">
                    <h6><BedIcon /> 'Cuartos': {data.buildDetails.bedrooms}</h6>
                    <h6><ShowerIcon /> Baños: {data.buildDetails.bathrooms}</h6>
                    <h6><DirectionsCarIcon /> Parqueo: {data.buildDetails.parking}</h6>
                </Col>
                <Col sm={4} className="my-1">
                    <h6><BedIcon /> Arquitecto': {data.buildDetails.buildArchitect}</h6>
                    <h6><MdEngineering /> Ingeniero: {data.buildDetails.buildEngineer}</h6>
                    <h6><BsBuilding /> Empresa Constructora: {data.buildDetails.buildCompany}</h6>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Details