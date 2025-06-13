const School = require('../models/School');

exports.createSchool = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: 'Name is required' });

        const newSchool = new School({ name });
        await newSchool.save();

        res.status(201).json({ success: true, schoolId: newSchool._id, name });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.json(schools);
    } catch (error) {
        console.error('Error getting schools:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
