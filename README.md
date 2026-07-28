# Yoga 2.0

Yoga 2.0 es una mini app web mobile-first para profesores de yoga. Permite generar clases curadas por estilo, duración, nivel, intención, foco, intensidad, necesidades del grupo y materiales disponibles. Las clases pueden editarse, guardarse, duplicarse, marcarse como impartidas, imprimirse o recorrerse en modo clase con temporizador.

## Funciones incluidas

- Generador de clases Hatha, Vinyasa, Yin y Restaurativo.
- Duraciones de 30, 45, 60, 75 y 90 minutos.
- Niveles inicial, intermedio, avanzado y multinivel.
- Indicaciones en español o inglés.
- Adaptaciones generales según contexto del grupo.
- Edición de la secuencia: mover, reemplazar, eliminar y anotar posturas.
- Regeneración de bloques completos.
- Biblioteca de asanas con filtros y búsqueda.
- Guardado local de clases mediante `localStorage`.
- Copias de seguridad en archivo JSON.
- Modo clase con temporizador por postura.
- Impresión o guardado como PDF desde el navegador.
- PWA instalable con manifest, íconos y service worker.
- Diseño basado en la paleta de Destino Hridaya.

## Cómo abrirla en tu computadora

1. Descomprimí el archivo ZIP.
2. Abrí la carpeta `yoga-2.0`.
3. Hacé doble clic en `index.html`.

La aplicación principal funciona al abrir `index.html`. El modo instalable y la caché offline se activan correctamente cuando la app se publica mediante HTTPS, por ejemplo en GitHub Pages.

## Cómo publicarla en GitHub Pages

1. Creá un repositorio nuevo en GitHub.
2. Subí **todo el contenido** de la carpeta `yoga-2.0`.
3. Verificá que `index.html` quede en la raíz del repositorio, no dentro de una carpeta adicional.
4. Entrá en `Settings` → `Pages`.
5. En `Build and deployment`, elegí `Deploy from a branch`.
6. Seleccioná la rama `main` y la carpeta `/(root)`.
7. Guardá los cambios.
8. GitHub mostrará el enlace público de la aplicación.

No necesitás instalar Node.js, npm, React, Vite ni usar una terminal.

## Instalarla en iPhone

1. Abrí el enlace público desde Safari.
2. Tocá el botón Compartir.
3. Elegí `Agregar a pantalla de inicio`.
4. Confirmá el nombre `Yoga 2.0`.

## Instalarla en Android

1. Abrí el enlace desde Chrome.
2. Abrí el menú del navegador.
3. Elegí `Instalar aplicación` o `Agregar a pantalla principal`.

## Archivos principales

- `index.html`: estructura de la aplicación.
- `styles.css`: identidad visual y diseño responsive.
- `data.js`: biblioteca curada de posturas, intenciones y contenidos.
- `app.js`: navegación, generador, edición, guardado y modo clase.
- `manifest.webmanifest`: configuración de instalación.
- `service-worker.js`: caché de archivos esenciales.
- `icons/`: íconos para navegador y pantalla de inicio.

## Almacenamiento y privacidad

Los datos se guardan exclusivamente en el navegador del dispositivo mediante `localStorage`. No se envían a un servidor. La configuración permite exportar e importar una copia de seguridad JSON.

## Límite de esta versión

Yoga 2.0 es una herramienta de planificación para profesores. No brinda diagnósticos, recomendaciones médicas ni reemplaza la formación profesional o la valoración individual de los alumnos.


## Actualización 1.1 — saludos solares y lunares

Esta versión incorpora secuencias completas y ordenadas:

- Saludo al Sol A.
- Saludo al Sol B.
- Saludo al Sol clásico de Hatha, realizado a derecha e izquierda.
- Saludo a la Luna, realizado hacia ambos lados.

Cada saludo puede generarse en variante estándar, inicial, con silla, para movilidad reducida o adaptada para embarazo. El profesor puede elegir entre una y seis vueltas. Dentro del editor, el saludo funciona como un bloque protegido: se cambia de manera completa para preservar el orden, las transiciones y la lateralidad.

Las adaptaciones son orientaciones pedagógicas generales. La variante para embarazo requiere autorización profesional y valoración individual. Yoga 2.0 no brinda diagnósticos ni reemplaza la formación o el criterio del profesor.
