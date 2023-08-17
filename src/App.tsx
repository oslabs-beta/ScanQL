import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route element={<Dashboard />} path="/" />
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;
