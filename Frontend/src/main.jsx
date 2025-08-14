import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import MedicinesPage from './pages/MedicinesPage';
import AdminPage from './pages/AdminPage';
import AddMedicine from './pages/AddMedicine';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/admin/add' element={<AddMedicine />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);