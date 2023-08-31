import * as React from "react";
import { useEffect } from "react";
import logo from "../assets/logo-horizontal-v2.png";

import NavBar from "../components/layout/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";

import MetricsView from "../components/layout/MetricsView";
import { Button, Container } from "@radix-ui/themes";
import Footer from "../components/layout/Footer";

const Home: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    // useEffect(() => {
    //   if (isAuthenticated) navigate('/dashboard');
    // }, [])

    return (
        <div>
            <div className="home-top-section">
                <NavBar />
                <div className="home-logo-container">
                    <img className="home-logo-nav" src={logo}></img>
                    <p className="home-description-text text-2xl ml-7 text-indigo-900 text-opacity-70">
                        Elegant data visualization for PostgresQL
                    </p>
                    <Button onClick={()=>loginWithRedirect()} className="mt-10 border border-indigo-900">
                        Get Started
                    </Button>
                </div>
                <div className="home-cards-section">
                    <div className="home-card">
                        <h3 className="text-white text-opacity-80 font-semibold mt-5 text-xl">
                            Speed
                        </h3>
                        <p className="mt-3 text-white text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className="home-card">
                        <h3 className="text-white text-opacity-80 font-semibold mt-5 text-xl">
                            Accuracy
                        </h3>
                        <p className="mt-3 text-white text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className="home-card">
                        <h3 className="text-white text-opacity-80 font-semibold mt-5 text-xl">
                            Flexibility
                        </h3>
                        <p className="mt-3 text-sm text-white text-opacity-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                </div>
                <div className="home-gif1-section">Gif1</div>
                <div className="home-gif2-section">Gif2</div>
            </div>
            <div className="home-gif3-section">Gif3</div>
            <Footer></Footer>
        </div>
    );
};

export default Home;
