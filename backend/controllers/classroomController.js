const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.createClassroom = async (req, res) => {
    try {
        const db = getDB();
        const { name, schoolId } = req.body;

        if (!name || !schoolId) return res.status(400).json({ error: 'Name and schoolId are required' });

        const classroom = {
            name,
            schoolId: new ObjectId(schoolId)
        };

        const result = await db.collection('Classrooms').insertOne(classroom);

        res.status(201).json({ success: true, classroomId: result.insertedId, ...classroom });
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllClassrooms = async (req, res) => {
    try {
        const db = getDB();
        const classrooms = await db.collection('Classrooms').find().toArray();
        res.json(classrooms);
    } catch (error) {
        console.error('Error getting classrooms:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getClassroomsBySchool = async (req, res) => {
    try {
        const db = getDB();
        const { schoolId } = req.params;

        if (!ObjectId.isValid(schoolId)) {
            return res.status(400).json({ error: 'Invalid schoolId' });
        }

        const classrooms = await db.collection('Classrooms').find({ schoolId: new ObjectId(schoolId) }).toArray();

        res.json(classrooms);
    } catch (error) {
        console.error('Error fetching classrooms by school:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getClassroomById = async (req, res) => {
    try {
        const db = getDB();
        let { classroomId } = req.params;
        if (!ObjectId.isValid(classroomId)) {
            return res.status(400).json({ error: 'Invalid classroom ID' });
        }

        classroomId = new ObjectId(classroomId);

        const classroom = await db.collection('Classrooms').findOne({ _id: classroomId });
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        const school = await db.collection('Schools').findOne({ _id: classroom.schoolId });
        classroom.schoolName = school ? school.name : "Unknown School";

        const userClassrooms = await db.collection('User_Classroom').find({ classroomId }).toArray();
        const userIds = userClassrooms.map(uc => uc.userId);

        const users = await db.collection('Users').find({ _id: { $in: userIds } }).toArray();
        classroom.teachers = users.filter(user => user.role === 'leraar').map(user => `${user.firstname} ${user.name}`);
        classroom.students = users.filter(user => user.role === 'leerling').map(user => ({
            _id: user._id,
            firstname: user.firstname,
            name: user.name
        }));

        const classroomCourses = await db.collection('Classroom_Course').find({ classroomId }).toArray();
        const courseIds = classroomCourses.map(cc => cc.courseId);
        const courses = await db.collection('Courses').find({ _id: { $in: courseIds } }).toArray();

        classroom.courses = courses.map(course => ({
            _id: course._id,
            title: course.title,
            hidden: course.hidden || false
        }));

        res.json(classroom);
    } catch (error) {
        console.error('Error fetching classroom info:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
