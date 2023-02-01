//Importamos lo necesario del React-Router-Dom!
import {
  createBrowserRouter, //Define las rutas que serán utilizadas por el sitio.
  //Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
//Importamos lo requerido para utilizar el React-Query
import {
  QueryClient,
  QueryClientProvider,
  //useQuery,
} from '@tanstack/react-query'


//Importamos las páginas que usaremos en el App.
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx"
import Create from "./pages/Property/Create.jsx";

//Importamos los componentes a utilizar.
import NavigationBar from "./components/Navbar/NavigationBar.jsx";

//Importamos el Logo y Archivo de Estilos
import './assets/css/App.css';
import Validate from "./pages/validate/Validate.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import CountryList from "./pages/Location/Country/Home.jsx";
import CountryAdd from "./pages/Location/Country/Create.jsx";
import CountryUpdate from "./pages/Location/Country/Update.jsx";
import EstateList from "./pages/Location/Estate/Home.jsx";
import EstateAdd from "./pages/Location/Estate/Create.jsx";
import EstateUpdate from "./pages/Location/Estate/Update.jsx";
import CityList from "./pages/Location/City/Home.jsx";
import CityAdd from "./pages/Location/City/Create.jsx";
import CityUpdate from "./pages/Location/City/Update.jsx";
import DistrictList from "./pages/Location/District/Home.jsx";
import DistrictAdd from "./pages/Location/District/Create.jsx";
import DistrictUpdate from "./pages/Location/District/Update.jsx";
//Configuración de elementos asociados a las propiedades.
import PropertyTypeList from "./pages/Property/Type/Home.jsx";
import PropertyTypeAdd from "./pages/Property/Type/Create.jsx";
import PropertyTypeUpdate from "./pages/Property/Type/Update.jsx";
import PropertySubTypeList from "./pages/Property/SubType/Home.jsx";
import PropertySubTypeAdd from "./pages/Property/SubType/Create.jsx";
import PropertySubTypeUpdate from "./pages/Property/SubType/Update.jsx";
import PropertyUseList from "./pages/Property/Use/Home.jsx";
import PropertyUseAdd from "./pages/Property/Use/Create.jsx";
import PropertyUseUpdate from "./pages/Property/Use/Update.jsx";
import PropertyConditionList from "./pages/Property/Condition/Home.jsx";
import PropertyConditionAdd from "./pages/Property/Condition/Create.jsx";
import PropertyConditionUpdate from "./pages/Property/Condition/Update.jsx";
import PropertyAmenityList from "./pages/Property/Amenity/Home.jsx";
import PropertyAmenityAdd from "./pages/Property/Amenity/Create.jsx";
import PropertyAmenityUpdate from "./pages/Property/Amenity/Update.jsx";
import PropertyAttributeAdd from "./pages/Property/Attribute/Create.jsx"
import PropertyAttributeUpdate from "./pages/Property/Attribute/Update.jsx";
import PropertyAttributeList from "./pages/Property/Attribute/Home.jsx";


function App() {

  /**
   * Inicializamos y configuramos el Query React.
   */
  const queryClient = new QueryClient()


  /**
   * Configuramos el Layout que Se repetirá en las distintas páginas.
   */
  const Layout = () => {
    return (
      <div className="layout">
        {/* <Navbar /> */}
        <NavigationBar />
        <Outlet />
      </div>
    )
  }


  /**
   * Configuramos las rutas que suran utilizadas por el sitio.
   */
  const router = createBrowserRouter([
    {
      //Ruta para Home. (Pantalla Principal!)
      path: "/", element: <Layout />,
      children: [
        { path: "/", element: <Home />, },
        { path: "/property/create", element: <Create /> },
        { path: "/administration", element: <Admin />, },
        { path: "/admin/location/country", element: <CountryList /> },
        { path: "/admin/location/country/create", element: <CountryAdd /> },
        { path: "/admin/location/country/update/:id", element: <CountryUpdate /> },
        { path: "/admin/location/estate", element: <EstateList /> },
        { path: "/admin/location/estate/create", element: <EstateAdd /> },
        { path: "/admin/location/estate/update/:id", element: <EstateUpdate /> },
        { path: "/admin/location/city", element: <CityList /> },
        { path: "/admin/location/city/create", element: <CityAdd /> },
        { path: "/admin/location/city/update/:id", element: <CityUpdate /> },
        { path: "/admin/location/district", element: <DistrictList /> },
        { path: "/admin/location/district/create", element: <DistrictAdd /> },
        { path: "/admin/location/district/update/:id", element: <DistrictUpdate /> },
        { path: "/admin/property/type", element: <PropertyTypeList /> },
        { path: "/admin/property/type/create", element: <PropertyTypeAdd /> },
        { path: "/admin/property/type/update/:id", element: <PropertyTypeUpdate /> },
        { path: "/admin/property/subtype", element: <PropertySubTypeList /> },
        { path: "/admin/property/subtype/create", element: <PropertySubTypeAdd /> },
        { path: "/admin/property/subtype/update/:id", element: <PropertySubTypeUpdate /> },
        { path: "/admin/property/use", element: <PropertyUseList /> },
        { path: "/admin/property/use/create", element: <PropertyUseAdd /> },
        { path: "/admin/property/use/update/:id", element: <PropertyUseUpdate /> },
        { path: "/admin/property/condition", element: <PropertyConditionList /> },
        { path: "/admin/property/condition/create", element: <PropertyConditionAdd /> },
        { path: "/admin/property/condition/update/:id", element: <PropertyConditionUpdate /> },
        { path: "/admin/property/amenity", element: <PropertyAmenityList /> },
        { path: "/admin/property/amenity/create", element: <PropertyAmenityAdd /> },
        { path: "/admin/property/amenity/update/:id", element: <PropertyAmenityUpdate /> },
        { path: "/admin/property/attribute", element: <PropertyAttributeList /> },
        { path: "/admin/property/attribute/create", element: <PropertyAttributeAdd /> },
        { path: "/admin/property/attribute/update/:id", element: <PropertyAttributeUpdate /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/login/validateExternal", element: <Validate /> }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {/* Incluimos el CreateBrowserRouter en el return de la aplicación. */}
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
