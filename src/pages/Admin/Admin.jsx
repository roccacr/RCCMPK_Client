import React from 'react'

import GeneralRoutes from '../../components/General/Admin/Routes';
import "./admin.scss"

const Admin = () => {
    return (
        <div className='admin'>
            <div className="left">
                <GeneralRoutes />
            </div>
            <div className="container">
                <div className="center">Centrado</div>
            </div>
        </div>
    )
}

export default Admin