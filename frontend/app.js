async function markAttendance() {
    const selectedDate = document.getElementById('attendanceDate').value;
  
    const checkboxes = document.querySelectorAll('.student-checkbox');
    const attendanceData = [];
  
    checkboxes.forEach(checkbox => {
      attendanceData.push({
        studentName: checkbox.dataset.studentName,
        status: checkbox.checked ? 'present' : 'absent',
        date: selectedDate,
      });
    });
  
    const response = await fetch('http://localhost:8081/markAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attendance: attendanceData }),
    });
  
    if (response.ok) {
      alert('Attendance marked successfully!');
    } else {
      alert('Failed to mark attendance.');
    }
  }
  
  async function fetchStudents() {
    try {
      const response = await fetch('http://localhost:8081/students'); // Update the URL accordingly
      if (response.ok) {
        const data = await response.json();
        const studentsList = document.getElementById('studentsList');
  
        data.forEach(student => {
          const presentRadio = document.createElement('input');
          presentRadio.type = 'radio';
          presentRadio.className = 'student-radio';
          presentRadio.name = `student_${student.student_id}`; // Use the same name for grouping
          presentRadio.value = 'present';
          presentRadio.dataset.studentId = student.student_id; // Adjust according to your data structure
  
          const presentLabel = document.createElement('label');
          presentLabel.appendChild(document.createTextNode('Present'));
  
          const absentRadio = document.createElement('input');
          absentRadio.type = 'radio';
          absentRadio.className = 'student-radio';
          absentRadio.name = `student_${student.student_id}`; // Use the same name for grouping
          absentRadio.value = 'absent';
          absentRadio.dataset.studentId = student.student_id; // Adjust according to your data structure
  
          const absentLabel = document.createElement('label');
          absentLabel.appendChild(document.createTextNode('Absent'));
  
          const br = document.createElement('br');
  
          studentsList.appendChild(document.createTextNode(student.student_name + ': '));
          studentsList.appendChild(presentRadio);
          studentsList.appendChild(presentLabel);
          studentsList.appendChild(absentRadio);
          studentsList.appendChild(absentLabel);
          studentsList.appendChild(br);
        });
  
        const submitButton = document.getElementById('submitAttendance');
        submitButton.addEventListener('click', markAttendance);
      } else {
        console.error('Failed to fetch student list.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching student list.');
    }
  }
  
  
  window.onload = async function() {
    fetchStudents();
  };
  

async function getAttendanceReport() {
    try {
      const response = await fetch('http://localhost:8081/attendanceReport'); // Update the URL accordingly
      if (response.ok) {
        const attendanceReport = await response.json();
        const attendanceList = document.getElementById('attendanceList');
  
        attendanceReport.forEach(studentReport => {
          const listItem = document.createElement('li');
          listItem.textContent = `${studentReport.studentName} - Present: ${studentReport.daysPresent}, Absent: ${studentReport.daysAbsent}, Attendance Percentage: ${studentReport.attendancePercentage}%`;
          attendanceList.appendChild(listItem);
        });
      } else {
        console.error('Failed to fetch attendance report.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching attendance report.');
    }
  }
  
  document.getElementById('getAttendanceReport').addEventListener('click', getAttendanceReport);
  

  async function fetchStudentAttendanceByDate() {
    const dateInput = document.getElementById('attendanceDate');
    const selectedDate = dateInput.value; // Get the selected date
  
    try {
      const response = await fetch(`http://localhost:8081/attendance/${selectedDate}`); // Update the URL accordingly
      if (response.ok) {
        const attendanceData = await response.json();
        const attendanceList = document.getElementById('attendanceList');
        attendanceList.innerHTML = ''; // Clear the list before displaying new data
  
        attendanceData.forEach(student => {
          const listItem = document.createElement('li');
          listItem.textContent = `${student.studentName} - Status: ${student.status}`;
          attendanceList.appendChild(listItem);
        });
      } else {
        console.error('Failed to fetch student attendance.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching student attendance.');
    }
  }
  
  document.getElementById('fetchAttendanceByDate').addEventListener('click', fetchStudentAttendanceByDate);