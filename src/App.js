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
                <AdminRoute>
                  <Components />
                </AdminRoute>
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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
