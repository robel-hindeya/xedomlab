'use client';

import { Events } from '../../pages/Events';
import { useModal } from '../../context/ModalContext';

export default function EventsPage() {
  const { openJoinModal } = useModal();
  return <Events onOpenJoinModal={openJoinModal} />;
}
