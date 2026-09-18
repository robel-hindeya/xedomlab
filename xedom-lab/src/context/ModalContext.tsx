'use client';

import React, { createContext, useContext, useState } from 'react';
import { JoinModal } from '../components/JoinModal';

interface ModalContextType {
  isJoinModalOpen: boolean;
  openJoinModal: () => void;
  closeJoinModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isJoinModalOpen: false,
  openJoinModal: () => {},
  closeJoinModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  return (
    <ModalContext.Provider value={{ isJoinModalOpen, openJoinModal, closeJoinModal }}>
      {children}
      <JoinModal isOpen={isJoinModalOpen} onClose={closeJoinModal} />
    </ModalContext.Provider>
  );
};
