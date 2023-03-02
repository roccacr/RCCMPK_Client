//Biblioteca
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
//Archivos
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Create = () => {
    const typeListOptions = [];

    //Obtiene la lista de tipos.
    const { isLoading: isLoadingTypes, error: errorTypes, data: dataTypes } = useQuery(["typeList"], () =>
        makeRequest.get(serverRoutes.listPropertyType).then((response) => {
            return response.data
        }),
    )
    errorTypes
        ? typeListOptions.push({ value: "0", label: "Error" })
        : isLoadingTypes
            ? typeListOptions.push({ value: "0", label: "Obteniendo lista de tipos." })
            : dataTypes.map(topography => {
                typeListOptions.push({
                    value: topography.id,
                    label: topography.name,
                });
                return typeListOptions;
            })

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: "", code: "", description: "", });
    const [typesList, setTypesList] = useState([]);

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTypesArray = (e) => {
        if (!typesList.includes(e.target.value)) {
            setTypesList(prevTypesList => [...prevTypesList, e.target.value]);
        } else {
            setTypesList(prevTypesList => [...prevTypesList.filter((type) => type !== e.target.value)]);
        }
    };

    const createAttribute = async (e) => {
        e.preventDefault();
        inputs.typesList = typesList;
        try {
            const attribute = await makeRequest.post(serverRoutes.createPropertyAttribute, inputs);
            alert("Registro creado correctamente: " + attribute.data.id + " - " + attribute.data.name)
            navigate("/admin/property/attribute/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="attribute-header">
                <h1>Crear Atributo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/attribute/">
                        Lista de Atributos de Propiedad
                    </Link>
                </button>
            </div>
            <div className="attribute-body">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Describa el nombre de la caracteristica" name='name' onChange={handleChange} />
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control type="text" placeholder="Describa el código de la caracteristica" name='code' onChange={handleChange} />
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control as="textarea" rows={3} name='description' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipos</Form.Label>
                        <br />
                        {dataTypes && typeListOptions.length > 0 && (
                            typeListOptions?.map((type) => {
                                return (
                                    <Form.Check
                                        inline
                                        key={type.value}
                                        type="switch"
                                        id="custom-switch"
                                        label={type.label}
                                        value={type.value}
                                        onChange={(e) => handleTypesArray(e)}
                                    />
                                )
                            })
                        )}
                    </Form.Group>
                    <Button variant="primary" onClick={createAttribute}> Crear </Button>
                </Form>
            </div>
        </div>
    )
}

export default Create