/**
 * Componente para crear tabla con lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config.js/axios'

const City = ({city}) => {
    //Función para eliminar ciudades.
    const handleDelete = async (id) => {
        try {
            const city = await makeRequest.delete(`/lm/location/city/Delete/${id}`);
            if(city.data === 1) {
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
                <td> {city.estate.country.name}</td>
                <td> {city.estate.name}</td>
                <td> {city.id}</td>
                <td> {city.name}</td>
                <td>
                    <button><Link to={`/location/city/update/${city.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(city.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default City