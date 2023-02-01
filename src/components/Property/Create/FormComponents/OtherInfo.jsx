import React, { useContext } from 'react'
import FormContext from '../../../../context/formContext';

function OtherInfo() {

    const { propertyCharacteristics, setPropertyCharacteristics,
    } = useContext(FormContext);

    const handlePropertyCharateristcs = (e) => {
        setPropertyCharacteristics({ ...propertyCharacteristics, [e.target.name]: e.target.checked });
    }
    console.log(propertyCharacteristics);

    return (
        <div className='otherInfo'>
            <div className='characteristics'>
                <label htmlFor="livingRoom"> Sala </label>
                <input type="checkbox" name='livingRoom' checked={propertyCharacteristics.livingRoom} onChange={handlePropertyCharateristcs} />
                <label htmlFor="kitchen"> Cocina </label>
                <input type="checkbox" name='kitchen' checked={propertyCharacteristics.kitchen} onChange={handlePropertyCharateristcs} />
                <label htmlFor="cellar"> Bodega </label>
                <input type="checkbox" name='cellar' checked={propertyCharacteristics.cellar} onChange={handlePropertyCharateristcs} />
                <label htmlFor="serviceRoom"> Cuarto de Servicio </label>
                <input type="checkbox" name='serviceRoom' checked={propertyCharacteristics.serviceRoom} onChange={handlePropertyCharateristcs} />
                <label htmlFor="breakfastNook"> Desayunador </label>
                <input type="checkbox" name='breakfastNook' checked={propertyCharacteristics.breakfastNook} onChange={handlePropertyCharateristcs} />
                <label htmlFor="garden"> Jardín </label>
                <input type="checkbox" name='garden' checked={propertyCharacteristics.garden} onChange={handlePropertyCharateristcs} />
                <label htmlFor="officeRoom"> Oficina </label>
                <input type="checkbox" name='officeRoom' checked={propertyCharacteristics.officeRoom} onChange={handlePropertyCharateristcs} />
                <label htmlFor="balcony"> Balcón </label>
                <input type="checkbox" name='balcony' checked={propertyCharacteristics.balcony} onChange={handlePropertyCharateristcs} />
                <label htmlFor="diningRoom"> Comedor </label>
                <input type="checkbox" name='diningRoom' checked={propertyCharacteristics.diningRoom} onChange={handlePropertyCharateristcs} />
                <label htmlFor="terrace"> Terraza </label>
                <input type="checkbox" name='terrace' checked={propertyCharacteristics.terrace} onChange={handlePropertyCharateristcs} />
                <label htmlFor="cleaningRoom"> Cuarto de Pilas </label>
                <input type="checkbox" name='cleaningRoom' checked={propertyCharacteristics.cleaningRoom} onChange={handlePropertyCharateristcs} />
            </div>
            <hr />
            <div className='amenities'>
                <label htmlFor="clubHouse"> Casa Club </label>
                <input type="checkbox" name='clubHouse' checked={propertyCharacteristics.clubHouse} onChange={handlePropertyCharateristcs} />
                <label htmlFor="coffeeBar"> Cafetería </label>
                <input type="checkbox" name='coffeeBar' checked={propertyCharacteristics.coffeeBar} onChange={handlePropertyCharateristcs} />
                <label htmlFor="bathTub"> Tina de Baño </label>
                <input type="checkbox" name='bathTub' checked={propertyCharacteristics.bathTub} onChange={handlePropertyCharateristcs} />
                <label htmlFor="pool"> Piscina </label>
                <input type="checkbox" name='pool' checked={propertyCharacteristics.pool} onChange={handlePropertyCharateristcs} />
            </div>
        </div>
    )
}

export default OtherInfo