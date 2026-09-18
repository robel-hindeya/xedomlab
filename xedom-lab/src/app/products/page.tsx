'use client';

import { Products } from '../../views/Products';
import { useModal } from '../../context/ModalContext';

export default function ProductsPage() {
  const { openJoinModal } = useModal();
  return <Products onOpenJoinModal={openJoinModal} />;
}
