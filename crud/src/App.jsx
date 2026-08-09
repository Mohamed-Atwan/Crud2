import TodoList from "./Components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MySnackBar from "./Components/MySnackBar";
import React from "react";
import { ToastContext } from "./Contexts/ToastContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءه الكتاب",
    details: "تخهثبتيهاىفقهابرىخهق",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه الكتاب",
    details: "تخهثبتيهاىفقهابرىخهق",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه الكتاب",
    details: "تخهثبتيهاىفقهابرىخهق",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showHideToast }}>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#191b1f",
            direction: "rtl",
          }}
        >
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}
export default App;
