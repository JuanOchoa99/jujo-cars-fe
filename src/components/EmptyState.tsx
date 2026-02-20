import { motion } from 'framer-motion';
import { Car, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 sm:py-32 px-8"
    >
      <div className="w-24 h-24 rounded-2xl bg-dark-800/80 border border-dark-600/50 flex items-center justify-center mb-8">
        <Car size={48} className="text-accent-400/80" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
        No hay vehículos registrados
      </h3>
      <p className="text-dark-300 text-center max-w-md mb-10 leading-relaxed">
        Tu catálogo está vacío. Agrega tu primer auto para comenzar a gestionar
        tu inventario de vehículos.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/25"
      >
        <Plus size={20} />
        Agregar primer auto
      </button>
    </motion.div>
  );
}
