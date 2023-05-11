import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import { Header } from './components/header/header.component';
import { Home } from './components/home/home.component';
import { CardProduct } from './components/card-product/card-product.component';
import { BaseLayout } from './components/layout/base.layout';
import { Login } from './components/login/login.component';
import { Checkout } from './components/checkout/checkout.component';
import { AddProduct } from './components/add-product/add-product.component';
import { Upload } from './components/upload';
import { Dashboard } from './components/dashboard/dashboard.component';
import { HomeDashboard } from './components/dashboard/home.component';
import { AddProductAdmin } from './components/dashboard/add-product.component';
import { DeleteProduct } from './components/dashboard/delete-product.component';
import { Register } from './components/register/register.component';
import { Forbidden } from './components/forbidden.component';
import { LoginAdmin } from './components/login-admin/login-admin.component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/forbidden' element={<Forbidden />} />
        </Route>
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin' element={<Dashboard />} >
          <Route path='/admin' element={<HomeDashboard />} />
          <Route path='/admin/add-product' element={<AddProductAdmin />} />
          <Route path='/admin/delete-product' element={<DeleteProduct />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
