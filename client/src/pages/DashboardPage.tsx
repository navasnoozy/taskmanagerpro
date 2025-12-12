import { Grid, Paper, Typography, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const DashboardPage = () => {
    // Placeholder data - in a real app, this would come from an API
    const stats = [
        { title: 'Total Tasks', value: 12, icon: <AssignmentIcon fontSize="large" color="primary" />, color: '#e3f2fd' },
        { title: 'Completed', value: 8, icon: <CheckCircleIcon fontSize="large" color="success" />, color: '#e8f5e9' },
        { title: 'Pending', value: 4, icon: <PendingIcon fontSize="large" color="warning" />, color: '#fff3e0' },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={4}>
                <GridViewIcon sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h4" fontWeight="bold">
                    Dashboard
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                backgroundColor: stat.color,
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h3" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                </Box>
                                {stat.icon}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Activity or other sections could go here */}
             <Box mt={4}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                     <Typography variant="h6" gutterBottom>
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

export default DashboardPage;
