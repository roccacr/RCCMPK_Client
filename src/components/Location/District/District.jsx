/**
 * Componente para crear tabla con lista de distritos.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config.js/axios'

const District = ({ district }) => {
    //Función para eliminar ciudades.
    const handleDelete = async (id) => {
        try {
            const district = await makeRequest.delete(`/lm/location/district/Delete/${id}`);
            if (district.data === 1) {
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
                <td> {district.city.estate.country.name}</td>
                <td> {district.city.estate.name}</td>
                <td> {district.city.name}</td>
                <td> {district.id}</td>
                <td> {district.name}</td>
                <td>
                    <button><Link to={`/location/district/update/${district.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(district.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default District