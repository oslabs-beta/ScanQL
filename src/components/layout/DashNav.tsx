import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-horizontal-v2.png';


import DropdownMenuDemo from '../ui/DropdownMenu';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
// import { IconButton } from '@radix-ui/react-button';

import { Button, IconButton } from '@radix-ui/themes';

// import { Flex } from '@radix-ui/themes';
import { Switch } from '@radix-ui/react-switch';

import useAppStore from '../../store/appStore';

const DashNav: React.FC = () => {

  const { setView, theme, toggleTheme } = useAppStore();

  return (

    <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-6 mb-8">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
          <Link to="/">
            <img className='logo-nav' src={logo}></img>
          </Link>

        </div>

      </div>
      <div className="flex items-center">
        {/* <Switch size="1" radius="full" defaultChecked /> */}
        <Switch checked={theme === 'dark'} onChange={toggleTheme} >
          {theme === 'light' ? <MoonIcon className = "text-indigo-900"width={22} height={22} /> : <SunIcon width={22} height={22} />}
        </Switch>
        <DropdownMenuDemo />
      </div>
    </div>
  );
};

//optional bottom border styling: 
//border-b border-violet-900 border-opacity-10

export default DashNav;