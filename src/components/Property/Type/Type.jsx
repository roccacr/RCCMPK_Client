/**
 * Componente para crear tabla con lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Type = ({ type }) => {

    const handleDelete = async (id) => {
        try {
            const type = await makeRequest.delete(`${serverRoutes.deletePropertyType}/${id}`);
            if(type.data === 1) {
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
                <td> {type.id}</td>
                <td> {type.name}</td>
                <td> {type.code}</td>
                <td> {type.description}</td>
                <td>
                    <button><Link to={`/admin/property/type/update/${type.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(type.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Type