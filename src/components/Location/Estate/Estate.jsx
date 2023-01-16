import React from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../config.js/axios'

const Estate = ({ estate }) => {
    const handleDelete = async (id) => {
        try {
            const estate = await makeRequest.delete(`/lm/location/estate/Delete/${id}`);
            if(estate.data === 1) {
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
                <td> {estate.country.name}</td>
                <td> {estate.id}</td>
                <td> {estate.name}</td>
                <td>
                    <button><Link to={`/location/estate/update/${estate.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(estate.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Estate