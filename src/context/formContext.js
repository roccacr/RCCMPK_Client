import { useState, createContext } from "react";
import { makeRequest } from "../config/axios";
const FormContext = createContext();

export const FormProvider = ({ children }) => {
    //Segmento información propiedad.
    const [mainInfo, setMainInfo] = useState({
        title: "",
        description: "",
        currencyId: "",
        price: "",
    })
    //Segmento información de la propiedad
    const [propertyInfo, setPropertyInfo] = useState({
        condition: "",
        buildYear: "",
        buildSize: "",
        buildWidth: "",
        buildLength: "",
        buildCompany: "",
        buildEngineer: "",
        buildArchitect: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",

    });
    //Opciones Desplegables.
    const [propType, setPropType] = useState('');
    const [propSubType, setPropSubType] = useState('');
    const [propUse, setPropUse] = useState('');
    const [locationCountry, setLocationCountry] = useState('');
    const [locationEstate, setLocationEstate] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [locationDistrict, setLocationDistrict] = useState('');
    //Opciones de tipo arreglo.
    const [estateListOptions, setEstateListOptions] = useState([]);
    const [cityListOptions, setCityListOptions] = useState([]);
    const [districtListOptions, setDistrictListOptions] = useState([]);

    const [currentLocation, setCurrentLocation] = useState(false);

    const [landInfo, setLandInfo] = useState({
        landSize: "",
        landWidth: "",
        landLength: "",
        landTopography: "",
        parcelNumber: "",
        plan: "",
        locationDetails: "",
        locationLatitude: "",
        locationLongitude: "",
    })

    const [otherInfo, setOtherInfo] = useState({
        buildLevels: "",
    })

    const [amenity, setAmenity] = useState({});
    const [attribute, setAttribute] = useState({});

    //Imagenes
    const [selectedImagesForm, setSelectedImagesForm] = useState([]);

    const createFormData = () => {
        const formData = new FormData();
        formData.append("title", mainInfo.title);
        formData.append("description", mainInfo.description);
        formData.append("currencyId", mainInfo.currencyId);
        formData.append("price", mainInfo.price);
        formData.append("useId", propUse.value);
        formData.append("typeId", propType.value);
        formData.append("subTypeId", propSubType.value);
        formData.append("conditionId", propertyInfo.condition);
        formData.append("buildYear", propertyInfo.buildYear);
        formData.append("buildSize", propertyInfo.buildSize);
        formData.append("buildWidth", propertyInfo.buildWidth);
        formData.append("buildLength", propertyInfo.buildLength);
        formData.append("buildCompany", propertyInfo.buildCompany);
        formData.append("buildEngineer", propertyInfo.buildEngineer);
        formData.append("buildArchitect", propertyInfo.buildArchitect);
        formData.append("bedrooms", propertyInfo.bedrooms);
        formData.append("bathrooms", propertyInfo.bathrooms);
        formData.append("parking", propertyInfo.parking);
        formData.append("landSize", landInfo.landSize);
        formData.append("landWidth", landInfo.landWidth);
        formData.append("landLength", landInfo.landLength);
        formData.append("landTopography", landInfo.landTopography);
        formData.append("parcelNumber", landInfo.parcelNumber);
        formData.append("plan", landInfo.plan);
        formData.append("locationDetails", landInfo.locationDetails);
        formData.append("locationLatitude", landInfo.locationLatitude);
        formData.append("locationLongitude", landInfo.locationLongitude);

        for (let i = 0; i < selectedImagesForm.length; i++) {
            console.log(selectedImagesForm[i]);
            formData.append("file", selectedImagesForm[i]);
        }

        return formData
    };

    const registerProperty = async () => {
        const propertyData = createFormData();
        console.log(propertyData);
        const res = await makeRequest.post("/pm/property/createProperty", propertyData);
        console.log("Resultado: ", JSON.stringify(res.data));
    };

    return (
        <FormContext.Provider value={{
            //Segmento información principal.
            mainInfo, setMainInfo,
            locationCountry, setLocationCountry,
            locationEstate, setLocationEstate,
            locationCity, setLocationCity,
            locationDistrict, setLocationDistrict,
            estateListOptions, setEstateListOptions,
            cityListOptions, setCityListOptions,
            districtListOptions, setDistrictListOptions,
            propType, setPropType,
            propSubType, setPropSubType,
            propUse, setPropUse,
            //Segmento información de la propiedad
            propertyInfo, setPropertyInfo,
            currentLocation, setCurrentLocation,
            //Segmento Información del terreno.
            landInfo, setLandInfo,
            //Segmento de otra información.
            otherInfo, setOtherInfo,
            //Imagenes
            selectedImagesForm, setSelectedImagesForm,

            //Función para enviar
            registerProperty,

            //Amenidades: 
            amenity, setAmenity,
            attribute, setAttribute
        }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;