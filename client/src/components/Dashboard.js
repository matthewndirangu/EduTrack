// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, CircularProgress, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || 'https://via.placeholder.com/150');

  // Sample student data (excluding profilePic)
  const studentData = {
    name: 'John Doe',
    class: '10A',
    admissionNo: 'ADM001',
    attendance: 95,
    grades: [
      { subject: 'Math', marks: 95, grade: 'A' },
      { subject: 'English', marks: 88, grade: 'B+' },
      { subject: 'Physics', marks: 92, grade: 'A-' },
      { subject: 'Chemistry', marks: 85, grade: 'B' },
      { subject: 'Computer', marks: 78, grade: 'B' },
    ],
    upcomingEvents: [
      { event: 'Math Exam', date: 'Oct 20, 2024' },
      { event: 'Science Project Submission', date: 'Oct 25, 2024' },
      { event: 'Parent-Teacher Meeting', date: 'Nov 1, 2024' },
    ],
  };

  // Chart.js data for grades
  const gradeData = {
    labels: studentData.grades.map((grade) => grade.subject),
    datasets: [
      {
        label: 'Marks',
        data: studentData.grades.map((grade) => grade.marks),
        backgroundColor: '#3498db',
      },
    ],
  };

  // Effect to listen for profile picture changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProfilePic = localStorage.getItem('profilePic');
      if (updatedProfilePic) {
        setProfilePic(updatedProfilePic); // Update the profile pic when it changes in localStorage
      }
    };

    window.addEventListener('storage', handleStorageChange); // Listen to changes in localStorage
    return () => {
      window.removeEventListener('storage', handleStorageChange); // Clean up listener on component unmount
    };
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f6fa' }}>
      {/* Dashboard Header */}
      <Typography variant="h3" align="center" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Welcome to your dashboard, {studentData.name}.
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview Card */}
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar src={profilePic} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{studentData.name}</Typography>
                  <Typography variant="subtitle1">Class: {studentData.class}</Typography>
                  <Typography variant="subtitle2">Admission No: {studentData.admissionNo}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Overview Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', margin: 'auto' }}>
                <CircularProgress
                  variant="determinate"
                  value={studentData.attendance}
                  size={100}
                  thickness={4}
                  color="primary"
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" component="div" color="textSecondary">
                    {`${studentData.attendance}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle2" align="center" sx={{ marginTop: '1rem' }}>
                Great attendance!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Grades Overview Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grades Overview
              </Typography>
              <Bar
                data={gradeData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events & Assignments
              </Typography>
              <Divider sx={{ marginBottom: '1rem' }} />
              <List>
                {studentData.upcomingEvents.map((event, index) => (
                  <ListItem key={index} sx={{ marginBottom: '0.5rem' }}>
                    <ListItemText primary={event.event} secondary={event.date} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;