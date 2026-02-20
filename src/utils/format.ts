export function formatDate(str: string | undefined): string {
  if (!str) return '-';
  try {
    return new Date(str).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return str;
  }
}
