'use client';

import { Community } from '../../views/Community';
import { useModal } from '../../context/ModalContext';

export default function CommunityPage() {
  const { openJoinModal } = useModal();
  return <Community onOpenJoinModal={openJoinModal} />;
}
