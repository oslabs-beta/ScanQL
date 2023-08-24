import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';
import useAppStore from '../../store/appStore';

import { RowsPerTable } from '../charts/RowsPerTable';

const Modal: React.FC = () => {
    const { isModalOpen, closeModal } = useAppStore();

  return (
    <Dialog.Root >
      <Dialog.Portal>
        <Dialog.Overlay onClick={closeModal} className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content>
            {/* whichever component is clicked on needs to passed on the click and displayed here */}
            <div>
            <RowsPerTable />
            </div>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal;

