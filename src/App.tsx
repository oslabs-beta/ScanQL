import React from "react";
import { Route, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import "./index.css";
import "./App.css";

import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

const App: React.FC = () => {

  return (
    <RouterProvider router={router} />

  )
}

export default App;