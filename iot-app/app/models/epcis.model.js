const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {

    const objSchema = new Schema({
        "@context": [
            "https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld",
            {
                example: "http://ns.example.com/epcis/"
            }
        ],
        id: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        schemaVersion: {
            type: String,
            required: true
        },
        creationDate: {
            type: Date,
            required: true
        },
        epcisBody: {
            eventList: [
                {
                    eventID: {
                        type: String,
                        required: true
                    },
                    type: {
                        type: String,
                        required: true
                    },
                    action: {
                        type: String,
                        required: true
                    },
                    bizStep: {
                        type: String,
                        required: true
                    },
                    bizLocation: {
                        type:String,
                        required: true
                    },
                    disposition: {
                        type: String,
                        required: true
                    },
                    epcList: [
                        {
                            type: String,
                            required: true
                        }
                    ],
                    eventTime: {
                        type: Date,
                        required: true
                    },
                    eventTimeZoneOffset: {
                        type: String,
                        required: true
                    },
                    readPoint: {
                        id: {
                            type: String,
                            required: true
                        }
                    },
                    bizTransactionList: [
                        {
                            type: {
                                type: String,
                                required: true
                            },
                            bizTransaction: {
                                type: String,
                                required: true
                            }
                        }
                    ],
                    sourceList: [
                        {
                            type: {
                                type: String,
                                required: true
                            },
                            source: {
                                type: String,
                                required: true
                            }
                        }
                    ],
                    destinationList: [
                        {
                            type: {
                                type: String,
                                required: true
                            },
                            destination: {
                                type: String,
                                required: true
                            }
                        }],
                }
            ]
        },


    });
    const Epcis = mongoose.model('Epcis', objSchema);
    return Epcis
}


