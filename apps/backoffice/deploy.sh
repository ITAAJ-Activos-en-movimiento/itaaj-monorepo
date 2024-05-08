#!/bin/bash

# Ejecutar pnpm run build
echo "Iniciando la construcción..."
pnpm run build

# Verificar si la construcción fue exitosa
if [ $? -eq 0 ]; then
    echo "Construcción exitosa."

    # Copiar la carpeta .vercel y el archivo vercel.json a la carpeta dist
    echo "Copiando archivos necesarios..."
    cp -r .vercel dist/
    cp vercel.json dist/

    # Cambiar al directorio dist
    cd dist || exit

    # Ejecutar vercel --prod en la carpeta dist
    echo "Desplegando en producción..."
    vercel --prod
else
    echo "La construcción falló. No se ejecutará el despliegue."
fi
