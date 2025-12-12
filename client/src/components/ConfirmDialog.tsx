import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AppButton from "./AppButton";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: "danger" | "info" | "warning";
}

const ConfirmDialog = ({ open, onClose, onConfirm, title, content, confirmText = "Confirm", cancelText = "Cancel", isLoading = false, type = "primary" as any }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <AppButton onClick={onClose} color="inherit" disabled={isLoading}>
          {cancelText}
        </AppButton>
        <AppButton onClick={onConfirm} variant="contained" color={type === "danger" ? "error" : "primary"} isLoading={isLoading}>
          {confirmText}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
