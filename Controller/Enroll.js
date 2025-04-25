const Enrollment = require('../Model/Enrollment');
const Client = require('../Model/Clients');
const Program = require('../Model/Programs.JS');

// Create Enrollment
exports.createEnrollment = async (req, res) => {
  const { client_id, program_name, medical_history} = req.body;

  if (!client_id || !program_name || !medical_history) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
  }

  try {    
    const findProgram = await Program.findOne({ where: { program_name: program_name } });

    if (!findProgram) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    const enrollment = await Enrollment.create({
      client_id,
      program_id: findProgram.program_id,
      medical_history,
      enrolled_on: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while creating enrollment' });
  }
};


// Get client's enrolled programs
exports.getClientPrograms = async (req, res) => {
  try {
      const client_id  = req.params.client_id;

      const programs = await Enrollment.findAll({
          where: { client_id },
          include: [{
              model: Program,
              attributes: ['program_name', 'code'] 
          }]
      });

      res.json({
          success: true,
          count: programs.length,
          data: programs
      });

  } catch (error) {
      console.error('Error fetching client programs:', error);
      res.status(500).json({
          success: false,
          message: 'Server error while fetching client programs'
      });
  }
};






// Delete Enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const  id  = req.params.id;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    await enrollment.destroy();

    res.json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while deleting enrollment' });
  }
};
