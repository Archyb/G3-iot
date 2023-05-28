const db = require("../models");
const Epcis = db.Epcis;

// Ajouter un événement à la liste des événements d'un document Epcis
const { body, validationResult } = require('express-validator');

// Créer et enregistrer une nouvelle capture
exports.createCapture = [
    // Validate ID
    body('id').notEmpty().withMessage('ID cannot be empty!'),

    // Valider readPoint
    body('epcisBody.eventList[0].readPoint.id')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid readPoint ID format!'),

    // Valider epcList
    body('epcisBody.eventList[0].epcList.*')
        .matches(/^urn:epc:id:sgtin:\d{7}\.\d{6}\.\d{3}$/)
        .withMessage('Invalid EPC format in epcList!'),

    body('epcisBody.eventList[0].bizStep')
        .matches(/^urn:epcglobal:cbv:bizstep:(shipping|receiving)$/)
        .withMessage('Invalid bizStep format in Bizstep!'),

    body('epcisBody.eventList[0].bizLocation.id')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{1}$/)
        .withMessage('Invalid bizLocation ID format!'),


    body('epcisBody.eventList[0].disposition')
        .matches(/^urn:epcglobal:cbv:bizstep:in_transit/)
        .withMessage('Invalid bizStep format in disposition!'),

    // Valider action
    body('epcisBody.eventList[0].action')
        .isIn(['add', 'observe', 'delete'])
        .withMessage('Invalid action! Valid values are "add", "observe" or "delete".'),

    // Valider sourceList
    body('epcisBody.eventList[0].sourceList.*.source')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid sourceList ID format!'),

    // Valider destinationList
    body('epcisBody.eventList[0].destinationList.*.destination')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid destinationList ID format!'),


    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const captureId = req.body.id;
        const event = req.body.epcisBody.eventList[0];

        // Find the existing Epcis document with the provided ID
        Epcis.findOne({ id: captureId })
            .then(epcis => {
                if (!epcis) {
                    // No existing Epcis document found, create a new Epcis document
                    const newEpcis = new Epcis({
                        "@context": req.body["@context"],
                        id: captureId,
                        type: req.body.type,
                        schemaVersion: req.body.schemaVersion,
                        creationDate: req.body.creationDate,
                        epcisBody: {
                            eventList: [event]
                        }
                    });

                    // Save the new Epcis document in the database
                    newEpcis
                        .save()
                        .then(data => {
                            res.status(201).send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Some error occurred while creating the Capture.'
                            });
                        });
                } else {
                    // Existing Epcis document found, check if the event already exists
                    const eventExists = epcis.epcisBody.eventList.some(existingEvent => existingEvent.eventID === event.eventID);

                    if (eventExists) {
                        return res.status(409).json({ message: 'Event already exists in the Epcis document.' });
                    }

                    // Add the event to the eventList of the existing Epcis document
                    epcis.epcisBody.eventList.push(event);

                    // Save the modifications in the database
                    epcis
                        .save()
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Some error occurred while adding event to the Epcis document.'
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error retrieving Epcis document.'
                });
            });
    }
];



// Supprimer tous les documents Epcis de la base de données
exports.deleteAllEpcis = (req, res) => {
    Epcis.deleteMany({})
        .then(() => {
            res.status(200).send({ message: 'All Epcis documents have been deleted successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting Epcis documents.'
            });
        });
};
// Retrieve all Captures from the database.
exports.findAllCaptures = (req, res) => {
    Epcis.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Captures."
            });
        });
};

