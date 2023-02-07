import React, { useContext } from 'react'
import FormContext from '../../../../context/formContext';
import { Form, Row, Col } from 'react-bootstrap';

import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../config/axios';
import { serverRoutes } from '../../../../config/config';

function OtherInfo() {

    const propertyAmenityOptions = [];
    const propertyAttributeOptions = [];

    const {
        amenity, setAmenity, attribute, setAttribute
    } = useContext(FormContext);

    const handleAmenity = (e) => {
        setAmenity({ ...amenity, [e.target.name]: e.target.checked });
    }

    const handleAttribute = (e) => {
        setAttribute({ ...attribute, [e.target.name]: e.target.checked });
    }

    //Obtiene las amenidades de propiedad
    const { isLoading: isLoadingPropAmenity, error: errorPropAmenity, data: dataPropAmenity } = useQuery(["propertyAmenities"], () =>
        makeRequest.get(serverRoutes.listPropertyAmenity).then((response) => {
            return response.data
        }),
    )
    console.log(amenity);
    console.log(attribute);

    errorPropAmenity
        ? propertyAmenityOptions.push({ value: "0", label: "Error" })
        : isLoadingPropAmenity
            ? propertyAmenityOptions.push({ value: "0", label: "Obteniendo usos de propiedad." })
            : dataPropAmenity.map(propertyAmenity => {
                propertyAmenityOptions.push({
                    value: propertyAmenity.id,
                    label: propertyAmenity.name,
                    code: propertyAmenity.code,
                });
                return propertyAmenityOptions;
            })

    const RenderPropertyAmenities = ({ options }) => options.length > 0 ? (
        options.map((option) => (
            <Col sm={4} className="my-1">
                <Form.Check type="switch" name={option.code} checked={amenity[option.code]}
                    label={option.label} onChange={handleAmenity} />
            </Col>
        ))
    ) : null;

    //Obtiene las amenidades de propiedad
    const { isLoading: isLoadingPropAttribute, error: errorPropAttribute, data: dataPropAttribute } = useQuery(["propertyAttributes"], () =>
        makeRequest.get(serverRoutes.listPropertyAttribute).then((response) => {
            return response.data
        }),
    )

    errorPropAttribute
        ? propertyAttributeOptions.push({ value: "0", label: "Error" })
        : isLoadingPropAttribute
            ? propertyAttributeOptions.push({ value: "0", label: "Obteniendo usos de propiedad." })
            : dataPropAttribute.map(propertyAttribute => {
                propertyAttributeOptions.push({
                    value: propertyAttribute.id,
                    label: propertyAttribute.name,
                    code: propertyAttribute.code,
                });
                return propertyAttribute;
            })

    const RenderPropertyAttributes = ({ options }) => options.length > 0 ? (
        options.map((option) => (
            <Col sm={4} className="my-1">
                <Form.Check type="switch" name={option.code} checked={attribute[option.code]}
                    label={option.label} onChange={handleAttribute} />
            </Col>
        ))
    ) : null;

    return (
        <>
            <Form.Group>
                <h4>Características de la propiedad</h4>
                <Row className="align-items-center">
                    <RenderPropertyAttributes options={propertyAttributeOptions} />
                </Row>
            </Form.Group>
            <hr />
            <Form.Group>
                <h4>Amenidades de la propiedad</h4>
                <Row className="align-items-center">
                    <RenderPropertyAmenities options={propertyAmenityOptions} />
                </Row>
            </Form.Group>
        </>
    )
}

export default OtherInfo