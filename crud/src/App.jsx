import TodoList from "./Components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/todoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
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
  return (
    <ThemeProvider theme={theme}>
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
      <TodosContext.Provider value={{ todos, setTodos }}>
      <TodoList />
      </TodosContext.Provider>
    </div>
    </ThemeProvider>
  );
}
export default App;
