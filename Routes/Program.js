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
programController.get('/', getAllPrograms);
programController.get('/:id', getProgramById);
programController.put('/:id', updateProgram);
programController.delete('/:id', deleteProgram);

module.exports = programController;
