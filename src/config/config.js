module.exports = {
    /**
     * En este parámetro se cambia la forma en que se ejecuta el programa.
     * Los posibles valores son: 
     *      desarrollo
     *      produccion
     */
    ambiente: "desarrollo",
    baseUrl: {
        desarrollo: "http://localhost:3250/api",
        produccion: "http://marketplace.roccacr.com/api",
    },
    serverRoutes: {

        //Propiedades
        getPropertyById: "/pm/property/propertyById",
        
        //Tipos de propiedad:
        listPropertyType: "/pm/property/config/type/List",
        createPropertyType: "/pm/property/config/type/Create",
        updatePropertyType: "/pm/property/config/type/Update",
        findPropertyTypeById: "/pm/property/config/typeById",
        deletePropertyType: "/pm/property/config/type/Delete",
        //Subtipos de Propiedad
        listPropertySubType: "/pm/property/config/subType/List",
        listPropertySubTypeByTypeId: "/pm/property/config/subType/ListByTypeId",
        createPropertySubType: "/pm/property/config/subType/Create",
        updatePropertySubType: "/pm/property/config/subType/Update",
        findPropertySubTypeById: "/pm/property/config/subTypeById",
        deletePropertySubType: "/pm/property/config/subType/Delete",
        //Usos de propiedad:
        listPropertyUse: "/pm/property/config/use/List",
        createPropertyUse: "/pm/property/config/use/Create",
        updatePropertyUse: "/pm/property/config/use/Update",
        findPropertyUseById: "/pm/property/config/useById",
        deletePropertyUse: "/pm/property/config/use/Delete",
        //Condición de propiedad:
        listPropertyCondition: "/pm/property/config/condition/List",
        createPropertyCondition: "/pm/property/config/condition/Create",
        updatePropertyCondition: "/pm/property/config/condition/Update",
        findPropertyConditionById: "/pm/property/config/conditionById",
        deletePropertyCondition: "/pm/property/config/condition/Delete",
        //Características de propiedad:
        listPropertyAttribute: "/pm/property/config/attribute/List",
        createPropertyAttribute: "/pm/property/config/attribute/Create",
        updatePropertyAttribute: "/pm/property/config/attribute/Update",
        findPropertyAttributeById: "/pm/property/config/attributeById",
        deletePropertyAttribute: "/pm/property/config/attribute/Delete",
        //Amenidades de propiedad
        listPropertyAmenity: "/pm/property/config/amenity/List",
        createPropertyAmenity: "/pm/property/config/amenity/Create",
        updatePropertyAmenity: "/pm/property/config/amenity/Update",
        findPropertyAmenityById: "/pm/property/config/amenityById",
        deletePropertyAmenity: "/pm/property/config/amenity/Delete",
        //Topografías de Terreno (Propiedad)
        listLandTopography: "/pm/property/config/landTopography/List",
        createLandTopography: "/pm/property/config/landTopography/Create",
        updateLandTopography: "/pm/property/config/landTopography/Update",
        findLandTopographyById: "/pm/property/config/landTopographyById",
        deleteLandTopography: "/pm/property/config/landTopography/Delete",
        //Ubicaciones - Paises
        listLocationCountry: "/lm/location/country/List",
        createLocationCountry: "/lm/location/country/Create",
        updateLocationCountry: "/lm/location/country/Update",
        findLocationCountryById: "/lm/location/countryById",
        deleteLocationCountry: "/lm/location/country/Delete",
        //Ubicaciones - Estados
        listLocationEstate: "/lm/location/estate/List",
        listLocationEstateByCountryId: "/lm/location/estate/ListByCountryId",
        createLocationEstate: "/lm/location/estate/Create",
        updateLocationEstate: "/lm/location/estate/Update",
        findLocationEstateById: "/lm/location/estateById",
        deleteLocationEstate: "/lm/location/estate/Delete",
        //Ubicaciones - Ciudades
        listLocationCity: "/lm/location/city/List",
        listLocationCityByEstateId: "/lm/location/city/ListByEstateId",
        createLocationCity: "/lm/location/city/Create",
        updateLocationCity: "/lm/location/city/Update",
        findLocationCityById: "/lm/location/cityById",
        deleteLocationCity: "/lm/location/city/Delete",
        //Ubicaciones - Distritos
        listLocationDistrict: "/lm/location/district/List",
        listLocationDistrictByCityId: "/lm/location/district/ListByCityId",
        createLocationDistrict: "/lm/location/district/Create",
        updateLocationDistrict: "/lm/location/district/Update",
        findLocationDistrictById: "/lm/location/districtById",
        deleteLocationDistrict: "/lm/location/district/Delete",
        //General - Moneda
        listGeneralCurrency: "/cm/general/currency/List",
        createGeneralCurrency: "/cm/general/currency/Create",
        updateGeneralCurrency: "/cm/general/currency/Update",
        findGeneralCurrencyById: "/cm/general/currencyById",
        deleteGeneralCurrency: "/cm/general/currency/Delete",
    }

}