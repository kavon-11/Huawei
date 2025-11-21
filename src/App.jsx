import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
      errorElement: <Error />,
    },
  ],
  {
    errorElement: <Error />,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
