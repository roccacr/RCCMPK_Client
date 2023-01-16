/**
 * Página de actualización para los distritos.
 */
//Importamos las bibliotecas necesarias.
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config.js/axios'

const Update = () => {

    //Declaración de variables, objetos y hooks.
    const navigate = useNavigate();
    const location = useLocation();

    const countryOptions = [];
    const districtId = location.pathname.split("/")[4];
    const inputData = { name: "default", cityId: "default" }

    const [inputs, setInputs] = useState({ name: null, });
    const [countrySelected, setCountrySelected] = useState({ value: "default" });
    const [estateSelected, setEstateSelected] = useState({ value: 'default' });
    const [citySelected, setCitySelected] = useState({ value: "default" });
    const [estateOptions, setEstateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);


    //Declaración de funciones para manejo de los inputs.
    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCountrySelected = (countryOption) => {
        setCountrySelected(countryOption);
        updateEstateList(countryOption.value);
    };

    const handleEstateSelected = (estateOption) => {
        setEstateSelected(estateOption);
        updateCityList(estateOption.value);
    }

    //Funciones para recolectar información desde la base de datos.
    //Obtener Lista de Paises
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
    //Obtiene el país asociado a la ciudad actual.
    const { isLoading: isLoadingDistrict, error: errorDistrict, data: dataDistrict } = useQuery(["districtToUpdate"], () =>
        makeRequest.get(`/lm/location/districtById/${districtId}`).then((response) => {
            updateEstateList(response.data.city.estate.country.id,
                response.data.city.estate.id,
                "webLoading"
            );
            return response.data;
        }),
    )

    //Actualiza la lista de estados, con base al país seleccionado.
    const updateEstateList = (countryId, estateId, eventType) => {
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
                        if (eventType === 'webLoading') {
                            setEstateSelected({ value: "default" })
                            updateCityList(estateId, 'webLoading')
                        } else {
                            setEstateSelected({ value: null })
                        }
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

    //Renderiza la lista de estados disponibles, solo si existen.
    const RenderEstateList = ({ options, selected }) => options.length > 0 ? (
        <div>
            <label htmlFor="">Estado</label>
            <Select id="" defaultValue={selected} options={options} onChange={handleEstateSelected} />
        </div>
    ) : null;

    //Actualiza estados según país seleccionado.
    const updateCityList = (estateId, eventType) => {
        const cityList = [];
        makeRequest.get(`/lm/location/city/ListByCountryId/${estateId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    cityList.push({ value: null, label: "Seleccione una ciudad" });
                    response.data.map(city => {
                        cityList.push({
                            value: city.id,
                            label: city.name,
                        })
                        setCityOptions(cityList);
                        if (eventType === 'webLoading') {
                            setCitySelected({ value: "default" })
                        } else {
                            setCitySelected({ value: null })
                        }
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

    //Establece la información definida en los formularios en una variable.
    inputData.name = inputs.name;
    inputData.cityId = citySelected.value;

    //Función para procesar la actualización del distrito.
    const updateDistrict = async (e) => {
        try {
            e.preventDefault();

            if (inputData.name === null) {
                console.log("El nombre no puede quedar en blanco");
                return;
            }

            if (inputData.cityId === 'default') {
                inputData.countryId = dataDistrict.city.id;
            }

            if (inputData.cityId === null) {
                console.log("Debe seleccionar una ciudad válida");
                return;
            }

            const estate = await makeRequest.put(`/lm/location/district/Update/${districtId}`, inputData);
            if (estate.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/location/district");
        } catch (error) {
            console.log(error);
        }
    }
    //Inicia segmento HTML.
    return (
        <div className='container'>
            <div className="district-header">
                <h1>Actualizar Distrito</h1>
                <button>
                    <Link to="/location/district/">
                        Lista de Distritos
                    </Link>
                </button>
            </div>
            <div className="district-body">
                {
                    errorDistrict
                        ? "Error al obtener información del distrito."
                        : isLoadingDistrict
                            ? "Obteniendo Información del distrito"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="">País</label>
                                        <Select options={countryOptions}
                                            defaultValue={
                                                { value: dataDistrict.city.estate.country.id, label: dataDistrict.city.estate.country.name }
                                            }
                                            onChange={handleCountrySelected} />
                                        <RenderEstateList options={estateOptions}
                                            selected={
                                                estateSelected.value === 'default' ?
                                                    { value: dataDistrict.city.estate.id, label: dataDistrict.city.estate.name }
                                                    : estateSelected.value != null
                                                        ? estateSelected
                                                        : estateOptions[0]
                                            } />
                                        <RenderCityList options={cityOptions}
                                            selected={
                                                citySelected.value === 'default' ?
                                                    { value: dataDistrict.city.id, label: dataDistrict.city.name }
                                                    : estateSelected.value != null
                                                        ? citySelected
                                                        : cityOptions[0]
                                            } />
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={dataDistrict.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={dataDistrict.name} name='name' onChange={handleChange} />
                                        <button onClick={updateDistrict}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update