const Enrollment = require('../Model/Enrollment');
const Client = require('../Model/Clients');
const Program = require('../Model/Programs.JS');

// Create Enrollment
exports.createEnrollment = async (req, res) => {
  const { client_id, medicalHistory, program_name } = req.body;
  console.log("Program names received:", program_name);

  if (!client_id || !medicalHistory || !program_name || program_name.length === 0) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
  }

  try {
    const programsFound = await Program.findAll({
      where: {
        program_name: program_name,
      },
    });

    if (programsFound.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No programs found with the provided names' 
      });
    }

    if (programsFound.length !== program_name.length) {
      const foundNames = programsFound.map(p => p.program_name);
      const missingNames = program_name.filter(name => !foundNames.includes(name));
      
      return res.status(404).json({
        success: false,
        message: 'Some programs not found',
        missingPrograms: missingNames
      });
    }

    const enrollments = await Promise.all(
      programsFound.map((program) =>
        Enrollment.create({
          client_id: client_id,
          program_id: program.program_id,
          medical_history: medicalHistory,
          enrolled_on: new Date(),
        })
      )
    );

    res.status(201).json({
      success: true,
      message: 'Enrollment(s) created successfully',
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating enrollment',
      error: error.message 
    });
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
          }]
      });

      res.json({
          success: true,
          count: programs.length,
          data: programs
      });

  } catch (error) {
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
