const express = require('express');
const {Doctor} = require("../model/doctor");

const drrouter = express.Router();

// Endpoint to onboard a new doctor
drrouter.post('/appointments', async (req, res) => {
  try {
    const {
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    const doctor = new Doctor({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    await doctor.save();
    res.status(201).json({ message: 'Doctor onboarded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' ,"msg":error.message});
  }
});


// Add this route to fetch all doctors
drrouter.get('/appointments', async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' ,"msg":error.message});
    }
});

drrouter.patch('/appointments/:id', async (req, res) => {
    const doctorId = req.params.id;
    const updatedData = req.body;
  
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });
  
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.json(updatedDoctor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Delete a doctor appointment
  drrouter.delete('/appointments/:id', async (req, res) => {
    const doctorId = req.params.id;
  
    try {
      const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
  
      if (!deletedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
module.exports = {drrouter};
