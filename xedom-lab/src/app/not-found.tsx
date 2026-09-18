'use client';

import { Home } from '../pages/Home';
import { useModal } from '../context/ModalContext';

export default function NotFound() {
  const { openJoinModal } = useModal();
  return <Home onOpenJoinModal={openJoinModal} />;
}
