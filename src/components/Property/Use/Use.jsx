/**
 * Componente para crear tabla con lista de países.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Use = ({ use }) => {

    const handleDelete = async (id) => {
        try {
            const use = await makeRequest.delete(`${serverRoutes.deletePropertyUse}/${id}`);
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
                <td> {use.id}</td>
                <td> {use.name}</td>
                <td> {use.code}</td>
                <td> {use.description}</td>
                <td>
                    <button><Link to={`/admin/property/use/update/${use.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(use.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Use