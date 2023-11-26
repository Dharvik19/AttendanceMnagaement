const connection = require('../utils/dataBase'); // Assuming you have the MySQL connection established

exports.markAttendance = async (req, res) => {
    const { attendance } = req.body;
  
    try {
      for (const studentData of attendance) {
        const { studentName, status, date } = studentData;
  
        const insertQuery = 'INSERT INTO attendance (name, status, date) VALUES (?, ?, ?)';
        await connection.query(insertQuery, [studentName, status, date]);
      }
  
      res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (err) {
      console.error('Error marking attendance:', err);
      res.status(500).json({ error: 'Failed to mark attendance' });
    }
  };
  

exports.getStudents = async (req, res) => {
   const sql = 'SELECT * FROM students'

   connection.query(sql, (err, data)=>{
    if(err){
        return res.json(err);
    }else{
        return res.json(data);
    }
   })
  };

  exports.getAttendanceReport = async (req, res) => {
    try {
      const query = `
        SELECT s.student_id AS studentId, s.student_name AS studentName,
        COUNT(CASE WHEN a.status = 'present' THEN 1 ELSE NULL END) AS daysPresent,
        COUNT(CASE WHEN a.status = 'absent' THEN 1 ELSE NULL END) AS daysAbsent,
        COUNT(DISTINCT a.date) AS totalDays
        FROM students s
        LEFT JOIN attendance a ON s.student_id = a.student_id
        GROUP BY s.student_id, s.student_name
      `;
  
      const [attendanceReport] = await connection.query(query);
  
      res.status(200).json({ attendanceReport });
    } catch (err) {
      console.error('Error fetching attendance report:', err);
      res.status(500).json({ error: 'Failed to fetch attendance report' });
    }
  };

  
  exports.getStudentAttendanceByDate = async (req, res) => {
    try {
      const { date } = req.params;
  
      const query = `
        SELECT s.student_id AS studentId, s.student_name AS studentName, a.status
        FROM students s
        LEFT JOIN attendance a ON s.student_id = a.student_id
        WHERE a.date = ?
      `;
  
      const [attendanceData] = await connection.query(query, [date]);
  
      res.status(200).json({ attendanceData });
    } catch (err) {
      console.error('Error fetching student attendance:', err);
      res.status(500).json({ error: 'Failed to fetch student attendance' });
    }
  };