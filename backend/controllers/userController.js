const { getDB } = require('../db');

exports.registerUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;
    try {
        const db = getDB();
        const existingUser = await db.collection('Users').findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email or username already in use' });
        }
        const result = await db.collection('Users').insertOne({
            name,
            username,
            email,
            role
        });
        res.status(201).json({ success: true, userId: result.insertedId });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

