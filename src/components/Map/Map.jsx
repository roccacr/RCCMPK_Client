import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { googleMapsKeyApi } from "../../config/mapsConfig";

const libraries = ['places'];

const Map = ({ coords, zoom, currentLocation }) => {
    //Use State para marcadores
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (currentLocation) {
            setMarker({ lat: coords.lat, lng: coords.lng });
        }
    }, [currentLocation, coords]);

    //Carga el script del mapa.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsKeyApi,
        libraries: libraries
    })

    //Valida el mapa, para validar si no ha cargado
    if (!isLoaded) {
        return <div>
            <h1>Cargando</h1>
        </div>
    }

    return (
        <GoogleMap
            //Propiedades
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={coords}
            zoom={zoom}
            //Eventos:
            onClick={(event) => {
                setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            }}
        >
            {marker && <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />}
        </GoogleMap>
    )
}

export default Map