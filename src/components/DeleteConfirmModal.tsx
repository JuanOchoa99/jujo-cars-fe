import Modal from './Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  carName,
  onConfirm,
}: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="¿Eliminar auto?">
      <p className="text-dark-200 mb-6">{carName}</p>
      <div className="flex gap-3">
        <button
          onClick={handleConfirm}
          className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all"
        >
          Eliminar
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 bg-dark-600 hover:bg-dark-500 text-dark-200 font-medium rounded-xl transition-all"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
