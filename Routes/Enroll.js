const {
    createEnrollment,
    getClientPrograms,
    deleteEnrollment
} = require('../Controller/Enroll');

const express = require('express');
const enrollmentController = express.Router();

enrollmentController.post('/', createEnrollment);
enrollmentController.get('/enrollments/:client_id', getClientPrograms);
enrollmentController.delete('/enrollments/:id', deleteEnrollment);

module.exports = enrollmentController;
