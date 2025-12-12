import { type SubmitHandler } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Form } from "../../../components/Form";
import FormInputField from "../../../components/FormInputField";
import FormDropdown from "../../../components/FormDropdown";
import { createTaskSchema, updateTaskSchema, type CreateTaskInput, type Task } from "../../../schemas/task.schema";
import useCreateTask from "../hooks/useCreateTask";
import useUpdateTask from "../hooks/useUpdateTask";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

interface TaskFormContentProps {
  taskToEdit?: Task;
  onCancel: () => void;
  isPending: boolean;
}

const TaskFormContent = ({ taskToEdit, onCancel, isPending }: TaskFormContentProps) => { // Updated to include isPending
    return (
        <>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: { xs: '100%', sm: 400 }, mt: 1 }}>
                    <FormInputField name="title" label="Title" type="text" fullWidth />
                    <FormInputField name="description" label="Description" type="text" multiline rows={3} fullWidth />
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormDropdown name="status" label="Status" options={statusOptions} width="50%" />
                        <FormDropdown name="priority" label="Priority" options={priorityOptions} width="50%" />
                    </Box>

                    {/* Simple date input for now, keeping it simple as requested */}
                    <FormInputField name="dueDate" label="Due Date" type="date" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit" disabled={isPending}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" disabled={isPending}>
                    {taskToEdit ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </>
    )
}

const TaskForm = ({ open, onClose, taskToEdit }: TaskFormProps) => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const isPending = isCreating || isUpdating;

  const onSubmit: SubmitHandler<CreateTaskInput> = (data) => {
    // Clean up empty due date
    if (data.dueDate === "") {
        delete data.dueDate;
    }
    // If date is provided string, ensure ISO format if schema requires it,
    // but schema uses z.iso.datetime(). The date input returns YYYY-MM-DD.
    // We might need to append time or convert.
    // Let's modify the data before sending or let the server handle it?
    // Schema expects ISO datetime string.
    // Schema expects ISO datetime string.
    if (data.dueDate && typeof data.dueDate === 'string' && !data.dueDate.includes('T')) {
        const date = new Date(data.dueDate);
        if(!isNaN(date.getTime())) {
             data.dueDate = date.toISOString();
        } else {
            // Should catch this, but for now just delete if invalid to avoid crash
            delete data.dueDate;
        }
    }

    if (taskToEdit) {
      updateTask({ id: taskToEdit._id, data });
    } else {
      createTask(data);
    }
    onClose();
  };

  const defaultValues = taskToEdit ? {
      title: taskToEdit.title,
      description: taskToEdit.description,
      status: taskToEdit.status,
      priority: taskToEdit.priority,
      dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : undefined
  } : {
      status: 'pending' as const,
      priority: 'medium' as const
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{taskToEdit ? "Edit Task" : "New Task"}</DialogTitle>
      <Form 
        onSubmit={onSubmit} 
        schema={taskToEdit ? updateTaskSchema : createTaskSchema}
        defaultValues={defaultValues}
      >
        <TaskFormContent taskToEdit={taskToEdit} onCancel={onClose} isPending={isPending} />
      </Form>
    </Dialog>
  );
};

export default TaskForm;
