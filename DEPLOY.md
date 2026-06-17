Despliegue rápido del backend (FastAPI)

Opciones recomendadas:

1) Railway (fácil, conecta con tu repo GitHub)
- Entra a https://railway.app y crea cuenta.
- Conecta tu cuenta de GitHub y selecciona el repo `poemario`.
- Railway detectará Python y usará el `Procfile`.
- Añade variable `PORT` automática (Railway la provee).
- Despliega y obtendrás una URL pública, por ejemplo `https://nombre-aleatorio.up.railway.app`.

2) Render (similar a Railway)
- Crea servicio Web en https://render.com
- Conecta tu repo GitHub y selecciona `poemario`.
- Comando de inicio (Render): `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- Render proveerá una URL pública.

3) Deploy manual con Docker en cualquier proveedor
- Incluye un `Dockerfile` y despliega a tu servicio favorito.

Nota: Una vez tengas la URL pública del backend, añade esta meta tag en `index.html` y `register.html` dentro de `<head>`:

<meta name="api-base" content="https://TU-BACKEND/api">

Yo puedo añadir esa meta tag por ti y hacer commit/push si me pasas la URL pública. Si prefieres que ejecute el deploy desde esta máquina usando el CLI de algún servicio, tendrás que autenticar en ese CLI en esta sesión.
