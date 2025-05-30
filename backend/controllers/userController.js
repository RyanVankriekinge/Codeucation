const { getDB } = require('../db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, firstname, email, password, role } = req.body;
    try {
        const db = getDB();

        const existingUser = await db.collection('Users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const baseUsername = `${firstname}${name}`.replace(/\s+/g, '');

        const takenUsernames = await db.collection('Users')
            .find({ username: { $regex: `^${baseUsername}` } })
            .toArray();

        let username = baseUsername;
        if (takenUsernames.length > 0) {
            let maxSuffix = 0;
            takenUsernames.forEach(user => {
                const match = user.username.match(new RegExp(`^${baseUsername}(\\d+)?$`));
                if (match && match[1]) {
                    const num = parseInt(match[1], 10);
                    if (num > maxSuffix) maxSuffix = num;
                } else if (user.username === baseUsername) {
                    maxSuffix = 1;
                }
            });
            username = `${baseUsername}${maxSuffix + 1}`;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection('Users').insertOne({
            name,
            firstname,
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ success: true, userId: result.insertedId, username });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = getDB();
        const user = await db.collection('Users').findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Ongeldig e-mailadres of wachtwoord' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Ongeldig e-mailadres of wachtwoord' });
        }

        req.session.user = {
            userId: user._id,
            username: user.username,
            firstname: user.firstname,
            email: user.email,
            role: user.role
        };

        req.session.save(err => {
            if (err) return res.status(500).json({ success: false, message: 'Sessie opslaan mislukt' });
            res.json({ success: true, userId: user._id });
        });
    } catch (error) {
        console.error('Fout bij inloggen:', error);
        res.status(500).json({ success: false, message: 'Serverfout' });
    }
};

exports.checkLogin = (req, res) => {
    if (req.session && req.session.user) {
        const { username, email, userId, role, firstname } = req.session.user;
        res.json({ success: true, username, email, userId, role, firstname });
    } else {
        res.json({ success: false, message: 'User is not authenticated' });
    }
};

