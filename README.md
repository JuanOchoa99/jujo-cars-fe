# Jujo Cars

Aplicación React para gestión de vehículos. CRUD conectado a API serverless en AWS.

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue en GitHub Pages

### Opción 1: GitHub Actions (recomendado)

1. Sube el proyecto a un repositorio de GitHub.
2. En el repo: **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
3. Haz push a la rama `main`. El workflow desplegará automáticamente.

**Importante:** Si tu repositorio tiene otro nombre, edita `base` en `vite.config.ts`:

```ts
base: '/nombre-de-tu-repo/',
```

### Opción 2: Manual

```bash
npm run deploy
```

Esto genera el build y lo sube a la rama `gh-pages`. Luego activa GitHub Pages en Settings → Pages (Source: rama `gh-pages`).

### URL final

`https://<usuario>.github.io/jujo-cars-fe/`

---

**Nota sobre CORS:** En producción, las peticiones van directo a la API. Si el backend no tiene CORS habilitado, las llamadas fallarán. En desarrollo funciona gracias al proxy de Vite.
