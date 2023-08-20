import * as React from 'react';

import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { Cross2Icon } from '@radix-ui/react-icons';
interface ConnectDBProps {
  closeModal: () => void;
}

const ConnectDB: React.FC<ConnectDBProps> = ({ closeModal }) => {

  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  }

  return (
    // <div>
    //   <h1>Connect DB</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
    //     </label>
    //     <input type="submit" value="Submit" />1
    //   </form>
    //   <button onClick={closeModal}>Close</button>
    // </div>
    <Dialog.Root>
      {/* <Dialog.Trigger asChild>
        <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Edit profile
        </button> */}
      {/* </Dialog.Trigger> */}
      {/* <Dialog.Trigger> */}
      <Dialog.Trigger asChild>
        <Dialog.Portal forceMount >
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
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
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="database-name"
                defaultValue="Database 1"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                Postgres URI String
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="uri-string"
                defaultValue="postgres://hi/example"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild >
                <button onClick={closeModal} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"  >
                  Submit
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" onClick={() => { handleSubmit }}
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Trigger>
    </Dialog.Root>


  )
}

export default ConnectDB;


