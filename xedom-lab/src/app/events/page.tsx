'use client';

import { Events } from '../../views/Events';
import { useModal } from '../../context/ModalContext';

export default function EventsPage() {
  const { openJoinModal } = useModal();
  return <Events onOpenJoinModal={openJoinModal} />;
}
