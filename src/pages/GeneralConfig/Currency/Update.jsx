import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const currencyId = location.pathname.split("/")[5];

    const [inputs, setInputs] = useState({ name: "", description: "", });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { isLoading, error, data } = useQuery(["currencytoUpdate"], () =>
        makeRequest.get(`${serverRoutes.findGeneralCurrencyById}/${currencyId}`).then((response) => {
            return response.data;
        })
    );

    const updateCurrency = async (e) => {
        try {
            e.preventDefault();
            const currency = await makeRequest.put(`${serverRoutes.updateGeneralCurrency}/${currencyId}`, inputs);
            if (currency.data === 1) {
                alert("Registro actualizado correctamente.")
            };
            navigate("/admin/config/currency");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="currency-header">
                <h1>Actualizar Moneda</h1>
                <button>
                    <Link to="/admin/config/currency/">
                    Lista de Monedas
                    </Link>
                </button>
            </div>
            <div className="currency-body">
                {
                        error
                        ? "Error al obtener la lista de monedas"
                        : isLoading
                            ? "Obteniendo lista de monedas" 
                            : (
                                <div className="update-form">
                                    <form action="">
                                        <label htmlFor="name">Id</label>
                                        <input type="text" placeholder={data.id} name='id' disabled />
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" placeholder={data.name} name='name' onChange={handleChange} />
                                        <label htmlFor="exchangeRate">Tipo de Cambio</label>
                                        <input type="text" placeholder={data.exchangeRate} name='exchangeRate' onChange={handleChange} />
                                        <button onClick={updateCurrency}> Actualizar </button>
                                    </form>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

export default Update