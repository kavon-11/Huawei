import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth  from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";

// import { checkAuthLoader } from "./util/checkAuthLoader";

const router = createBrowserRouter(
  [ {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      // loader : checkAuthLoader, // lw el user msh logged in yro7 l page el auth
      //children
   }
    ,
    {
      path: "/auth",
      element: <Auth />,
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
