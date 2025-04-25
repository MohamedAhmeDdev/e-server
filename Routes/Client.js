const {
    createClient,
    updateClient, 
    deleteClient,
    getAllClients,
    getClientById,
    getClientProfile,
} = require('../Controller/Client');

const express = require('express');
const ClientRouter = express.Router();

ClientRouter.post('/', createClient);
ClientRouter.put('/:id', updateClient);
ClientRouter.delete('/:id', deleteClient);
ClientRouter.get('/clients', getAllClients);
ClientRouter.get('/client/:id' ,getClientById)
ClientRouter.get('/client/profile/:id', getClientProfile);

module.exports = ClientRouter;
