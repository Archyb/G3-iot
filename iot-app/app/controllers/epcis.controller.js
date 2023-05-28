const db = require("../models");
const Epcis = db.Epcis;

// Create and Save a new Capture
const {body, validationResult} = require('express-validator');

exports.createCapture = [
    // Validate ID
    body('id').notEmpty().withMessage('ID cannot be empty!'),

    // Validate readPoint
    body('epcisBody.eventList[0].readPoint.id')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid readPoint ID format!'),

    // Validate epcList
    body('epcisBody.eventList[0].epcList.*')
        .matches(/^urn:epc:id:sgtin:\d{7}\.\d{6}\.\d{4}$/)
        .withMessage('Invalid EPC format in epcList!'),
    body('epcisBody.eventList[0].epcList.*.bizStep')
        .matches(/^urn:epcglobal:cbv:bizstep:\w+$/)
        .withMessage('Invalid bizStep format in epcList!'),
    // Validate action
    body('epcisBody.eventList[0].action')
        .isIn(['add', 'observe', 'delete'])
        .withMessage('Invalid action! Valid values are "add", "observe" or "delete".'),

    // Validate sourceList
    body('epcisBody.eventList[0].sourceList.*.source')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid sourceList ID format!'),

    // Validate destinationList
    body('epcisBody.eventList[0].destinationList.*.destination')
        .matches(/^urn:epc:id:sgln:\d{7}\.\d{5}\.\d{4}$/)
        .withMessage('Invalid destinationList ID format!'),

    body('epcisBody.eventList[0].bizTransactionList')
        .not()
        .withMessage('bizTransactionList cannot be empty!'),

    body('epcisBody.eventList[0].sourceList')
        .not()
        .withMessage('sourceList cannot be empty!'),
    body('epcisBody.eventList[0].destinationList')
        .not()
        .withMessage('destinationList cannot be empty!'),


    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // Create a Capture
        const capture = new Epcis({
            "@context": req.body["@context"],
            id: req.body.id,
            type: req.body.type,
            schemaVersion: req.body.schemaVersion,
            creationDate: req.body.creationDate,
            epcisBody: req.body.epcisBody,

        });

        // Save Capture in the database
        capture
            .save(capture)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Capture."
                });
            });
    }
];
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

