import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';

//Importamos el contexto de autenticación.
import { AuthContextProvider } from "./context/authContext.js";
import { FormProvider } from './context/formContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

