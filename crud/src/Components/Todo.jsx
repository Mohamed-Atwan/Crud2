import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditSquareIcon from "@mui/icons-material/EditSquare";

import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/todoContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ToastContext } from "../Contexts/ToastContext";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التعديل بنجاح");
  }
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم الحذف بنجاح");
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.title = updatedTodo.title;
        t.details = updatedTodo.details;
      }
      return t;
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التحديث بنجاح");
  }

  return (
    <>
      {/* delete dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف هذه المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن هذا
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* update dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمه "
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد التعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="TodoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "rgb(15, 28, 54)",
          color: "white",
          marginTop: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="delete"
                onClick={() => {
                  handleCheckClick();
                }}
                sx={{
                  color: todo.isCompleted ? "white" : "#0dac22ff",
                  backgroundColor: todo.isCompleted ? "#0dac22ff" : "white",
                  border: "solid 3px #0dac22ff",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#150998ff",
                  backgroundColor: "white",
                  border: "solid 3px #150998ff",
                }}
              >
                <EditSquareIcon />
              </IconButton>
              {/* Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#d70000e7",
                  backgroundColor: "white",
                  border: "solid 3px #d70000e7",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
