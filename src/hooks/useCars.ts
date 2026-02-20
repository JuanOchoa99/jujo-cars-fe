import { useState, useEffect, useCallback } from 'react';
import { carsApi, type Car, type CreateCarPayload } from '../services/api';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      console.log('[useCars] Cargando autos...');
      setLoading(true);
      setError(null);
      const data = await carsApi.getAll();
      setCars(data);
      console.log('[useCars] Autos cargados:', data.length);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar';
      console.error('[useCars] Error al cargar:', err);
      setError(msg);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const createCar = useCallback(async (payload: CreateCarPayload) => {
    setError(null);
    const created = await carsApi.create(payload);
    setCars((prev) => [...prev, created]);
    console.log('[useCars] Auto creado en estado');
    return created;
  }, []);

  const updateCar = useCallback(async (id: string, payload: CreateCarPayload) => {
    setError(null);
    const updated = await carsApi.update(id, payload);
    setCars((prev) => prev.map((c) => (c.id === id ? updated : c)));
    console.log('[useCars] Auto actualizado en estado');
    return updated;
  }, []);

  const deleteCar = useCallback(async (id: string) => {
    setError(null);
    await carsApi.delete(id);
    setCars((prev) => prev.filter((c) => c.id !== id));
    console.log('[useCars] Auto eliminado del estado');
  }, []);

  return {
    cars,
    loading,
    error,
    setError,
    fetchCars,
    createCar,
    updateCar,
    deleteCar,
  };
}
