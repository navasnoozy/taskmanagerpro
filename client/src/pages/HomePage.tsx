// src/pages/HomePage.tsx
import { Box, Typography, Stack } from '@mui/material';
import useCurrentUser from '../features/auth/hooks/useCurrentUser';

const HomePage = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <Box>
      <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
        <Typography variant="h3" component="h1" fontWeight="bold">
          Welcome to Task Manager Pro
        </Typography>
        {currentUser ? (
          <Typography variant="h6" color="text.secondary">
            Hello, {currentUser.name || currentUser.email}! Ready to manage your tasks?
          </Typography>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Sign in to start managing your tasks efficiently.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
