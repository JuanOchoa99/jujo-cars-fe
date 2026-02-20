import { motion } from 'framer-motion';
import { Car, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/format';
import type { Car as CarType } from '../services/api';

interface CarCardProps {
  car: CarType;
  onEdit: (car: CarType) => void;
  onDelete: (car: CarType) => void;
  index: number;
}

export default function CarCard({ car, onEdit, onDelete, index }: CarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:border-accent-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500/20 transition-colors">
          <Car size={22} className="text-accent-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg truncate">{car.name}</h3>
          <p className="text-dark-400 text-xs mt-1 font-mono">{formatDate(car.createdAt)}</p>
        </div>
      </div>
      <p className="text-dark-300 text-sm leading-relaxed line-clamp-2 mb-5">
        {car.description || 'Sin descripción'}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(car)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dark-600 hover:border-accent-500/50 text-dark-200 hover:text-accent-400 transition-all text-sm font-medium"
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          onClick={() => onDelete(car)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dark-600 hover:border-red-500/50 text-dark-200 hover:text-red-400 transition-all text-sm font-medium"
        >
          <Trash2 size={16} />
          Eliminar
        </button>
      </div>
    </motion.article>
  );
}
