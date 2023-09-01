import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/ui/LoginButton";
import "./index.css";
import "./App.css";
import RouteError from "./components/Errors/RouteError";


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" errorElement={<RouteError/>}>
      <Route index element={<Home />}  />
      {/* <Route index element={<Loading />} /> */}
      <Route path="/dashboard" element={<Dashboard />} errorElement={<RouteError/>} />
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

