const mongoose = require("mongoose");
const ExerciseValidationCode = require('../models/ExerciseValidationCode');

exports.getExerciseValidationCodeByName = async (req, res) => {
    const { exerciseValidationCodeName } = req.params;

    try {
        console.log(exerciseValidationCodeName);
        console.log(exerciseValidationCodeName);
        const validationCode = await ExerciseValidationCode.findOne({ name: exerciseValidationCodeName });

        if (!validationCode) {
            return res.status(404).json({ message: 'ExerciseValidationCode not found' });
        }

        res.status(200).json(validationCode);
    } catch (error) {
        console.error('Error fetching ExerciseValidationCode by name:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
