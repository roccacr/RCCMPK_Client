import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Create = () => {

    const inputData = { countryId: "", name: "", code: "", latitude: "", longitude: "", }
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: null });


    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [countrySelected, setCountrySelected] = useState({
        value: null
    });

    const handleSelected = (countryOption) => {
        setCountrySelected(countryOption);
    }

    inputData.name = inputs.name;
    inputData.code = inputs.code;
    inputData.latitude = inputs.latitude;
    inputData.longitude = inputs.longitude;
    inputData.countryId = countrySelected.value;

    const createEstate = async (e) => {
        e.preventDefault();
        try {
            if (inputData.name === null || inputData.countryId === null) {
                alert("No se puede continuar");
                return
            }
            const estate = await makeRequest.post(serverRoutes.createLocationEstate, inputData);
            alert("Registro creado correctamente: " + estate.data.id + " - " + estate.data.name)
            navigate("/admin/location/estate");

        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Bloque para obtener los países.
    */

    const options = [];

    const { isLoading, error, data } = useQuery(["countryList"], () =>
        makeRequest.get(serverRoutes.listLocationCountry)
            .then((response) => {
                return response.data;
            })
    );

    error
        ? options.push({ value: "0", label: "Error" })
        : isLoading
            ? options.push({ value: "0", label: "Obteniendo Países." })
            : data.map(country => {
                options.push({
                    value: country.id,
                    label: country.name,
                });
                return options;
            })

    return (
        <div className='container'>
            <div className="estate-header">
                <h1>Crear Estado</h1>
                <button>
                    <Link to="/admin/location/estate/">
                        Volver a Lista de Estados
                    </Link>
                </button>
            </div>
            <div className="estate-body">
                <div className="create-form">
                    <form action="">
                        <Select id="" options={options} onChange={handleSelected} />
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='San José' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='SJ' name='code' onChange={handleChange} />
                        <label htmlFor="latitude">Latitud</label>
                        <input type="text" placeholder='0' name='latitude' onChange={handleChange} />
                        <label htmlFor="longitude">Longitud</label>
                        <input type="text" placeholder='0' name='longitude' onChange={handleChange} />
                        <button onClick={createEstate}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create