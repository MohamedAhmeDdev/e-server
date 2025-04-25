const Program = require('../Model/Programs.JS');

// Create Program
exports.createProgram = async (req, res) => {
  const { program_name, code, disease, description } = req.body;

  if (!program_name || !code || !disease || !description) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newProgram = await Program.create({
      program_name,
      code,
      disease,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: newProgram
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while creating program' });
  }
};


// Get All Programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching programs' });
  }
};



// Get Program by ID
exports.getProgramById = async (req, res) => {
  try {
    const  id  = req.params.id;
    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    res.json({ success: true, data: program });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching program' });
  }
};


// Update Program
exports.updateProgram = async (req, res) => {
  try {
    const  id  = req.params.id;
    const updateData = req.body;

    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    await program.update(updateData);

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: program
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while updating program' });
  }
};

// Delete Program
exports.deleteProgram = async (req, res) => {
  try {
    const  id  = req.params.id;

    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    await program.destroy();

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while deleting program' });
  }
};
