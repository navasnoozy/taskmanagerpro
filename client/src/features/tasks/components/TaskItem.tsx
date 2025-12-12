import { Card, CardContent, Typography, IconButton, Box, Chip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { Task } from "../../../schemas/task.schema";
import useDeleteTask from "../hooks/useDeleteTask";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const getPriorityColor = (priority: string) => {
    switch(priority) {
        case 'high': return 'error';
        case 'medium': return 'warning';
        case 'low': return 'success';
        default: return 'default';
    }
}

const getStatusColor = (status: string) => {
    switch(status) {
        case 'completed': return 'success';
        case 'in-progress': return 'primary';
        case 'pending': return 'default';
        default: return 'default';
    }
}

const TaskItem = ({ task, onEdit }: TaskItemProps) => {
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleDelete = () => {
        deleteTask(task._id);
        setConfirmOpen(false);
    };

    return (
        <>
            <Card sx={{ 
                mb: 2, 
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                }
            }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                            {task.title}
                        </Typography>
                        <Box>
                            <IconButton size="small" onClick={() => onEdit(task)} color="primary">
                                <Edit fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => setConfirmOpen(true)} color="error" disabled={isDeleting}>
                                <Delete fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    
                    {task.description && (
                        <Typography color="text.secondary" variant="body2" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                            {task.description}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Chip label={task.status} size="small" color={getStatusColor(task.status) as any} variant="outlined" sx={{ textTransform: 'capitalize' }}/>
                        <Chip label={task.priority} size="small" color={getPriorityColor(task.priority) as any} sx={{ textTransform: 'capitalize' }} />
                        {task.dueDate && (
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', ml: 'auto', color: 'text.secondary' }}>
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <ConfirmDialog 
                open={confirmOpen} 
                onClose={() => setConfirmOpen(false)} 
                onConfirm={handleDelete}
                title="Delete Task"
                content="Are you sure you want to delete this task? This action cannot be undone."
                type="danger"
            />
        </>
    );
};
export default TaskItem;
