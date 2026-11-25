
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from './components/Loader';
import AdminRoute from './pages/AdminRoute';

import './index.css';

// Load each page only when it is needed
const App = lazy(() => import('./App.jsx'));
const Properties = lazy(() => import('./pages/Properties.jsx'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Expertise = lazy(() => import('./pages/Expertise.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

const Admin = lazy(() => import('./pages/Admin.jsx'));
const AdminProperties = lazy(() => import('./pages/AdminProperties.jsx'));
const AdminEnquiries = lazy(() => import('./pages/AdminEnquiries.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const AdminSetPassword = lazy(() => import('./pages/AdminSetPassword.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
