import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/login';
import Newproduct from './Pages/Newproduct';
import Signup from './Pages/Signup';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './Pages/Cart';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu/:filterby" element={<Menu />} /> {/* Corrected route */}
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='NewProduct' element={<Newproduct />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='success' element={<Success />} />
      <Route path='cancel' element={<Cancel />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
