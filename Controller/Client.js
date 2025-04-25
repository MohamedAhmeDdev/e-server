const Client = require('../Model/Clients');
const Enrollment = require('../Model/Enrollment');
const Program = require('../Model/Programs.JS');

// Create Client
exports.createClient = async (req, res) => {
  const { first_name, last_name, gender, date_of_birth, phone, email } = req.body;

  if (!first_name || !last_name || !gender || !date_of_birth || !phone || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newClient = await Client.create({
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      email
    });

    res.status(201).json({
        success: true,
        message: 'client created successfully',
        data: newClient 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get single client
exports.getClientById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      res.status(200).json({ success: true, data: client });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

// Update client information
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        await client.update(updateData);

        res.json({
            success: true,
            message: 'Client updated successfully',
            data: client
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating client'
        });
    }
};


// Delete client
exports.deleteClient = async (req, res) => {
    try {
        const id  = req.params.id;

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        await client.destroy();

        res.json({
            success: true,
            message: 'Client deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting client'
        });
    }
};



// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false,   message: 'Server error. Please try again later.' });
  }
};


// get clients profile
exports.getClientProfile = async (req, res) => {
    try {
        const  id  = req.params.id;
        const client = await Client.findByPk(id, {
            include: [{
                model: Enrollment,
                include: [{
                    model: Program,
                    attributes: ['program_name', 'code'] 
                }]
            }]
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.json({
            success: true,
            data: client
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'Server error while fetching client profile'
        });
    }
};


