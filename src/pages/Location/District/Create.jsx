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
    const [citySelected, setCitySelected] = useState({ value: null });
    const [estateOptions, setEstateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    //Manejo de los imputs
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleCountrySelected = (countryOption) => {
        setCountrySelected(countryOption);
        updateEstateList(countryOption.value);
    }

    const handleEstateSelected = (estateOption) => {
        setEstateSelected(estateOption);
        updateCityList(estateOption.value);
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
        <div>
            <label htmlFor="">Estado</label>
            <Select id="" defaultValue={selected} options={options} onChange={handleEstateSelected} />
        </div>
    ) : null;

    //Actualiza estados según país seleccionado.
    const updateCityList = (estateId) => {
        console.log("Vamos a cambiar de estado");
        const cityList = [];
        makeRequest.get(`/lm/location/city/ListByEstateId/${estateId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    cityList.push({ value: null, label: "Seleccione una ciudad" });
                    response.data.map(city => {
                        cityList.push({
                            value: city.id,
                            label: city.name,
                        })
                        setCityOptions(cityList);
                        setCitySelected({ value: null })
                        return "Lista correcta."
                    })
                } else {
                    setCityOptions([]);
                    setCitySelected({ value: null })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    //Renderiza lista de estados.
    const RenderCityList = ({ options, selected }) => options.length > 0 ? (
        <div>
            <label htmlFor="">City</label>
            <Select id="" defaultValue={selected} options={options} onChange={setCitySelected} />
        </div>
    ) : null;

    //Asignación de Variables.
    inputData.name = inputs.name;
    inputData.cityId = citySelected.value;
    inputData.code = inputs.code;
    inputData.longitude = inputs.longitude;
    inputData.latitude = inputs.latitude;

    //Creactión de la ciudad.
    const createDistrict = async (e) => {
        e.preventDefault();
        try {
            if (inputData.name === null || inputData.cityId === null) {
                alert("No se puede continuar");
                return
            }
            const district = await makeRequest.post("/lm/location/district/Create", inputData);
            alert("Registro creado correctamente: " + district.data.id + " - " + district.data.name);
            navigate("/admin/location/district");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="district-header">
                <h1>Crear Distrito</h1>
                <button>
                    <Link to="/admin/location/district/">
                        Lista de Distritos
                    </Link>
                </button>
            </div>
            <div className="district-body">
                <div className="create-form">
                    <form action="">
                        <label htmlFor="País"></label>
                        <Select id="" options={countryOptions} onChange={handleCountrySelected} />
                        <RenderEstateList options={estateOptions} selected={estateSelected.value != null ? estateSelected : estateOptions[0]} />
                        <RenderCityList options={cityOptions} selected={citySelected.value != null ? citySelected : cityOptions[0]} />
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Pozos' name='name' onChange={handleChange} />
                        <label htmlFor="code">Código</label>
                        <input type="text" placeholder='12345' name='code' onChange={handleChange} />
                        <label htmlFor="latitude">Latitud</label>
                        <input type="text" placeholder='12.345' name='latitude'onChange={handleChange} />
                        <label htmlFor="longitude">Longitud</label>
                        <input type="text" placeholder='12.345' name='longitude' onChange={handleChange} />
                        <button onClick={createDistrict}> Enviar </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create