import * as React from "react";
import { useEffect } from "react";
import logo from "../assets/logo-horizontal-v2.png";
import logodark from "../assets/logo-horizontal-v2-darkmode.png";
import screenshot1 from "../assets/screenshots/screenshot1.jpg";
import screenshot2 from "../assets/screenshots/screenshot2.jpg";
import screenshot3 from "../assets/screenshots/screenshot3.jpg";
import headshotkim from "../assets/team_headshots/other_dkim.jpg";

import {
    FaceIcon,
    ImageIcon,
    SunIcon,
    LightningBoltIcon,
    Crosshair2Icon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
} from "@radix-ui/react-icons";

import NavBar from "../components/layout/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import useAppStore from "../store/appStore";

import MetricsView from "../components/layout/MetricsView";
import { Button, Container } from "@radix-ui/themes";
import Footer from "../components/layout/Footer";

const Home: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const { theme } = useAppStore();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [])

    return (
        <div>
            <div>
                <NavBar />
                <div className="home-logo-container">
                    {theme === "light" ? (
                        <img className="home-logo-nav" src={logo}></img>
                    ) : (
                        <img className="home-logo-nav" src={logodark}></img>
                    )}

                    <p className="home-description-text text-2xl ml-7 text-indigo-900 text-opacity-70 font-montserrat text-dark-mode-2">
                        Elegant data visualization for PostgresQL
                    </p>
                    <Button
                        onClick={() => loginWithRedirect()}
                        className="mt-10 border border-indigo-900 border border-opacity-30 bg-indigo-900 bg-opacity-50 text-gray-100 rounded-lg font-montserrat"
                    >
                        Get Started
                    </Button>
                </div>
                <div className="home-cards-section">
                    <div className="home-card">
                        <LightningBoltIcon
                            height={30}
                            width={30}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></LightningBoltIcon>
                        <h3 className="text-white font-semibold mt-3 text-xl font-montserrat">
                            Motivation (Our Why)
                        </h3>
                        <p className="mt-3 text-white text-sm">
                            ScanQL is designed to simplify and enhance your approach to optimizing your, allowing you to focus on what truly matters. Our mission is to empower users with intuitive tools and insightful analytics, transforming the way you [primary function of the app].{" "}
                        </p>
                    </div>
                    <div className="home-card">
                        <Crosshair2Icon
                            height={30}
                            width={30}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></Crosshair2Icon>
                        <h3 className="text-white  font-semibold mt-5 text-xl font-montserrat">
                            Benefits & Value
                        </h3>
                        <p className="mt-3 text-white text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="home-card">
                        <ImageIcon
                            height={30}
                            width={30}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></ImageIcon>
                        <h3 className="text-white font-semibold mt-5 text-xl font-montserrat">
                            Continued Commitment
                        </h3>
                        <p className="mt-3 text-sm text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.{" "}
                        </p>
                    </div>
                </div>
                <div className="home-section1">
                    <div className="home-panel">
                        <h2 className="mt-10 font-semibold text-3xl text-white  font-montserrat">
                            Database Overview
                        </h2>
                        <p className="mt-10 text-white">
                            View in-depth metrics across your database on a
                            sleek dashboard, providing a bird's eye view of your
                            database performance.
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
                        <h2 className="mt-10 font-semibold text-3xl text-white font-montserrat">
                            Entity Relationship Diagrams
                        </h2>
                        <p className="mt-10 text-white">
                            Visualize your database tables like never before
                            with a beautifully designed and responsive GUI.
                        </p>
                    </div>
                </div>
            </div>
            <div className="home-section1">
                <div className="home-panel">
                    <div></div>
                    <h2 className="mt-5 mb-10 font-semibold text-3xl text-white  font-montserrat ">
                        Custom Queries
                    </h2>
                    <p className="mt-10 text-white ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
                <div className="home-panel-img">
                    <img className="home-demo-img" src={screenshot3}></img>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
