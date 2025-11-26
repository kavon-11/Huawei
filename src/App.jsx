import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";
import MainOnboarding from "./pages/Onboarding/mainOnBoarding";
import OverView from "./pages/Dashboard/OverView";
import AIConf from "./pages/Dashboard/AI-Conf";
import KnowledgeBase from "./pages/Dashboard/KnowledgeBase";
import CallHistory from "./pages/Dashboard/CallHistory";
import Analytics from "./pages/Dashboard/Analytics";
import Settings from "./pages/Dashboard/Settings";
import LiveCalls from "./pages/Dashboard/LiveCalls";
// import { checkAuthLoader } from "./util/AuthCheckerLoader";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      // loader : checkAuthLoader, // lw el user msh logged in yro7 l page el auth
      children: [
        {
          path: "onBoarding",
          element: <MainOnboarding />,
          // loader : checkAuthLoader
        },
        {
          path: "dashboard",
          // loader : checkAuthLoader
          children: [
            {
              index: true,
              element: <OverView />,
            },
            {
              path: "ai-config",
              element: <AIConf />,
            },
            {
              path: "knowledge",
              element: <KnowledgeBase />,
            },
            {
              path: "history",
              element: <CallHistory />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "live-calls",
              element: <LiveCalls />,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      errorElement: <Error />,
    },
    {
      path: "/settings",
      element: <Settings />,
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
