'use client';

import { Home } from '../views/Home';
import { useModal } from '../context/ModalContext';

export default function HomePage() {
  const { openJoinModal } = useModal();
  return <Home onOpenJoinModal={openJoinModal} />;
}
