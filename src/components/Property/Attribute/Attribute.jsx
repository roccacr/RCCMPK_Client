/**
 * Componente para crear tabla con lista de países.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Attribute = ({ attribute }) => {
    const handleDelete = async (id) => {
        try {
            const use = await makeRequest.delete(`${serverRoutes.deletePropertyAttribute}/${id}`);
            if (use.data === 1) {
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
                <td> {attribute.id}</td>
                <td> {attribute.name}</td>
                <td> {attribute.code}</td>
                <td> {attribute.description}</td>
                <td>
                    <button><Link to={`/admin/property/attribute/update/${attribute.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(attribute.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Attribute