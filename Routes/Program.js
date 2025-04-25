const {
    createProgram,
    getAllPrograms,
    getProgramById,
    updateProgram,
    deleteProgram
} = require('../Controller/Program');

const express = require('express');
const programController = express.Router();

programController.post('/', createProgram);
programController.get('/programs', getAllPrograms);
programController.get('/programs/:id', getProgramById);
programController.put('/programs/:id', updateProgram);
programController.delete('/programs/:id', deleteProgram);

module.exports = programController;
