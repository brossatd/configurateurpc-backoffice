import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Components from './pages/Components';
import Categories from './pages/Categories';
import Partners from './pages/Partners';
import Login from './pages/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';
import AddComponent from './pages/AddComponent';
import EditComponent from './pages/EditComponent';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import AddPartner from './pages/AddPartner';
import EditPartner from './pages/EditPartner';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Account from './pages/Account';
import Configurations from './pages/Configurations';
import AddConfiguration from './pages/AddConfiguration';
import EditConfiguration from './pages/EditConfiguration';
import ConfigurationDetail from './pages/ConfigurationDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '2rem' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/users" element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              } />
              <Route path="/components" element={
                <PrivateRoute>
                  <Components />
                </PrivateRoute>
              } />
              <Route path="/categories" element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              } />
              <Route path="/partners" element={
                <PrivateRoute>
                  <Partners />
                </PrivateRoute>
              } />
              <Route path="/components/add" element={
                <AdminRoute>
                  <AddComponent />
                </AdminRoute>
              } />
              <Route path="/components/edit/:id" element={
                <AdminRoute>
                  <EditComponent />
                </AdminRoute>
              } />
              <Route path="/categories/add" element={
                <AdminRoute>
                  <AddCategory />
                </AdminRoute>
              } />
              <Route path="/categories/edit/:id" element={
                <AdminRoute>
                  <EditCategory />
                </AdminRoute>
              } />
              <Route path="/partners/add" element={
                <AdminRoute>
                  <AddPartner />
                </AdminRoute>
              } />
              <Route path="/partners/edit/:id" element={
                <AdminRoute>
                  <EditPartner />
                </AdminRoute>
              } />
              <Route path="/users/add" element={
                <AdminRoute>
                  <AddUser />
                </AdminRoute>
              } />
              <Route path="/users/edit/:id" element={
                <AdminRoute>
                  <EditUser />
                </AdminRoute>
              } />
              <Route path="/account" element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              } />
              <Route path="/configurations" element={
                <PrivateRoute>
                  <Configurations />
                </PrivateRoute>
              } />
              <Route path="/configurations/add" element={
                <PrivateRoute>
                  <AddConfiguration />
                </PrivateRoute>
              } />
              <Route path="/configurations/edit/:id" element={
                <PrivateRoute>
                  <EditConfiguration />
                </PrivateRoute>
              } />
              <Route path="/configurations/:id" element={
                <PrivateRoute>
                  <ConfigurationDetail />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
