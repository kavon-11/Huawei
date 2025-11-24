import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth  from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";
import MainOnboarding from "./pages/Onboarding/mainOnBoarding";
// import { checkAuthLoader } from "./util/AuthCheckerLoader";

const router = createBrowserRouter(
  [ {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      // loader : checkAuthLoader, // lw el user msh logged in yro7 l page el auth
      children : [{
        path : "onBoarding",
        element: <MainOnboarding />
        // loader : checkAuthLoader
      }]
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
