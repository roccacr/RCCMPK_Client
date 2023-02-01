import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Create = () => {

    const inputData = { name: "", description: "", code: ""}
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: null, description: null });


    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [typeSelected, setTypeSelected] = useState({ value: null });

    const handleSelected = (typeOption) => {
        setTypeSelected(typeOption);
    }

    inputData.name = inputs.name;
    inputData.code = inputs.code;
    inputData.description = inputs.description;
    inputData.typeId = typeSelected.value;

    const createSubType = async (e) => {
        e.preventDefault();
        try {
            if (inputData.name === null || inputData.typeId === null || inputData.description === null) {
                alert("No se puede continuar");
                return
            }
            const subType = await makeRequest.post(serverRoutes.createPropertySubType, inputData);
            alert("Registro creado correctamente: " + subType.data.id + " - " + subType.data.name)
            navigate("/admin/property/subType");

        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Bloque para obtener los tipos.
    */

    const options = [];

    const { isLoading, error, data } = useQuery(["typeList"], () =>
        makeRequest.get(serverRoutes.listPropertyType)
            .then((response) => {
                return response.data;
            })
    );

    error
        ? options.push({ value: "0", label: "Error" })
        : isLoading
            ? options.push({ value: "0", label: "Obteniendo Tipos de Propiedad." })
            : data.map(type => {
                options.push({
                    value: type.id,
                    label: type.name,
                });
                return options;
            })

    return (
        <div className='container'>
            <div className="subType-header">
                <h1>Crear SubTipo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/subType/">
                        Lista de Subtipos de propiedad
                    </Link>
                </button>
            </div>
            <div className="subType-body">
                <div className="create-form">
                    <form action="">
                        <Select id="" options={options} onChange={handleSelected} />
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Vivienda' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                        <label htmlFor="description">Descripcion</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={createSubType}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create