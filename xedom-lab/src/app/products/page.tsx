'use client';

import { Products } from '../../pages/Products';
import { useModal } from '../../context/ModalContext';

export default function ProductsPage() {
  const { openJoinModal } = useModal();
  return <Products onOpenJoinModal={openJoinModal} />;
}
