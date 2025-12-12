import { Box, Typography, Stack, Grid, Paper, Button } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import LoginIcon from '@mui/icons-material/Login';
import useCurrentUser from '../features/auth/hooks/useCurrentUser';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Total Tasks', 
      value: 12, 
      icon: <AssignmentIcon fontSize="large" />,
      bgColor: 'primary.main',
      iconBg: 'rgba(99, 102, 241, 0.15)',
    },
    { 
      title: 'Completed', 
      value: 8, 
      icon: <CheckCircleIcon fontSize="large" />,
      bgColor: 'success.main',
      iconBg: 'rgba(16, 185, 129, 0.15)',
    },
    { 
      title: 'Pending', 
      value: 4, 
      icon: <PendingIcon fontSize="large" />,
      bgColor: 'warning.main',
      iconBg: 'rgba(245, 158, 11, 0.15)',
    },
  ];

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return (
      <Box>
        <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '70vh' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="bold" 
            textAlign="center"
            sx={{
              background: (theme) => 
                theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #818CF8 0%, #F472B6 100%)'
                  : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Task Manager Pro
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" maxWidth="500px">
            Organize your tasks, boost your productivity, and never miss a deadline.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<LoginIcon />}
            onClick={() => navigate('/signin')}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
              }
            }}
          >
            Sign In to Get Started
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <GridViewIcon sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back, <strong>{currentUser.name || currentUser.email}</strong>!
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => 
                    theme.palette.mode === 'dark'
                      ? '0 10px 40px rgba(0,0,0,0.4)'
                      : '0 10px 40px rgba(0,0,0,0.1)',
                  borderColor: stat.bgColor,
                },
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={500}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 3,
                    backgroundColor: stat.iconBg,
                    color: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            border: '1px solid', 
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Recent Activity
          </Typography>
          <Typography color="text.secondary">
            No recent activity to show.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;
