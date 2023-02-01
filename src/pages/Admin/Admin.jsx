import React from 'react'

import Location from '../../components/Location/Config';
import Property from '../../components/Property/Config';
import "./admin.scss"

const Admin = () => {
    return (
        <div className='admin'>
            <div className="left">
                <Location />
                <Property />
            </div>
            <div className="container">
                <div className="center">Centrado</div>
            </div>
        </div>
    )
}

export default Admin