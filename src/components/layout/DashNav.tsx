import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-horizontal-v2.png";
import logodark from "../../assets/logo-horizontal-v2-darkmode.png";

import DropdownMenuDemo from "../ui/DropdownMenu";

import { HomeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import { IconButton } from '@radix-ui/react-button';

import { Button, IconButton } from "@radix-ui/themes";

// import { Flex } from '@radix-ui/themes';
import { Switch } from "@radix-ui/react-switch";

import useAppStore from "../../store/appStore";
import DarkModeToggle from "../ui/DarkModeToggle";

const DashNav: React.FC = () => {
    const { setView, theme, toggleTheme } = useAppStore();

    return (
        <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-6 mb-8">
            <div className="flex flex-col items-center md:flex-row">
                <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
                    {/* <Link to="/"> */}
                        {theme === "light" ? (
                            <img className="logo-nav" src={logo}></img>
                        ) : (
                            <img className="logo-nav" src={logodark}></img>
                        )}
                    {/* </Link> */}
                </div>
            </div>
            <div className="flex items-center">
                <DarkModeToggle />
                <DropdownMenuDemo />
            </div>
        </div>
    );
};

export default DashNav;
