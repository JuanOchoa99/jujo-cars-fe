const API_BASE = import.meta.env.DEV
  ? '/api'
  : 'https://2gfztglkwi.execute-api.us-east-1.amazonaws.com';

export interface CognitoConfig {
  userPoolId: string;
  userPoolClientId: string;
  region: string;
}

let cachedConfig: CognitoConfig | null = null;

export async function getCognitoConfig(): Promise<CognitoConfig> {
  if (cachedConfig) return cachedConfig;
  const res = await fetch(`${API_BASE}/config`);
  if (!res.ok) throw new Error('No se pudo obtener la configuración');
  cachedConfig = (await res.json()) as CognitoConfig;
  return cachedConfig;
}
