import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import MedicinesPage from './pages/MedicinesPage';
import AdminPage from './pages/AdminPage';
import AddMedicine from './pages/AddMedicine';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminManageMedicines from './pages/AdminManageMedicines';
import store from './redux/store.js'
import { Provider } from 'react-redux'
import UpdateMedicine from './pages/UpdateMedicine.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminSignup from './pages/AdminSignup.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/admin/add' element={<AddMedicine />} />
          <Route path='/admin/manage' element={<AdminManageMedicines />} />
          <Route path='/admin/manage/update' element={<UpdateMedicine />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);