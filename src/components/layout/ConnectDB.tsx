import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import useAppStore from '../../store/appStore';
import { Cross2Icon } from '@radix-ui/react-icons';

const ConnectDB: React.FC = () => {

  const { uri, setUri, connectToDatabase, closeConnectDB, isConnectDBOpen, dbName, invalidURIMessage } = useAppStore();

  const handleClick = (): void => {
    connectToDatabase(uri, dbName);
  }

  return (
    <Dialog.Root open={isConnectDBOpen} >
      <Dialog.Portal >
        <Dialog.Overlay onClick={closeConnectDB} className="bg-blackA11 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] bg-purple-200 bg-opacity-70 border border-opacity-50 border-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-white m-0 text-[22px] font-medium">
            Connect to Database
          </Dialog.Title>
          <Dialog.Description className="text-gray-200 mt-[10px] mb-5 text-[14px] leading-normal">
            Please enter your connection string. 
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-gray-100 w-[90px] text-right text-[15px]" htmlFor="username">
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
          <div className="mt-[25px] flex justify-end items-center ">
            {invalidURIMessage && <p className="text-red-200 mr-8 ">Invalid URI</p>}
            <button onClick={() => {
              handleClick();
              closeConnectDB();
            }} className="border-solid border-indigo-300 bg-gray-100 bg-opacity-60 text-indigo-900 text-opacity-80 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"  >
                Submit
            </button>
          </div>
            <button
                onClick={() => {
                  closeConnectDB();
                }}
                className="text-gray-100 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                >
              <Cross2Icon />
              X
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};


export default ConnectDB;


