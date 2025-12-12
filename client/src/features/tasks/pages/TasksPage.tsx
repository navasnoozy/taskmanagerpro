import { Add, FilterList, Search, Sort } from "@mui/icons-material";
import { Box, Chip, CircularProgress, Container, Fab, FormControl, Grid, IconButton, InputBase, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { SortBy, TaskStatus } from "../../../store";
import { closeForm, openForm, setFilterStatus, setSearchQuery, setSortBy, useAppDispatch, useAppSelector } from "../../../store";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import useGetTasks from "../hooks/useGetTasks";

const TasksPage = () => {
    const dispatch = useAppDispatch();
    const { isFormOpen, selectedTask, searchQuery, filterStatus, sortBy } = useAppSelector((state) => state.tasks);
    const { data: tasks, isLoading, error } = useGetTasks();
    
    const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
    const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);

    const handleCreate = () => {
        dispatch(openForm(undefined));
    };

    const handleEdit = (task: Parameters<typeof openForm>[0]) => {
        dispatch(openForm(task));
    };

    const handleClose = () => {
        dispatch(closeForm());
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleFilterChange = (status: TaskStatus) => {
        dispatch(setFilterStatus(status));
        setFilterAnchor(null);
    };

    const handleSortChange = (sort: SortBy) => {
        dispatch(setSortBy(sort));
        setSortAnchor(null);
    };

    let filteredTasks = tasks?.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            task.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    }) || [];

    filteredTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'dueDate':
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            case 'priority': {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            case 'createdAt':
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
    if (error) return <Container sx={{ mt: 4 }}><Typography color="error" textAlign="center">Error loading tasks: {error.message}</Typography></Container>;

    return (
        <Container maxWidth="md" sx={{ py: 2, minHeight: '80vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    My Tasks
                </Typography>

                <Fab color="primary" aria-label="add" onClick={handleCreate} size="medium" variant="extended">
                    <Add sx={{ mr: 1 }} />
                    New Task
                </Fab>
            </Box>

            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                <Paper
                    elevation={0}
                    sx={{ 
                        p: '2px 4px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: { xs: '100%', sm: 300 }, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        borderRadius: 2,
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                </Paper>

                <FormControl size="small">
                    <Chip
                        icon={<FilterList />}
                        label={filterStatus === 'all' ? 'All Status' : filterStatus}
                        onClick={(e) => setFilterAnchor(e.currentTarget)}
                        variant={filterStatus === 'all' ? 'outlined' : 'filled'}
                        color={filterStatus === 'all' ? 'default' : 'primary'}
                        sx={{ textTransform: 'capitalize' }}
                    />
                    <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
                        <MenuItem onClick={() => handleFilterChange('all')} selected={filterStatus === 'all'}>All</MenuItem>
                        <MenuItem onClick={() => handleFilterChange('pending')} selected={filterStatus === 'pending'}>Pending</MenuItem>
                        <MenuItem onClick={() => handleFilterChange('in-progress')} selected={filterStatus === 'in-progress'}>In Progress</MenuItem>
                        <MenuItem onClick={() => handleFilterChange('completed')} selected={filterStatus === 'completed'}>Completed</MenuItem>
                    </Menu>
                </FormControl>

                <FormControl size="small">
                    <Chip
                        icon={<Sort />}
                        label={sortBy === 'createdAt' ? 'Newest' : sortBy === 'title' ? 'Title' : sortBy === 'dueDate' ? 'Due Date' : 'Priority'}
                        onClick={(e) => setSortAnchor(e.currentTarget)}
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                    />
                    <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
                        <MenuItem onClick={() => handleSortChange('createdAt')} selected={sortBy === 'createdAt'}>Newest First</MenuItem>
                        <MenuItem onClick={() => handleSortChange('title')} selected={sortBy === 'title'}>Title</MenuItem>
                        <MenuItem onClick={() => handleSortChange('dueDate')} selected={sortBy === 'dueDate'}>Due Date</MenuItem>
                        <MenuItem onClick={() => handleSortChange('priority')} selected={sortBy === 'priority'}>Priority</MenuItem>
                    </Menu>
                </FormControl>
            </Stack>

            <Grid container spacing={2}>
                {filteredTasks.map((task) => (
                    <Grid size={{ xs: 12 }} key={task._id}>
                        <TaskItem task={task} onEdit={handleEdit} />
                    </Grid>
                ))}
                
                {filteredTasks.length === 0 && (
                    <Box sx={{ width: '100%', textAlign: 'center', mt: 8, opacity: 0.7 }}>
                        <Typography variant="h6" color="text.secondary">
                            {searchQuery || filterStatus !== 'all' ? "No tasks match your filters." : "No tasks found."}
                        </Typography>
                        {!searchQuery && filterStatus === 'all' && (
                            <Typography variant="body2" color="text.secondary">
                                Click "New Task" to create one.
                            </Typography>
                        )}
                    </Box>
                )}
            </Grid>

            <TaskForm open={isFormOpen} onClose={handleClose} taskToEdit={selectedTask ?? undefined} />
        </Container>
    );
};

export default TasksPage;
