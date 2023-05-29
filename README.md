# Objectifs:

- [x] Créer un model basée sur la norme EPCIS
- [x] Valider les datas(uri, actions)
- [x] Créer un Endpoint /capture ou chaque nouvel evenement lié a un document EPCIS s'ajoute a l event list

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

- Explication de l'event ObjectEvent selon les standards EPCIS GS1


1. eventTime : Il spécifie la date et l'heure de l'événement, ce qui est conforme aux exigences du standard EPCIS.

2. eventTimeZoneOffset : Il indique le décalage horaire de l'événement, ce qui est également conforme aux spécifications du standard EPCIS.

3. epcList : Il contient une liste d'EPC (Electronic Product Code), qui est une représentation valide d'identification des produits dans le standard EPCIS.

4. action : Il indique l'action liée à l'événement, dans ce cas, "OBSERVE". Cela correspond aux valeurs d'action définies par le standard EPCIS.

5. bizStep : Il utilise l'URN "urn:epcglobal:cbv:bizstep:shipping", qui fait référence à une étape commerciale spécifique, conformément aux spécifications du standard EPCIS.

6. disposition : Il utilise l'URN "urn:epcglobal:cbv:disp:intransit", qui spécifie la disposition de l'événement, en l'occurrence, "intransit" (en transit). Cela est également conforme aux spécifications du standard EPCIS.

7. readPoint : Il contient l'URN d'un point de lecture, qui identifie l'endroit où l'événement a été lu ou capturé. L'URN utilisé suit le format approprié pour le point de lecture.

8. bizLocation : Il contient l'URN d'un lieu commercial, qui identifie l'endroit où l'événement a eu lieu. L'URN utilisé suit le format approprié pour le lieu commercial.

9. sourceList et destinationList : Ces attributs fournissent des informations sur la source (ferme) et la destination (boucherie) respectivement. Les attributs "sourceURN" et "destinationURN" utilisent des URN conformes aux spécifications GS1 pour identifier de manière unique ces entités.**
{
  "eventTime": "2023-05-28T10:00:00Z",
  "eventTimeZoneOffset": "+02:00",
  "epcList": ["urn:epc:id:sgtin:123456789.123456.01"],
  "action": "OBSERVE",
  "bizStep": "urn:epcglobal:cbv:bizstep:shipping",
  "disposition": "urn:epcglobal:cbv:disp:in_transit",
  "readPoint": "urn:epc:id:sgln:987654321.9876.01",
  "bizLocation": "urn:epc:id:sgln:123456789.1234.01",
  "sourceList": [
    {
      "source": "Farm XYZ",
      "sourceURN": "urn:epc:id:sgln:123456789.0001"
    }
  ],
  "destinationList": [
    {
      "destination": "Butcher Shop ABC",
      "destinationURN": "urn:epc:id:sgln:987654321.0001"
    }
  ]
}


### Tests et Validations



https://app.getpostman.com/join-team?invite_code=beee8acd5141bf1080133bdac8271efe&target_code=c7283d7c5b57f2c8a2c813a77cce624e

