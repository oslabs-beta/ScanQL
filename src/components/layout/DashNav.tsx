import React from "react";
import logo from "../../assets/logo-horizontal-v2.png";
import logodark from "../../assets/logo-horizontal-v2-darkmode.png";

import DropdownMenuDemo from "../ui/DropdownMenu";

// import { IconButton } from '@radix-ui/react-button';

import HelpModal from '../ui/HelpModal';

// import { Flex } from '@radix-ui/themes';

import useAppStore from "../../store/appStore";
import DarkModeToggle from "../ui/DarkModeToggle";

const DashNav: React.FC = () => {
    const { theme, } = useAppStore();

    return (
        <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-6 mb-8">
            <div className="flex flex-col items-center md:flex-row">
                <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
                        {theme === "light" ? (
                            <img className="logo-nav" src={logo}></img>
                        ) : (
                            <img className="logo-nav" src={logodark}></img>
                        )}
                </div>
            </div>
            <div className="flex items-center">
                <DarkModeToggle />
                <HelpModal />
                <DropdownMenuDemo />
            </div>
        </div>
    );
};

export default DashNav;
