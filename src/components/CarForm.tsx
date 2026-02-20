import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Car } from '../services/api';

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

export default function CarForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel,
}: CarFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setLoading(true);
      await onSubmit({ name: name.trim(), description: description.trim() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
          placeholder="Ej: Toyota Corolla"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all resize-none"
          rows={3}
          placeholder="Descripción del vehículo"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300"
        >
          {loading ? 'Guardando...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-dark-600 hover:bg-dark-500 text-dark-200 font-medium rounded-xl transition-all duration-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
