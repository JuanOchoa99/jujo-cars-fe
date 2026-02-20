import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';
import { setApiTokenGetter } from './services/api';
import Hero from './components/Hero';
import CarList from './components/CarList';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import Alert from './components/Alert';
import Modal from './components/Modal';
import CarForm from './components/CarForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useCars } from './hooks/useCars';
import type { Car } from './services/api';

function App() {
  const { getIdToken } = useAuth();

  useEffect(() => {
    setApiTokenGetter(getIdToken);
  }, [getIdToken]);

  const {
    cars,
    loading,
    error,
    setError,
    createCar,
    updateCar,
    deleteCar,
  } = useCars();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteCarTarget, setDeleteCarTarget] = useState<Car | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearSuccess = () => {
    setSuccessMessage(null);
  };

  const handleCreate = async (data: { name: string; description: string }) => {
    await createCar(data);
    setShowCreateModal(false);
    setSuccessMessage('Auto creado correctamente');
    setTimeout(clearSuccess, 3000);
  };

  const handleUpdate = async (data: { name: string; description: string }) => {
    if (!editingCar) return;
    await updateCar(editingCar.id, data);
    setEditingCar(null);
    setSuccessMessage('Auto actualizado correctamente');
    setTimeout(clearSuccess, 3000);
  };

  const handleDelete = async () => {
    if (!deleteCarTarget) return;
    await deleteCar(deleteCarTarget.id);
    setDeleteCarTarget(null);
    setSuccessMessage('Auto eliminado correctamente');
    setTimeout(clearSuccess, 3000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <CarList
          cars={cars}
          loading={loading}
          onAddClick={() => setShowCreateModal(true)}
          onEdit={setEditingCar}
          onDelete={setDeleteCarTarget}
        />
      </main>
      <Footer />

      {/* Alerts */}
      {error && (
        <div className="fixed top-24 left-4 right-4 z-[60] max-w-md mx-auto">
          <Alert message={error} type="error" onDismiss={() => setError(null)} />
        </div>
      )}
      {successMessage && (
        <div className="fixed top-24 left-4 right-4 z-[60] max-w-md mx-auto">
          <Alert message={successMessage} type="success" onDismiss={clearSuccess} />
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nuevo Auto"
      >
        <CarForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          submitLabel="Crear"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingCar}
        onClose={() => setEditingCar(null)}
        title="Editar Auto"
      >
        {editingCar && (
          <CarForm
            initialData={editingCar}
            onSubmit={handleUpdate}
            onCancel={() => setEditingCar(null)}
            submitLabel="Guardar"
          />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteCarTarget}
        onClose={() => setDeleteCarTarget(null)}
        carName={deleteCarTarget?.name ?? ''}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default App;
