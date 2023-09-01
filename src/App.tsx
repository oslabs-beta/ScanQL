import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./App.css";
import RouteError from "./components/Errors/RouteError";
import About from "./pages/About";


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" errorElement={<RouteError/>}>
      <Route index element={<Home />}  />
      <Route path="/dashboard" element={<Dashboard />} errorElement={<RouteError/>} />
      <Route path="/about" element={<About />} />
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
    <div className="h-screen">
      <div className="mt-20 error-box">
        <h1>404</h1>
        <p>Page Not Found</p>
        </div>
      </div>
  )
}

export default App;

