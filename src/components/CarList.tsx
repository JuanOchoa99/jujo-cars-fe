import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CarCard from './CarCard';
import EmptyState from './EmptyState';
import type { Car } from '../services/api';

interface CarListProps {
  cars: Car[];
  loading: boolean;
  onAddClick: () => void;
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
}

export default function CarList({
  cars,
  loading,
  onAddClick,
  onEdit,
  onDelete,
}: CarListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="autos" className="relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Catálogo de Autos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-emerald-500 rounded-full mb-8" />
            <p className="text-dark-300 text-lg max-w-2xl mb-8">
              Gestiona tu inventario de vehículos. Crea, edita y elimina registros.
            </p>
            <button
              onClick={onAddClick}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/25"
            >
              <Plus size={20} />
              Nuevo Auto
            </button>
          </div>

          {cars.length === 0 ? (
            <div className="rounded-2xl bg-dark-800/30 border border-dark-700/50">
              <EmptyState onAddClick={onAddClick} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cars.map((car, i) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  index={i}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
