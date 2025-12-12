import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Container, Fab, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SortBy, TaskStatus } from "../../../store";
import { closeForm, openForm, setFilterStatus, setSearchQuery, setSortBy, useAppDispatch, useAppSelector } from "../../../store";
import Dropdown from "../../../components/Dropdown";
import Paginations from "../../../components/Pagination";
import SearchBar from "../../../components/SearchBar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import useGetTasks from "../hooks/useGetTasks";

const ITEMS_PER_PAGE = 5;

const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
];

const sortOptions = [
    { label: "Newest First", value: "createdAt" },
    { label: "Title", value: "title" },
    { label: "Due Date", value: "dueDate" },
    { label: "Priority", value: "priority" },
];

const TasksPage = () => {
    const dispatch = useAppDispatch();
    const { isFormOpen, selectedTask, searchQuery, filterStatus, sortBy } = useAppSelector((state) => state.tasks);
    const { data: tasks, isLoading, error } = useGetTasks();
    
    const [page, setPage] = useState(1);

    const handleCreate = () => {
        dispatch(openForm(undefined));
    };

    const handleEdit = (task: Parameters<typeof openForm>[0]) => {
        dispatch(openForm(task));
    };

    const handleClose = () => {
        dispatch(closeForm());
    };

    const handleSearch = (value: string) => {
        dispatch(setSearchQuery(value));
        setPage(1);
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        dispatch(setFilterStatus(event.target.value as TaskStatus));
        setPage(1);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        dispatch(setSortBy(event.target.value as SortBy));
    };

    const handlePageChange = (_key: string, value: string) => {
        setPage(Number(value));
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

    const totalItems = filteredTasks.length;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

            <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <SearchBar 
                    onSearch={handleSearch} 
                    placeholder="Search tasks..." 
                    defaultValue={searchQuery}
                />

                <Dropdown
                    value={filterStatus}
                    onChange={handleFilterChange}
                    options={statusOptions}
                    label="Status"
                    width={150}
                />

                <Dropdown
                    value={sortBy}
                    onChange={handleSortChange}
                    options={sortOptions}
                    label="Sort By"
                    width={150}
                />
            </Stack>

            <Grid container spacing={2}>
                {paginatedTasks.map((task) => (
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

            {totalItems > ITEMS_PER_PAGE && (
                <Paginations 
                    itemCount={totalItems} 
                    limit={ITEMS_PER_PAGE} 
                    onChangePage={handlePageChange} 
                />
            )}

            <TaskForm open={isFormOpen} onClose={handleClose} taskToEdit={selectedTask ?? undefined} />
        </Container>
    );
};

export default TasksPage;
