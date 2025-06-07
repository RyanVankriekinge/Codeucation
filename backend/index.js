const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDB } = require('./db');

const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes')
const userClassroomRoutes = require('./routes/userClassroomRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5173'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'setsecrethere',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/classroom-users', userClassroomRoutes);


// Connect to Mongo db and start server
connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to DB:', err);
    });
