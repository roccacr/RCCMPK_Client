/**
 * Página de creación de distritos.
 */

//Importamos las bibliotecas necesarias.
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'

const Create = () => {
    //Declaración de variables, objetos y hooks.
    const navigate = useNavigate();

    const countryOptions = [];
    const inputData = { estateId: "", name: "", code: "", latitude: "", longitude: "", }

    const [inputs, setInputs] = useState({ name: null });
    const [countrySelected, setCountrySelected] = useState({ value: null });
    const [estateSelected, setEstateSelected] = useState({ value: null });
    const [estateOptions, setEstateOptions] = useState([]);

    //Manejo de los imputs
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleCountrySelected = (countryOption) => {
        setCountrySelected(countryOption);
        updateEstateList(countryOption.value);
    }

    //Obtiene países desde BD y los guarda en arreglo.
    const { isLoading: isLoadingCountryList, error: errorCountryList, data: dataCountryList } = useQuery(["countryList"], () =>
        makeRequest.get("/lm/location/country/List")
            .then((response) => {
                return response.data;
            })
    );

    errorCountryList
        ? countryOptions.push({ value: "0", label: "Error" })
        : isLoadingCountryList
            ? countryOptions.push({ value: "0", label: "Obteniendo Países." })
            : dataCountryList.map(country => {
                countryOptions.push({
                    value: country.id,
                    label: country.name,
                });
                return countryOptions;
            })

    //Actualiza estados según país seleccionado.
    const updateEstateList = (countryId) => {
        console.log("Vamos a cambiar de país");
        const estateList = [];
        makeRequest.get(`/lm/location/estate/ListByCountryId/${countryId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    estateList.push({ value: null, label: "Seleccione un estado" });
                    response.data.map(estate => {
                        estateList.push({
                            value: estate.id,
                            label: estate.name,
                        })
                        setEstateOptions(estateList);
                        setEstateSelected({ value: null })
                        return "Lista correcta."
                    })
                } else {
                    setEstateOptions([]);
                    setEstateSelected({ value: null })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    //Renderiza lista de estados.
    const RenderEstateList = ({ options, selected }) => options.length > 0 ? (
        <Select id="" defaultValue={selected} options={options} onChange={setEstateSelected} />
    ) : null;

    //Asignación de Variables.
    inputData.name = inputs.name;
    inputData.estateId = estateSelected.value;
    inputData.code = inputs.code;
    inputData.latitude = inputs.latitude;
    inputData.longitude = inputs.longitude;

    //Creación de la ciudad.
    const createCity = async (e) => {
        e.preventDefault();
        try {
            if (inputData.name === null || inputData.estateId === null) {
                alert("No se puede continuar");
                return
            }
            const city = await makeRequest.post("/lm/location/city/Create", inputData);
            alert("Registro creado correctamente: " + city.data.id + " - " + city.data.name);
            navigate("/admin/location/city");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container'>
            <div className="city-header">
                <h1>Crear Ciudad</h1>
                <button>
                    <Link to="/admin/location/city/">
                        Lista de Ciudades
                    </Link>
                </button>
            </div>
            <div className="city-body">
                <div className="create-form">
                    <form action="">
                        <Select id="" options={countryOptions} onChange={handleCountrySelected} />
                        <RenderEstateList options={estateOptions} selected={estateSelected.value != null ? estateSelected : estateOptions[0]} />
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Perez Zeledón' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='PZ' name='code' onChange={handleChange} />
                        <label htmlFor="latitude">Latitud</label>
                        <input type="text" placeholder='0' name='latitude' onChange={handleChange} />
                        <label htmlFor="longitude">Longitud</label>
                        <input type="text" placeholder='0' name='longitude' onChange={handleChange} />
                        <button onClick={createCity}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create