const { getDB } = require('../db');

exports.createSchool = async (req, res) => {
    try {
        const db = getDB();
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: 'Name is required' });

        const result = await db.collection('Schools').insertOne({ name });

        res.status(201).json({ success: true, schoolId: result.insertedId, name });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
