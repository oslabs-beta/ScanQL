import React from "react";
import { Route, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/ui/LoginButton";
// import Signup from "./pages/Signup";
import "./index.css";
import "./App.css";
import { useAuth0 } from '@auth0/auth0-react'

import Layout from "./Layout";
import Loading from "./components/ui/Loading";

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home />} />
      {/* <Route index element={<Loading />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

const App: React.FC = () => {

  return (
    <RouterProvider router={router} />
  )
}

function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  )
}

export default App;

