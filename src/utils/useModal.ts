import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return { isModalOpen: isOpen, openModal, closeModal };
};

export default useModal;
