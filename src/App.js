import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import NewNotePage from "./pages/NewNotePage";
import EditNotePage from "./pages/EditNotePage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/notes",
      element: <NotesPage />,
    },
    {
      path: "/notes/edit/:id",
      element: <EditNotePage />,
    },
    {
      path: "/notes/add",
      element: <NewNotePage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
