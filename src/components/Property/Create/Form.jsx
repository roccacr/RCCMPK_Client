/**
 * Formulario para creación de inmuebles.
 */

//Importamos las bibliotecas necesarias.
import React, { useState, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';

//Importamos los componentes del formulario.
import MainInfo from './FormComponents/MainInfo';
import PropertyInfo from './FormComponents/PropertyInfo'
import LandInfo from './FormComponents/LandInfo';
import OtherInfo from './FormComponents/OtherInfo';
import Upload from './FormComponents/Upload';
import FormContext from '../../../context/formContext';

const FormProperty = () => {
    const [page, setPage] = useState(0);
    const { registerProperty } = useContext(FormContext);

    const FormTitles = ["Información Principal", "Información de la propiedad", "Información del Terreno", "Características y Amenidades", "Carga de Imagenes"];
    const forward = (e) => { setPage((currentPage) => currentPage + 1); };
    const back = (e) => { setPage((currentPage) => currentPage - 1); };
    const DisplayFormElement = () => {
        if (page === 0) { return <MainInfo /> }
        else if (page === 1) { return <PropertyInfo /> }
        else if (page === 2) { return <LandInfo /> }
        else if (page === 3) { return <OtherInfo /> }
        else { return <Upload /> }
    };

    return (
        <div className="container">
            <div className='container-progressBar'>

            </div>
            <div className="container-form">
                <div className='form-title'>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="form-middle">
                    <Form>
                        {DisplayFormElement()}
                    </Form>
                </div>
                <div className="form-down">
                    <Row className="align-items-center">
                        <Col sm={6} className="my-1 d-flex justify-content-end">
                            <Button
                                variant='primary'
                                size='lg'
                                disabled={page === 0}
                                onClick={back}>
                                Anterior</Button>
                        </Col>
                        <Col sm={6} className="my-1 d-flex justify-content-start">
                            {page === FormTitles.length - 1 ? (
                                <Button
                                    variant='success'
                                    size='lg'
                                    onClick={registerProperty}>
                                    Enviar
                                </Button>
                            ) : <Button
                                variant='primary'
                                size='lg'
                                disabled={page === FormTitles.length - 1}
                                onClick={forward}>
                                Siguiente
                            </Button>}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default FormProperty