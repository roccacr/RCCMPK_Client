/**
 * Componente para crear tabla con lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Condition = ({ condition }) => {

    const handleDelete = async (id) => {
        try {
            const condition = await makeRequest.delete(`${serverRoutes.deletePropertyCondition}/${id}`);
            if(condition.data === 1) {
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
                <td> {condition.id}</td>
                <td> {condition.name}</td>
                <td> {condition.code}</td>
                <td> {condition.description}</td>
                <td>
                    <button><Link to={`/admin/property/condition/update/${condition.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(condition.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Condition