import React from 'react';
import { Link } from 'react-router-dom';


import DropdownMenuDemo from '../ui/DropdownMenu';

import { HomeIcon, MoonIcon } from '@radix-ui/react-icons';
// import { IconButton } from '@radix-ui/react-button';

import { Button, IconButton } from '@radix-ui/themes';

// import { Flex } from '@radix-ui/themes';
import { Switch } from '@radix-ui/react-switch';

import useAppStore from '../../store/appStore';

const Header: React.FC = () => {

  const { setView } = useAppStore();

  return (

    <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-4">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
          <IconButton>
            <Link to="/">
              <HomeIcon className="w-6 h-6 text-violet11" />
            </Link>
          </IconButton>
        </div>
        <div className="flex flex-col items-center md:flex-row md:space-x-4">
          <h1 className="text-gray-300 text-base">ScanQL</h1>
        </div>
        <div>
          <Button onClick={() => setView('metrics')}>
            Metrics View
          </Button>
        </div>
        <Button onClick={() => setView('erd')}>
          ERD Diagram
        </Button>
        <Button>
          Query View
        </Button>

      </div>
      <div className="flex items-center">
        {/* <Switch size="1" radius="full" defaultChecked /> */}
        <MoonIcon width={22} height={22} />
        <DropdownMenuDemo />
      </div>
    </div>
  )
}

export default Header;