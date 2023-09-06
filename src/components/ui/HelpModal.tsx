import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';
import useAppStore from '../../store/appStore';
import { Cross1Icon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
// import { RowsPerTable } from '../charts/RowsPerTable';

const HelpModal: React.FC = () => {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <QuestionMarkCircledIcon className="text-indigo-900 text-opacity-70" width={25} height={25} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">

          <div className="flex items-center justify-between">
            <Dialog.Title className="text-indigo-700 m-0 text-[22px] font-medium text-center">
              Help Section
            </Dialog.Title>
            <Dialog.Close>
              <Cross1Icon className="text-indigo-900 text-opacity-70" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-indigo-900 mt-[10px] mb-5 text-[15px] leading-normal">
            <p className="mb-2"><u>Metrics</u></p>
            <p>1. Click on Dropdown icon on the top right of the page</p>
            <p>2. Click on the "Connect to Database" button</p>
            <p>3. Enter your Postgres URI string</p>
            <p className="mb-2"><u>ER Diagram</u></p>
            <p>1. </p>
            <p className="mb-2"><u>Custom Query</u></p>
            <p>Please enter a valid query</p>
            <p>Ex. SELECT * FROM user_table</p>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default HelpModal;
