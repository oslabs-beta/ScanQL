import * as React from "react";
import { useEffect } from "react";
import logo from "../assets/logo-horizontal-v2.png";
import logodark from "../assets/logo-horizontal-v2-darkmode.png";
import gif1 from "../assets/GIFs/Dashboard_gif.gif";
import gif2 from "../assets/GIFs/ERD_gif.gif";
import gif3 from "../assets/GIFs/CustomQuery_gif.gif";

import {
    LightningBoltIcon,
    LockClosedIcon,
    DashboardIcon,
    MagnifyingGlassIcon,
    SunIcon,
    KeyboardIcon,
} from "@radix-ui/react-icons";

import NavBar from "../components/layout/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/appStore";

import { Button } from "@radix-ui/themes";
import Footer from "../components/layout/Footer";

const Home: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const { theme } = useAppStore();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated])

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

                    <p className="home-description-text text-2xl mt-5 ml-7 text-indigo-900 text-opacity-70 font-montserrat text-dark-mode-2">
                        Real-Time PostgreSQL monitoring, analysis, and visualization tool
                    </p>
                    <Button
                        onClick={() => loginWithRedirect()}
                        className="mt-10 border border-indigo-900 border-opacity-30 bg-indigo-900 bg-opacity-50 text-gray-100 rounded-lg font-montserrat"
                    >
                        Get Started
                    </Button>
                </div>
                <div className="home-cards-section">
                    <div className="home-card">
                        <h3 className="text-indigo-900 font-semibold mt-5 text-xl font-montserrat text-opacity-60 text-dark-mode">
                            Adaptive Live Analysis
                        </h3>
                        <MagnifyingGlassIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></MagnifyingGlassIcon>
                        <p className="mt-3 text-white text-sm">
                            Modify your database and receive real-time analysis upon page refresh.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3 className="text-indigo-900 font-semibold mt-5 text-xl font-montserrat text-opacity-60 text-dark-mode">
                            Quick Setup
                        </h3>
                        <LightningBoltIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></LightningBoltIcon>
                        <p className="mt-3 text-sm text-white">
                            Connect to your database and deploy in seconds with our simple setup process.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3 className="text-indigo-900 text-opacity-60 text-dark-mode  font-semibold mt-5 text-xl font-montserrat">
                            Interactive Dashboard
                        </h3>
                        <DashboardIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></DashboardIcon>
                        <p className="mt-3 text-white text-sm">
                            Our dynamic dashboard provides users contextual information and clarity making data interpretation intuitive and effortless.
                        </p>
                    </div>
                </div>
                <div className="home-cards-section">
                    <div className="home-card">
                        <h3 className="text-indigo-900 font-semibold mt-5 text-xl font-montserrat text-opacity-60 text-dark-mode">
                            Privacy and Security
                        </h3>
                        <LockClosedIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></LockClosedIcon>
                        <p className="mt-3 text-sm text-white">
                            All monitoring and analysis occur in real-time, directly on your infrastructure, ensuring that your data remains solely in your possession and control at all times.
                        </p>
                    </div>
                    <div className="home-card">
                        <h3 className="text-indigo-900 font-semibold mt-5 text-xl font-montserrat text-opacity-60 text-dark-mode">
                            Query Builder
                        </h3>
                        <KeyboardIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></KeyboardIcon>
                        <p className="mt-3 text-sm text-white">
                          Visualize how your query will be executed for optimization.
                        </p>
                    </div>
                    
                    <div className="home-card">
                        <h3 className="text-indigo-900 font-semibold mt-5 text-xl font-montserrat text-opacity-60 text-dark-mode">
                            Customizable Themes
                        </h3>
                        <SunIcon
                            height={40}
                            width={40}
                            className="text-indigo-900 text-opacity-60 mt-4 text-dark-mode"
                        ></SunIcon>
                        <p className="mt-3 text-sm text-white">
                            Transition seamlessly between light and dark themes to match user preference.
                        </p>
                    </div>
                </div>
                <div className="home-section1">
                    <div className="home-panel">
                        <h2 className="mt-5 font-semibold text-3xl font-montserrat text-indigo-900 text-opacity-60 text-dark-mode">
                            Database Monitoring and Analysis
                        </h2>
                        <p className="mt-10 text-white">
                            Access live updates and immediate feedback on your PostgreSQL database's operational health and query performance. Explore a detailed database overview of current size metrics, historical query performance, and real-time execution durations.
                        </p>
                    </div>
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={gif1}></img>
                    </div>
                </div>
                <div className="home-section2">
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={gif2}></img>
                    </div>
                    <div className="home-panel">
                        <h2 className="mt-5 font-semibold text-3xl font-montserrat text-indigo-900 text-opacity-60 text-dark-mode">
                            Detailed Relationship Mapping
                        </h2>
                        <p className="mt-10 text-white">
                            Visualize intricacies of your database structure with our enhanced ERD Diagram. Experience an interactive representation of your database's relationships and dependencies, making comprehension and optimization more intuitive than ever.
                        </p>
                    </div>
                </div>
            </div>
            <div className="home-section1">
                <div className="home-panel">
                    <div></div>
                    <h2 className="mt-5 font-semibold text-3xl font-montserrat text-indigo-900 text-opacity-60 text-dark-mode">
                        Custom Query Metrics
                    </h2>
                    <p className="mt-10 text-white ">
                        Evaluate the efficiency of your custom queries with detailed runtime statistics and resource usage metrics. Transform your custom query results into dynamic charts and graphs for clearer insights.
                    </p>
                </div>
                <div className="home-panel-img">
                    <img className="home-demo-img" src={gif3}></img>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
