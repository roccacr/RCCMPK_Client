/**
 * Componente para crear tabla con lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const SubType = ({ subType }) => {
    console.log(subType);
    const handleDelete = async (id) => {
        try {
            const subType = await makeRequest.delete(`${serverRoutes.deletePropertySubType}/${id}`);
            if (subType.data === 1) {
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
                <td> {subType.type.name}</td>
                <td> {subType.id}</td>
                <td> {subType.name}</td>
                <td> {subType.code}</td>
                <td> {subType.description}</td>
                <td>
                    <button><Link to={`/admin/property/subType/update/${subType.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(subType.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default SubType