import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';
import { Cross1Icon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
// import { RowsPerTable } from '../charts/RowsPerTable';

const HelpModal: React.FC = () => {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <QuestionMarkCircledIcon className="text-indigo-900 text-opacity-70 text-dark-mode" width={25} height={25} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow text-dark-mode">

          <div className="flex items-center justify-between">
            <Dialog.Title className="text-indigo-400 m-0 text-[25px] font-medium text-center">
              Help Section
            </Dialog.Title>
            <Dialog.Close>
              <Cross1Icon className="text-indigo-900 text-opacity-70" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-indigo-900 mt-[10px] mb-5 text-[14px] leading-normal">
            <h3 className="mb-2"><u><b>Connect Your Database </b></u></h3>
            <p>1. Click on the Dropdown icon on the top right of the page.</p>
            <p>2. Click on the "Connect to Database" button.</p>
            <p className="mb-2">3. Enter your Postgres URI string.</p>

            <p className="mb-2"><u><b>Custom Query</b></u></p>
            <p>To generate custom query metrics enter a valid query.</p>
            <ul className="mb-2">Ex. SELECT * FROM user_table</ul>

            <p className="mb-2"><u><b>General Tips</b></u></p>
            <p>Click on the Refresh Icon found in the dashboard in order for the most recent database information.</p>


          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default HelpModal;
