
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
import AdminLogin from './pages/AdminLogin.jsx';
import AdminRoute from './pages/AdminRoute.jsx';
import AdminSetPassword from './pages/AdminSetPassword.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/" element={<App />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/set-password"
          element={<AdminSetPassword />}
        />

        {/* Protected admin pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <AdminRoute>
              <AdminProperties />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <AdminRoute>
              <AdminEnquiries />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
