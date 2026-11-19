
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import About from './pages/About.jsx';
import Expertise from './pages/Expertise.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import AdminProperties from './pages/AdminProperties.jsx';
import AdminEnquiries from './pages/AdminEnquiries.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
