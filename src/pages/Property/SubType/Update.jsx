import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const inputData = { typeId: null, name: null, code: null, description: null }
    const subTypeId = location.pathname.split("/")[5];
    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: null, code: null, description: null,
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading: isLoadingSubType, error: errorSubType, data: dataSubType } = useQuery(["subTypeToUpdate"], () =>
        makeRequest.get(`${serverRoutes.findPropertySubTypeById}/${subTypeId}`).then((response) => {
            return response.data;
        }),
    )

    const [typeSelected, setTypeSelected] = useState({
        value: null
    });

    const handleSelected = (typeOption) => {
        setTypeSelected(typeOption);
    }



    const options = [];

    const { isLoading: isLoadingTypeList, error: errorTypeList, data: dataTypeList } = useQuery(["typeList"], () =>
        makeRequest.get(serverRoutes.listLocationCountry)
            .then((response) => {
                return response.data;
            })
    );

    errorTypeList
        ? options.push({ value: "0", label: "Error" })
        : isLoadingTypeList
            ? options.push({ value: "0", label: "Obteniendo Tipos de Propiedades." })
            : dataTypeList.map(type => {
                options.push({
                    value: type.id,
                    label: type.name,
                });
                return options;
            })

    inputData.name = inputs.name;
    inputData.code = inputs.code;
    inputData.description = inputs.description;
    inputData.typeId = typeSelected.value;

    const updateSubType = async (e) => {
        try {
            e.preventDefault();

            if (inputData.name === null) {
                console.log("Falta el nombre perrito");
                return;
            }

            if (inputData.typeId === null) {
                inputData.typeId = dataSubType.type.id;
                return;
            }
            const subType = await makeRequest.put(`${serverRoutes.updatePropertySubType}/${subTypeId}`, inputData);
            if (subType.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/property/subType");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="subType-header">
                <h1>Actualizar SubTipo de Propiedad</h1>
                <button>
                    <Link to="/admin/property/subType/">
                        Lista de SubTipos de Propiedad
                    </Link>
                </button>
            </div>
            <div className="subType-body">
                {
                    errorSubType
                        ? "Error al obtener información del subtipo de propiedad."
                        : isLoadingSubType
                            ? "Obteniendo Información del subtipo de propiedad"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="">Tipo</label>
                                        <Select options={options} defaultValue={{ value: dataSubType.type.id, label: dataSubType.type.name }} onChange={handleSelected} />
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={dataSubType.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={dataSubType.name} name='name' onChange={handleChange} />
                                        <label htmlFor="code">Código</label>
                                        <input type="text" placeholder='codigo' name='code' onChange={handleChange} />
                                        <label htmlFor="description">Descripción</label>
                                        <textarea name="description" id="" cols="30" rows="10" placeholder={dataSubType.description} onChange={handleChange}></textarea>
                                        <button onClick={updateSubType}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update