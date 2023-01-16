import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config.js/axios'
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const inputData = { countryId: null, name: null }

    const estateId = location.pathname.split("/")[4];

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: null,
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading: isLoadingEstate, error: errorEstate, data: dataEstate } = useQuery(["estateToUpdate"], () =>
        makeRequest.get(`/lm/location/estateById/${estateId}`).then((response) => {
            return response.data;
        }),
    )

    const [countrySelected, setCountrySelected] = useState({
        value: null
    });

    const handleSelected = (countryOption) => {
        setCountrySelected(countryOption);
    }



    const options = [];

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

    inputData.name = inputs.name;
    inputData.countryId = countrySelected.value;

    console.log(inputData);

    const updateEstate = async (e) => {
        try {
            e.preventDefault();

            if (inputData.name === null) {
                console.log("Falta el nombre perrito");
                return;
            }

            if (inputData.countryId === null) {
                inputData.countryId = dataEstate.country.id;
                return;
            }

            console.log(inputData, "Para enviar")

            const estate = await makeRequest.put(`/lm/location/estate/Update/${estateId}`, inputData);
            if (estate.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/location/estate");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="estate-header">
                <h1>Actualizar Estado</h1>
                <button>
                    <Link to="/location/estate/">
                        Lista de Estado
                    </Link>
                </button>
            </div>
            <div className="estate-body">
                {
                    errorEstate
                        ? "Error al obtener información del estado."
                        : isLoadingEstate
                            ? "Obteniendo Información del estado"
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="">País</label>
                                        <Select options={options} defaultValue={{ value: dataEstate.country.id, label: dataEstate.country.name }} onChange={handleSelected} />
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={dataEstate.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={dataEstate.name} name='name' onChange={handleChange} />
                                        <button onClick={updateEstate}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update