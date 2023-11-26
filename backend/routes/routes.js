const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
// Route to fetch the list of students
router.get('/students', controller.getStudents);

// Route to mark attendance
router.post('/markAttendance', controller.markAttendance);

//Route to get attendance report
router.get('/getAttendanceReport', controller.getAttendanceReport);

router.get('/attendance/:date', controller.getStudentAttendanceByDate);

module.exports = router;
