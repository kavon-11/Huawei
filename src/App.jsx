import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth  from "./pages/Login";
import Error from "./pages/Error";

const router = createBrowserRouter(
  [
    {
      path: "/auth",
      element: <Auth />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <Navigate to="/auth" replace />,
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
