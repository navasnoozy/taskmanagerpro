import { useState } from "react";
import { Container, Typography, Fab, Grid, Box, CircularProgress, Paper, InputBase, IconButton } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import useGetTasks from "../hooks/useGetTasks";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import type { Task } from "../../../schemas/task.schema";

const TasksPage = () => {
    const { data: tasks, isLoading, error } = useGetTasks();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCreate = () => {
        setTaskToEdit(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (task: Task) => {
        setTaskToEdit(task);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setTaskToEdit(undefined);
    };

    const filteredTasks = tasks?.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
    if (error) return <Container sx={{ mt: 4 }}><Typography color="error" textAlign="center">Error loading tasks: {error.message}</Typography></Container>;

    return (
        <Container maxWidth="md" sx={{ py: 4, minHeight: '80vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                    My Tasks
                </Typography>
                
                <Paper
                    elevation={0}
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 300 }, border: '1px solid #e0e0e0', borderRadius: 2 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                </Paper>

                <Fab color="primary" aria-label="add" onClick={handleCreate} size="medium" variant="extended">
                    <Add sx={{ mr: 1 }} />
                    New Task
                </Fab>
            </Box>

            <Grid container spacing={2}>
                {filteredTasks?.map((task) => (
                    <Grid size={{ xs: 12 }} key={task._id}>
                        <TaskItem task={task} onEdit={handleEdit} />
                    </Grid>
                ))}
                
                {!isLoading && filteredTasks?.length === 0 && (
                    <Box sx={{ width: '100%', textAlign: 'center', mt: 8, opacity: 0.7 }}>
                        <Typography variant="h6" color="text.secondary">
                            {searchTerm ? "No tasks match your search." : "No tasks found."}
                        </Typography>
                         {!searchTerm && <Typography variant="body2" color="text.secondary">
                            Click "New Task" to create one.
                        </Typography>}
                    </Box>
                )}
            </Grid>

            <TaskForm open={isFormOpen} onClose={handleClose} taskToEdit={taskToEdit} />
        </Container>
    );
};

export default TasksPage;
