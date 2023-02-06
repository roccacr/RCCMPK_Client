import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../config/axios';
import { serverRoutes } from '../../../../config/config';
import FormContext from '../../../../context/formContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./mainInfo.scss"

function MainInfo() {

    const {
        mainInfo, setMainInfo,
        propType, setPropType,
        propSubType, setPropSubType,
        propUse, setPropUse,
        propertyInfo, setPropertyInfo,
    } = useContext(FormContext);

    const propertyTypeOptions = [];
    const propertyUseOptions = [];
    const propConditionOptions = [];
    const [propSubTypeOptions, setPropSubTypeOptions] = useState([]);

    const handlePropertyInfo = (e) => {
        setPropertyInfo({ ...propertyInfo, [e.target.name]: e.target.value })
    }

    const handlePropType = (pTypeOption) => {
        setPropType(pTypeOption)
        updatePropSubType(pTypeOption.value);
    }

    const handlePropSubType = (pSubTypeOption) => {
        setPropSubType(pSubTypeOption);
    }

    const handlePropUse = (useOption) => {
        setPropUse(useOption);
    }

    const handleMainInfo = (e) => {
        setMainInfo({ ...mainInfo, [e.target.name]: e.target.value })
    }

    //Obtiene las condiciones de propiedad
    const { isLoading: isLoadingPropCondition, error: errorPropCondition, data: dataPropCondition } = useQuery(["propertyConditions"], () =>
        makeRequest.get(serverRoutes.listPropertyCondition).then((response) => {
            return response.data
        }),
    )
    errorPropCondition
        ? propConditionOptions.push({ value: "0", label: "Error" })
        : isLoadingPropCondition
            ? propConditionOptions.push({ value: "0", label: "Obteniendo usos de propiedad." })
            : dataPropCondition.map(propertyCondition => {
                propConditionOptions.push({
                    value: propertyCondition.id,
                    label: propertyCondition.name,
                });
                return propConditionOptions;
            })

    const RenderPropertyConditions = ({ options }) => options.length > 0 ? (
        options.map((option) => (
            //console.log(option.value)
            <Form.Group key={option.value} inline="true">
                <Form.Check name="condition" checked={propertyInfo.condition == parseInt(option.value)} label={option.label} value={option.value} onChange={handlePropertyInfo} type="radio" />
            </Form.Group>
        ))
    ) : null;

    //Obtiene los usos de propiedad
    const { isLoading: isLoadingPropUse, error: errorPropUse, data: dataPropUse } = useQuery(["propertyUses"], () =>
        makeRequest.get(serverRoutes.listPropertyUse).then((response) => {
            return response.data
        }),
    )
    errorPropUse
        ? propertyUseOptions.push({ value: "0", label: "Error" })
        : isLoadingPropUse
            ? propertyUseOptions.push({ value: "0", label: "Obteniendo usos de propiedad." })
            : dataPropUse.map(propertyUse => {
                propertyUseOptions.push({
                    value: propertyUse.id,
                    label: propertyUse.name,
                });
                return propertyUseOptions;
            })

    const RenderConditionally = ({ options, selected, onChange, label, type }) => options.length > 0 ? (
        <Form.Group className="mb-3" controlId={`property${type}`}>
            <Form.Label> {label} </Form.Label>
            <Select id="" defaultValue={selected} options={options} onChange={onChange} />
        </Form.Group>
    ) :
        <Form.Group className="mb-3" controlId={`property${type}`}>
            <Form.Label> Error al obtener datos.</Form.Label>
            <Select id="" defaultValue={selected} options={options} isDisabled={true} />
        </Form.Group>;

    //Obtiene los tipos de propiedad
    const { isLoading: isLoadingPropType, error: errorPropType, data: dataPropType } = useQuery(["propertyTypes"], () =>
        makeRequest.get(serverRoutes.listPropertyType).then((response) => {
            return response.data
        }),
    )
    errorPropType
        ? propertyTypeOptions.push({ value: "0", label: "Error" })
        : isLoadingPropType
            ? propertyTypeOptions.push({ value: "0", label: "Obteniendo Países." })
            : dataPropType.map(propertyType => {
                propertyTypeOptions.push({
                    value: propertyType.id,
                    label: propertyType.name,
                });
                return propertyTypeOptions;
            })

    const updatePropSubType = async (typeId) => {
        const subTypeList = [];
        makeRequest.get(`${serverRoutes.listPropertySubTypeByTypeId}/${typeId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    subTypeList.push({ value: null, label: "Seleccione un estado" });
                    response.data.map(subType => {
                        subTypeList.push({
                            value: subType.id,
                            label: subType.name,
                        })
                        setPropSubTypeOptions(subTypeList);
                        setPropSubType("");
                        return "Lista correcta."
                    })
                } else {
                    setPropSubTypeOptions([]);
                    setPropSubType("");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Form.Group className="mb-3" controlId="property">
                <Row className="align-items-center">
                    <Col sm={4} className="my-1">
                        <RenderConditionally
                            options={propertyUseOptions}
                            selected={propUse === "" ? { value: null, label: "Seleccione un uso de propiedad." } : propUse}
                            onChange={handlePropUse}
                            label="Uso de la propiedad"
                            type="use"
                        />
                    </Col>
                    <Col sm={4} className="my-1">
                        <RenderConditionally
                            options={propertyTypeOptions}
                            selected={propType === "" ? { value: null, label: "Seleccione un tipo de propiedad." } : propType}
                            onChange={handlePropType}
                            label="Tipo de Propiedad"
                            type="type"
                        />
                    </Col>
                    <Col sm={4} className="my-1">
                        <RenderConditionally
                            options={propSubType === "" ? propSubTypeOptions : [propSubType]}
                            selected={propSubType === "" ? { value: null, label: "Seleccione un subtipo de propiedad." } : propSubType}
                            onChange={handlePropSubType}
                            label="Subtipo de propiedad"
                            type="subType"
                        />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={12} className="my-1">
                        <Form.Label >Condición de la Propiedad</Form.Label>
                        <RenderPropertyConditions options={propConditionOptions} />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mainInfo-general">
                <Row className="align-items-center">
                    <Col sm={12} className="my-1">
                        <Form.Label> Titulo </Form.Label>
                        <Form.Control type='text' name="" placeholder="Ingrese un titulo para su publicación" value={mainInfo.title} onChange={handleMainInfo} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6} className="my-1">
                        <Form.Label> Moneda </Form.Label>
                        <Form.Control type='text' name="" placeholder="Defina la moneda" value={mainInfo.currencyId} onChange={handleMainInfo} />
                    </Col>
                    <Col sm={6} className="my-1">
                        <Form.Label> Precio </Form.Label>
                        <Form.Control type='number' name="" placeholder="Defina un precio para la propiedad" value={mainInfo.price} onChange={handleMainInfo} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={12} className="my-1">
                        <Form.Label> Precio </Form.Label>
                        <Form.Control as='textarea' name="" placeholder="Detallanos acerca de la para la propiedad" value={mainInfo.description} onChange={handleMainInfo} />
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default MainInfo