# Presupuestador

#### Desarrollo:

- Instalar base Mongodb:

```
sudo docker run -p 27017:27017 --name mongo -d mongodb/mongodb-community-server:latest

// si ya existe
docker start mongo
```

- Configuración de ambiente:

```
// .env.local
SMTP_USER="info@enlaces.site"
SMTP_PASSWORD="[PASSWORD]"
SMTP_HOST="l0020749.ferozo.com"
SMTP_PORT=465
EMAIL_FROM="info@enlaces.site"
MONGODB_URI="mongodb://localhost:27017"
NEXTAUTH_SECRET="d1491789d605b2195d0c7f4e1d43358caf667d7e37e8c96aea5d7c75928d0efc"
NEXT_PUBLIC_COUCH_URI ="https://presupuestador-couch.nube.chasqui.site/"
NEXTAUTH_URL="https://presupustador.enlaces.site/"
NEXT_POUCH_USERNAME="[USERNAME]"
NEXT_POUCH_PASSWORD="[PASSWORD]"

## Servidor de prueba de couchdb

http://presupuestador-couch.nube.chasqui.site/_utils/#login


Verificar que funciona ingresando a Fauxton: http://localhost:5984/_utils/

#### Documentación de como replicar datos

https://pouchdb.com/guides/replication.html

**Está implementada una prueba de concepto para la sincronización en src/pages/_app.js**


## Instalación

1. Clonar repo

2. cd src

3. npm install

4. npm run dev



Ir a http://localhost:3000
```

### deploy

```
cd src
docker build -t ghcr.io/incubepss/presupuestador:latest .
docker push ghcr.io/incubepss/presupuestador:latest
```

Login en caprover

https://captain.nube.chasqui.site/

Ingresar a `presupuestador-app` y volver a deployar la imagen

https://presupuestador.enlaces.site

### Probar deploy en local

```
docker run -p 3000:3000 ghcr.io/incubepss/presupuestador:latest
```
