/**
 * Componente para crear tabla con lista de países.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Country = ({ country }) => {

    const handleDelete = async (id) => {
        try {
            const country = await makeRequest.delete(`${serverRoutes.deleteLocationCountry}/${id}`);
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
                <td> {country.phoneCode}</td>
                <td> {country.code}</td>
                <td> {country.latitude}</td>
                <td> {country.longitude}</td>
                <td>
                    <button><Link to={`/admin/location/country/update/${country.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(country.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Country