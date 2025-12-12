import { Box, Skeleton, Stack } from "@mui/material";

interface TaskSkeletonProps {
  count?: number;
}

const TaskSkeleton = ({ count = 3 }: TaskSkeletonProps) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={28} />
              <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Skeleton variant="rounded" width={70} height={24} />
                <Skeleton variant="rounded" width={70} height={24} />
              </Stack>
            </Box>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default TaskSkeleton;
