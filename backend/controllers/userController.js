const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, firstname, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const baseUsername = `${firstname}${name}`.replace(/\s+/g, '');
        let username = baseUsername;

        const takenUsernames = await User.find({ username: new RegExp(`^${baseUsername}`) });

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

        const newUser = new User({
            name,
            firstname,
            username,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({ success: true, userId: newUser._id, username });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
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

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to logout' });
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logged out successfully' });
    });
};
