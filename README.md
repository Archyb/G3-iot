# Objectifs:

- [x] Créer un model basée sur la norme EPCIS
- [x] Valider les datas(uri, actions)
- [x] Créer un Endpoint /capture
- [x] Créer une plus value au corp business ( extensions EPCIS )

# Project Configuration

Remplir le fichier .env

```

MONGODB_USER=user
MONGODB_PASSWORD=password
MONGODB_DATABASE=dbName
MONGODB_LOCAL_PORT=7017
MONGODB_DOCKER_PORT=27017

NODE_LOCAL_PORT=6868.    // port utilisé pour accéder à l'API
NODE_DOCKER_PORT=8080 


```
>Ce projet s'inscrivant dans un processus universitaire pour un POC, le fichier env est déja prérempli

# EndPoints

#### Get:
http://localhost:6868/api/capture/

#### Post:
http://localhost:6868/api/capture/
Payload : ContentType : application/Json
Object: EPCIS

# Run/stop the project

## Run

```bash
docker-compose up
```

## Stop

```bash
docker-compose down
```

# EPCIS
### EPCIS document  format

Object référence : https://ref.gs1.org/docs/epcis/examples/example_9.6.1-object_event.jsonld


# Data
### Project achitecture


![Screenshot 2023-05-27 at 12 08 10](https://github.com/Archyb/G3-iot/assets/121549285/ea5410f8-e57e-4ef3-b6da-7f404373d962)




### Gestion des Data


![Screenshot 2023-05-27 at 12 08 16](https://github.com/Archyb/G3-iot/assets/121549285/a8f71b6d-6d17-425e-9087-7e9012708f75)



### Tests et Validations



https://github.com/Archyb/G3-iot/assets/121549285/f63a903d-97bb-4d61-8306-137f707a8b6a

