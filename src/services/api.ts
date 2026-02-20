const API_BASE = import.meta.env.DEV
  ? '/api'
  : 'https://bmeh8w4log.execute-api.us-east-1.amazonaws.com';

export interface Car {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarPayload {
  name: string;
  description?: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = (data as { error?: string }).error || 'Error en la solicitud';
    console.error('[API] Error en respuesta:', { status: res.status, statusText: res.statusText, data });
    throw new Error(errorMsg);
  }
  return data as T;
}

export const carsApi = {
  async getAll(): Promise<Car[]> {
    console.log('[API] GET / - Obteniendo lista de autos...');
    const res = await fetch(API_BASE);
    const data = await handleResponse<Car[]>(res);
    const cars = Array.isArray(data) ? data : [];
    console.log('[API] GET / - Respuesta:', { total: cars.length, cars });
    return cars;
  },

  async getById(id: string): Promise<Car> {
    console.log('[API] GET /' + id + ' - Obteniendo auto por ID...');
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await handleResponse<Car>(res);
    console.log('[API] GET /' + id + ' - Respuesta:', data);
    return data;
  },

  async create(payload: CreateCarPayload): Promise<Car> {
    console.log('[API] POST / - Creando auto:', payload);
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await handleResponse<Car>(res);
    console.log('[API] POST / - Auto creado:', data);
    return data;
  },

  async update(id: string, payload: CreateCarPayload): Promise<Car> {
    console.log('[API] PUT /' + id + ' - Actualizando auto:', payload);
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await handleResponse<Car>(res);
    console.log('[API] PUT /' + id + ' - Auto actualizado:', data);
    return data;
  },

  async delete(id: string): Promise<{ message: string }> {
    console.log('[API] DELETE /' + id + ' - Eliminando auto...');
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    const data = await handleResponse<{ message: string }>(res);
    console.log('[API] DELETE /' + id + ' - Respuesta:', data);
    return data;
  },
};
