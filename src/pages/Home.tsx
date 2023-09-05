import * as React from "react";
import { useEffect } from "react";
import logo from "../assets/logo-horizontal-v2.png";
import screenshot1 from "../assets/screenshots/screenshot1.jpg";
import screenshot2 from "../assets/screenshots/screenshot2.jpg";
import screenshot3 from "../assets/screenshots/screenshot3.jpg";

import { FaceIcon, ImageIcon, SunIcon, LightningBoltIcon, Crosshair2Icon} from '@radix-ui/react-icons'

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

    useEffect(() => {
      if (isAuthenticated) navigate('/dashboard');
    }, [])

    return (
        <div>
            <div>
                <NavBar />
                <div className="home-logo-container">
                    <img className="home-logo-nav" src={logo}></img>
                    <p className="home-description-text text-2xl ml-7 text-indigo-900 text-opacity-70">
                        Elegant data visualization for PostgresQL
                    </p>
                    <Button
                        onClick={() => loginWithRedirect()}
                        className="mt-10 border border-indigo-900 border border-opacity-30 bg-indigo-900 bg-opacity-50 text-gray-200 rounded-lg"
                    >
                        Get Started
                    </Button>
                </div>
                <div className="home-cards-section">
                    <div className="home-card">
                        <LightningBoltIcon height={30} width={30} className="text-white mt-4"></LightningBoltIcon>
                        <h3 className="text-white text-opacity-80 font-semibold mt-3 text-xl">
                            Speed
                        </h3>
                        <p className="mt-3 text-white text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{" "}
                        </p>
                    </div>
                    <div className="home-card">
                    <Crosshair2Icon height={30} width={30} className="text-white mt-4"></Crosshair2Icon>
                        <h3 className="text-white text-opacity-80 font-semibold mt-5 text-xl">
                            Accuracy
                        </h3>
                        <p className="mt-3 text-white text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{" "}
                        </p>
                    </div>
                    <div className="home-card">
                    <ImageIcon height={30} width={30} className="text-white mt-4"></ImageIcon>
                        <h3 className="text-white text-opacity-80 font-semibold mt-5 text-xl">
                            Flexibility
                        </h3>
                        <p className="mt-3 text-sm text-white text-opacity-80">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{" "}
                        </p>
                    </div>
                </div>
                <div className="home-section1">
                    <div className="home-panel">
                        <h2 className="mt-10 font-semibold text-3xl text-white text-opacity-80">
                            Database Metrics
                        </h2>
                        <p className="mt-10 text-white text-opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={screenshot1}></img>
                    </div>
                </div>
                <div className="home-section2">
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={screenshot2}></img>
                    </div>
                    <div className="home-panel">
                        <h2 className="mt-10 font-semibold text-3xl text-white text-opacity-80">
                            Entity Relationship Diagrams
                        </h2>
                        <p className="mt-10 text-white text-opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
            <div className="home-section1">
            <div className="home-panel">
                        <h2 className="mt-10 font-semibold text-3xl text-white text-opacity-80">
                            Custom Queries
                        </h2>
                        <p className="mt-10 text-white text-opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={screenshot3}></img>
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default Home;
