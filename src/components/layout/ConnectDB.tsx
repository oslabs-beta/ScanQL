import React, {ChangeEvent } from 'react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import useAppStore from '../../store/appStore';
import { Cross2Icon } from '@radix-ui/react-icons';

const ConnectDB: React.FC = () => {

  const { uri, setUri, connectToDatabase, closeConnectDB, isConnectDBOpen, dbName, setDBName } = useAppStore();

  const handleClick = (): void => {
    connectToDatabase(uri, dbName);
    setUri('');
    setDBName('')
  }

  return (
    <Dialog.Root open={isConnectDBOpen} >
      <Dialog.Portal >
        <Dialog.Overlay onClick={closeConnectDB} className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Connect to Database
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Please submit your connection string. Click Submit when you are done.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
              Database Name
            </label>
            <input
              type='text'
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="database-name"
              value={dbName}
              onChange={(e) => setDBName(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
              Postgres URI String
            </label>
            <input
              type='text'
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="uri-string"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
              <button onClick={() => {
                handleClick();
                closeConnectDB();
                }} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"  >
                Submit
              </button>
          </div>
            <button
                onClick={() => {
                  closeConnectDB();
                  setUri('');
                  setDBName('');
                }}
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                >
              <Cross2Icon />
              X
            </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


export default ConnectDB;


