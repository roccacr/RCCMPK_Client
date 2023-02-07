import React, { useContext, useState } from 'react'
import { Form, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from "react-select";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../config/axios';
import { serverRoutes } from '../../../../config/config';
import FormContext from '../../../../context/formContext';
import MapComponent from '../../../../components/Map/Map';

import "./propertyInfo.scss"

function LandInfo() {

    const { landInfo, setLandInfo, currentLocation, setCurrentLocation,
        locationCountry, setLocationCountry, locationEstate, setLocationEstate,
        locationCity, setLocationCity, locationDistrict, setLocationDistrict,
        estateListOptions, setEstateListOptions,
        cityListOptions, setCityListOptions,
        districtListOptions, setDistrictListOptions
    } = useContext(FormContext);

    const countryListOptions = [];
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(8);

    const handleCurrentLocation = (e) => {
        setCurrentLocation(e.target.checked)
        if (currentLocation) {
            setCoords(({ lat: 0, lng: 0 }));
            setZoom(8);
            setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(0) }));
            setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(0) }));
        } else {
            //Obtiene geoLocalización.
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    //Setea los valores requeridos.
                    setCoords(({ lat: position.coords.latitude, lng: position.coords.longitude }));
                    setZoom(16);
                    setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(position.coords.latitude) }));
                    setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(position.coords.longitude) }));
                },
                (error) => {
                    console.log(error);
                });
        }
    }

    const handleLandInfo = (e) => {
        setLandInfo({ ...landInfo, [e.target.name]: e.target.value })
    }

    const handleLocationCountry = (countryOption) => {
        setLocationCountry(countryOption);
        /**Actualiza Valores Asociados con El mapa. */
        setCoords({ lat: parseFloat(countryOption.latitude), lng: parseFloat(countryOption.longitude) })
        setZoom(8);
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(countryOption.latitude) }));
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(countryOption.longitude) }));

        setLocationEstate('');
        setEstateListOptions([]);
        setLocationCity('');
        setCityListOptions([]);
        setLocationDistrict('');
        setDistrictListOptions([]);
    }


    const handleLocationEstate = (estateOption) => {
        setLocationEstate(estateOption);
        /**Actualiza Valores Asociados con El mapa. */
        setCoords({ lat: parseFloat(estateOption.latitude), lng: parseFloat(estateOption.longitude) });
        setZoom(10);
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(estateOption.latitude) }));
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(estateOption.longitude) }));

        setLocationCity('');
        setCityListOptions([]);
        setLocationDistrict('');
        setDistrictListOptions([]);
    }

    const handleLocationCity = (cityOption) => {
        setLocationCity(cityOption);
        /**Actualiza Valores Asociados con El mapa. */
        setCoords({ lat: parseFloat(cityOption.latitude), lng: parseFloat(cityOption.longitude) });
        setZoom(12);
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(cityOption.latitude) }));
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(cityOption.longitude) }));

        setLocationDistrict('');
        setDistrictListOptions([]);
    }

    const handleLocationDistrict = (districtOption) => {
        setLocationDistrict(districtOption);
        /**Actualiza Valores Asociados con El mapa. */
        setCoords({ lat: parseFloat(districtOption.latitude), lng: parseFloat(districtOption.longitude) });
        setZoom(14);
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLatitude": parseFloat(districtOption.latitude) }));
        setLandInfo(prevLandInfo => ({ ...prevLandInfo, "locationLongitude": parseFloat(districtOption.longitude) }));
    }

    //Obtiene la lista de países.
    const { isLoading: isLoadingCountryList, error: errorCountryList, data: dataCountryList } = useQuery(["countryList"], () =>
        makeRequest.get(serverRoutes.listLocationCountry).then((response) => {
            return response.data
        }),
    )
    errorCountryList
        ? countryListOptions.push({ value: "0", label: "Error" })
        : isLoadingCountryList
            ? countryListOptions.push({ value: "0", label: "Obteniendo lista de países." })
            : dataCountryList.map(country => {
                countryListOptions.push({
                    value: country.id,
                    label: country.name,
                    latitude: country.latitude,
                    longitude: country.longitude,
                });
                return countryListOptions;
            })

    const RenderConditionally = ({ options, selected, onChange, label, type }) => options.length > 0 ? (
        <Form.Group className="mb-3" controlId={`location${type}`}>
            <Form.Label> {label} </Form.Label>
            <Select id="" defaultValue={selected} options={options} onChange={onChange} />
        </Form.Group>
    ) :
        <Form.Group className="mb-3" controlId={`location${type}`}>
            <Form.Label> Error al obtener datos.</Form.Label>
            <Select id="" defaultValue={selected} options={options} isDisabled={true} />
        </Form.Group>;

    //Actualiza lista de estados, basado en el país
    const updateEstateList = async (countryId) => {
        const estateList = [];
        makeRequest.get(`${serverRoutes.listLocationEstateByCountryId}/${countryId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    estateList.push({ value: null, label: "Seleccione un estado" });
                    response.data.map(estate => {
                        estateList.push({
                            value: estate.id,
                            label: estate.name,
                            latitude: estate.latitude,
                            longitude: estate.longitude,
                        })
                        setEstateListOptions(estateList);
                        return "Lista correcta."
                    })
                } else {
                    setEstateListOptions([{ value: null, label: "No hay estados disponibles en este país." }]);
                    setLocationEstate("");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (locationCountry !== '' && estateListOptions.length === 0 && locationEstate === '') {
        updateEstateList(locationCountry.value);
    }

    //Actualiza lista de ciudades, basado en el estado
    const updateCityList = async (estateId) => {
        const cityList = [];
        makeRequest.get(`${serverRoutes.listLocationCityByEstateId}/${estateId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    cityList.push({ value: null, label: "Seleccione una ciudad" });
                    response.data.map(city => {
                        cityList.push({
                            value: city.id,
                            label: city.name,
                            latitude: city.latitude,
                            longitude: city.longitude
                        })
                        setCityListOptions(cityList);
                        return "Lista correcta."
                    })
                } else {
                    setCityListOptions([{ value: null, label: "No hay ciudades disponibles en este estado." }]);
                    setLocationCity("");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (locationEstate !== '' && cityListOptions.length === 0 && locationCity === '') {
        updateCityList(locationEstate.value);
    }

    //Actualiza lista de distritos, basado en la ciudad.
    const updateDistrictList = async (cityId) => {
        const districtList = [];
        makeRequest.get(`${serverRoutes.listLocationDistrictByCityId}/${cityId}`)
            .then((response) => {
                if (response.data.length > 0) {
                    districtList.push({ value: null, label: "Seleccione un distrito" });
                    response.data.map(district => {
                        districtList.push({
                            value: district.id,
                            label: district.name,
                            latitude: district.latitude,
                            longitude: district.longitude
                        })
                        setDistrictListOptions(districtList);
                        setLocationDistrict("");
                        return "Lista correcta."
                    })
                } else {
                    setDistrictListOptions([{ value: null, label: "No hay distritos disponibles en esta ciudad." }]);
                    setLocationDistrict("");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (locationCity !== '' && districtListOptions.length === 0 && locationDistrict === '') {
        updateDistrictList(locationCity.value);
    }

    return (
        <>
            <Form.Group>
                <Row className="align-items-center">
                    <Col sm={4} className="my-1">
                        <Form.Label>Área en M²</Form.Label>
                        <Form.Control type='number' name="landSize" placeholder="Área del terreno" value={landInfo.landSize} onChange={handleLandInfo} min="0" />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label>Ancho</Form.Label>
                        <Form.Control type='number' name="landWidth" placeholder="Ancho Lineal" value={landInfo.landWidth} onChange={handleLandInfo} min="0" />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label>Largo</Form.Label>
                        <Form.Control type='number' name="landLength" placeholder="Largo Lineal" value={landInfo.landLength} onChange={handleLandInfo} min="0" />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={4} className="my-1">
                        <Form.Label>Topografía</Form.Label>
                        <Form.Control type='text' name="landTopography" placeholder="Defina la topografía" value={landInfo.landTopography} onChange={handleLandInfo} />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label>Número de Finca</Form.Label>
                        <Form.Control type='text' name="parcelNumber" placeholder="Defina el número de finca" value={landInfo.parcelNumber} onChange={handleLandInfo} />
                    </Col>
                    <Col sm={4} className="my-1">
                        <Form.Label>Plano (Revisar)</Form.Label>
                        <Form.Control type='text' name="plan" placeholder="Adjunte el plano catastrado" value={landInfo.plan} onChange={handleLandInfo} />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <RenderConditionally
                            options={countryListOptions}
                            selected={locationCountry === "" ? { value: null, label: "Seleccione un país." } : locationCountry}
                            onChange={handleLocationCountry}
                            label="País"
                            type="country"
                        />
                    </Col>
                    <Col sm={3} className="my-1">
                        <RenderConditionally
                            options={estateListOptions}
                            selected={locationEstate === "" ? { value: null, label: "Seleccione un estado." } : locationEstate}
                            onChange={handleLocationEstate}
                            label="Estado"
                            type="estate"
                        />
                    </Col>
                    <Col sm={3} className="my-1">
                        <RenderConditionally
                            options={locationCity === "" ? cityListOptions : [locationCity]}
                            selected={locationCity === "" ? { value: null, label: "Seleccione una provincia." } : locationCity}
                            onChange={handleLocationCity}
                            label="Ciudad"
                            type="city"
                        />
                    </Col>
                    <Col sm={3} className="my-1">
                        <RenderConditionally
                            options={locationDistrict === "" ? districtListOptions : [locationDistrict]}
                            selected={locationDistrict === "" ? { value: null, label: "Seleccione un distrito." } : locationDistrict}
                            onChange={handleLocationDistrict}
                            label="Distrito"
                            type="district"
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row className="align-items-center">
                    <Col sm={12} className="my-1">
                        <Form.Label>Detalle</Form.Label>
                        <Form.Control type='text' name="locationDetails" placeholder="Indique los detalles de la ubicación" value={landInfo.locationDetails} onChange={handleLandInfo} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={5} className="my-1">
                        <Form.Label>Latitud</Form.Label>
                        <Form.Control type='text' name="locationLatitude" placeholder="Indique los detalles de la ubicación" value={landInfo.locationLatitude} onChange={handleLandInfo} />
                    </Col>
                    <Col sm={5} className="my-1">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type='text' name="locationLongitude" placeholder="Indique los detalles de la ubicación" value={landInfo.locationLongitude} onChange={handleLandInfo} />
                    </Col>
                    <Col sm={2} className="my-1">
                        <ButtonGroup className="mb-2">
                            <ToggleButton
                                id="toggle-location"
                                type="checkbox"
                                variant="outline-success"
                                checked={currentLocation}
                                onChange={(e) => handleCurrentLocation(e)}
                            >
                                Ubicación Actual
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Form.Group>
            <div className="info-map-location" style={{ height: "500px", "maxWidth": "100%" }}>
                <MapComponent coords={coords} zoom={zoom} currentLocation={currentLocation} />
            </div>
        </>
    )
}

export default LandInfo