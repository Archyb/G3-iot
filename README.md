# Objectifs:

- [x] Créer un model basée sur la norme EPCIS
- [x] Valider les datas(uri, actions)
- [x] Créer un Endpoint /capture ou chaque nouvel evenement lié a un document EPCIS s'ajout a l event list

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



![Screenshot 2023-05-27 at 11 47 17](https://github.com/Archyb/G3-iot/assets/121549285/cc738843-c166-4a00-ac8c-d9371d8781da)




### Gestion des Data


![Screenshot 2023-05-27 at 12 08 16](https://github.com/Archyb/G3-iot/assets/121549285/44b66842-873a-402f-9e9d-85cf69f553d1)




### Tests et Validations



https://app.getpostman.com/join-team?invite_code=beee8acd5141bf1080133bdac8271efe&target_code=c7283d7c5b57f2c8a2c813a77cce624e

