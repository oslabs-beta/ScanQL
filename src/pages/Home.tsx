import * as React from "react";
import { useEffect } from "react";
import logo from "../assets/logo-horizontal-v2.png";
import screenshot1 from "../assets/screenshots/screenshot1.jpg";
import screenshot2 from "../assets/screenshots/screenshot2.jpg";
import screenshot3 from "../assets/screenshots/screenshot3.jpg";
import headshotkim from "../assets/team_headshots/other_dkim.jpg"

import { FaceIcon, ImageIcon, SunIcon, LightningBoltIcon, Crosshair2Icon, GitHubLogoIcon, LinkedInLogoIcon} from '@radix-ui/react-icons'

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
            <div>
                <NavBar />
                <div className="home-logo-container">
                    <img className="home-logo-nav" src={logo}></img>
                    <p className="home-description-text text-2xl ml-7 text-indigo-900 text-opacity-70 font-montserrat">
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
                        <LightningBoltIcon height={30} width={30} className="text-indigo-900 text-opacity-60 mt-4 "></LightningBoltIcon>
                        <h3 className="text-white font-semibold mt-3 text-xl font-montserrat">
                            Motivation (Our Why)
                        </h3>
                        <p className="mt-3 text-white text-sm">
                        ScanQL is designed to simplify and enhance your approach to optimizing your , allowing you to focus on what truly matters. Our mission is to empower users with intuitive tools and insightful analytics, transforming the way you [primary function of the app].{" "}
                        </p>
                    </div>
                    <div className="home-card">
                    <Crosshair2Icon height={30} width={30} className="text-indigo-900 text-opacity-60 mt-4"></Crosshair2Icon>
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
                    <ImageIcon height={30} width={30} className="text-indigo-900 text-opacity-60 mt-4"></ImageIcon>
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
                        <h2 className="mt-10 font-semibold text-3xl text-white font-montserrat">
                            Entity Relationship Diagrams
                        </h2>
                        <p className="mt-10 text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
            <div className="home-section1">
            <div className="home-panel">
                <div>
                     
                </div>
                        <h2 className="mt-5 mb-10 font-semibold text-3xl text-white text-opacity-80 font-montserrat">
                            Custom Queries
                        </h2>
                        <p className="mt-10 text-white ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="home-panel-img">
                        <img className="home-demo-img" src={screenshot3}></img>
                    </div>
                </div>
            <div className="home-team-section">
                <div className="home-team-title">
                        <h2 className="mt-10 font-semibold text-3xl text-white font-montserrat">
                            Meet the Team
                        </h2>
                </div>
                        <div className="home-team-card-section">
                        <div className="home-team-card">
                        <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat">
                            Kurt Bulau
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70  mt-4 text-large font-montserrat">
                            Sam Heck
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                        <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat">
                            Daniel Kim
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat">
                            Danny Murcia
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70  mr-3"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 "></GitHubLogoIcon>
                        </div>
   
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70  mt-4 text-large font-montserrat">
                            Yahya Talab
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70"></GitHubLogoIcon>
                        </div>
                    </div>
                    </div>
                    </div>
            <Footer/>
        </div>
    );
};

export default Home;
