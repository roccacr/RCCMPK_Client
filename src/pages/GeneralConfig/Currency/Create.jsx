import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'
import { Form, Button } from 'react-bootstrap';

const Create = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ //useState para setear los inputs 
        name: "", exchangeRate: "", code: "", simbol: "",
    });

    const handleChange = (e) => { //Leer valor de inputs y asignarlo
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const createCurrency = async (e) => {
        e.preventDefault();
        try {
            const currency = await makeRequest.post(serverRoutes.createGeneralCurrency, inputs);
            alert("Registro creado correctamente: " + currency.data.id + " - " + currency.data.name)
            navigate("/admin/config/currency");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="currency-header">
                <h1>Crear Moneda</h1>
                <button>
                    <Link to="/admin/config/currency/">
                        Lista de Monedas
                    </Link>
                </button>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Describa el nombre de la moneda" name='name' onChange={handleChange} />
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control type="text" placeholder="Describa el código de la moneda" name='code' onChange={handleChange} />
                    <Form.Label>Símbolo</Form.Label>
                    <Form.Control type="text" placeholder="Indique el simbolo de la moneda" name='simbol' onChange={handleChange} />
                    <Form.Label>Tipo de Cambio</Form.Label>
                    <Form.Control type="text" placeholder="Indique el tipo de cambio de la moneda" name='exchangeRate' onChange={handleChange} />
                </Form.Group>
            </Form>
            <Button onClick={createCurrency}> Enviar </Button>
        </div >
    )
}

export default Create