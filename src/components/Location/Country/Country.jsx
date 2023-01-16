import React from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../config.js/axios'

const Country = ({ country }) => {

    const handleDelete = async (id) => {
        try {
            const country = await makeRequest.delete(`/lm/location/country/Delete/${id}`);
            if(country.data === 1) {
                alert("Registro eliminado correctamente.")
            };
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tbody>
            <tr>
                <td> {country.id}</td>
                <td> {country.name}</td>
                <td>
                    <button><Link to={`/location/country/update/${country.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(country.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Country