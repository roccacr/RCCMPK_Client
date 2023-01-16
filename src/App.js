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
        { path: "/location/country", element: <CountryList /> },
        { path: "/location/country/create", element: <CountryAdd /> },
        { path: "/location/country/update/:id", element: <CountryUpdate /> },
        { path: "/location/estate", element: <EstateList /> },
        { path: "/location/estate/create", element: <EstateAdd /> },
        { path: "/location/estate/update/:id", element: <EstateUpdate /> },
        { path: "/location/city", element: <CityList /> },
        { path: "/location/city/create", element: <CityAdd /> },
        { path: "/location/city/update/:id", element: <CityUpdate /> },
        { path: "/location/district", element: <DistrictList /> },
        { path: "/location/district/create", element: <DistrictAdd /> },
        { path: "/location/district/update/:id", element: <DistrictUpdate /> },
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
