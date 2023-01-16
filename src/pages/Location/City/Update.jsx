/**
 * Página de actualización para las ciudades.
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

    const options = [];
    const estateId = location.pathname.split("/")[4];
    const inputData = { name: null, estateId: null }

    const [inputs, setInputs] = useState({ name: null, });
    const [countrySelected, setCountrySelected] = useState({ value: "default" });
    const [estateSelected, setEstateSelected] = useState({ value: 'default' });
    const [estateOptions, setEstateOptions] = useState([]);

    //Declaración de funciones para manejo de los inputs.
    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCountrySelected = (countryOption) => {
        setCountrySelected(countryOption);
        updateEstateList(countryOption.value);
    };

    //Funciones para recolectar información desde la base de datos.
    //Obtener Lista de Paises
    const { isLoading: isLoadingCountryList, error: errorCountryList, data: dataCountryList } = useQuery(["countryList"], () =>
        makeRequest.get("/lm/location/country/List")
            .then((response) => {
                return response.data;
            })
    );
    errorCountryList
        ? options.push({ value: "0", label: "Error" })
        : isLoadingCountryList
            ? options.push({ value: "0", label: "Obteniendo Países." })
            : dataCountryList.map(country => {
                options.push({
                    value: country.id,
                    label: country.name,
                });
                return options;
            })
    //Obtiene el país asociado a la ciudad actual.
    const { isLoading: isLoadingCity, error: errorCity, data: dataCity } = useQuery(["cityToUpdate"], () =>
        makeRequest.get(`/lm/location/cityById/${estateId}`).then((response) => {
            updateEstateList(response.data.estate.country.id, "webLoading");
            return response.data;
        }),
    )

    //Actualiza la lista de estados, con base al país seleccionado.
    const updateEstateList = (countryId, eventType) => {
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
    const RenderConditionally = ({ options, selected }) => options.length > 0 ? (
        <Select id="" defaultValue={selected} options={options} onChange={setEstateSelected} />
    ) : null;

        //Establece la información definida en los formularios en una variable.
        inputData.name = inputs.name;
        inputData.estateId = estateSelected.value;
    
        //Función para procesar la actualización de la ciudad.
        const updateCity = async (e) => {
            try {
                e.preventDefault();
    
                if (inputData.name === null) {
                    console.log("El nombre no puede quedar en blanco");
                    return;
                }
    
                if (inputData.estateId === null) {
                    inputData.countryId = dataCity.estate.id;
                    return;
                }
    
                const estate = await makeRequest.put(`/lm/location/city/Update/${estateId}`, inputData);
                if (estate.data === 1) {
                    alert("Registro actualizado correctamente.")
                };
                navigate("/location/city");
            } catch (error) {
                console.log(error);
            }
        }
    //Inicia segmento HTML.
    return (
        <div className='container'>
            <div className="city-header">
                <h1>Actualizar Ciudad</h1>
                <button>
                    <Link to="/location/city/">
                        Lista de Ciudades
                    </Link>
                </button>
            </div>
            <div className="city-body">
                {
                    errorCity
                        ? "Error al obtener información de la ciudad."
                        : isLoadingCity
                            ? "Obteniendo Información de la ciudad"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="">País</label>
                                        <Select options={options}
                                            defaultValue={
                                                { value: dataCity.estate.country.id, label: dataCity.estate.country.name }
                                            }
                                            onChange={handleCountrySelected} />
                                        <label htmlFor="">Estado</label>
                                        <RenderConditionally options={estateOptions}
                                            selected={
                                                estateSelected.value === 'default' ?
                                                    { value: dataCity.estate.id, label: dataCity.estate.name }
                                                    : estateSelected.value != null
                                                        ? estateSelected
                                                        : estateOptions[0]
                                            } />
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={dataCity.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={dataCity.name} name='name' onChange={handleChange} />
                                        <button onClick={updateCity}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update