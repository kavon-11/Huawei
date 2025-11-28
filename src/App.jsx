import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Auth from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Home from "./pages/Home"; // Import Home

import MainOnboarding from "./pages/Onboarding/mainOnBoarding";

import OverView from "./pages/Dashboard/OverView";
import AIConf from "./pages/Dashboard/AI-Conf";
import KnowledgeBase from "./pages/Dashboard/KnowledgeBase";
import CallHistory from "./pages/Dashboard/CallHistory";
import Analytics from "./pages/Dashboard/Analytics";
import Settings from "./pages/Dashboard/Settings";
import LiveCalls from "./pages/Dashboard/LiveCalls";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "onBoarding",
        element: <MainOnboarding />,
      },
      {
        path: "dashboard",
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
          {
            path: "*",
            element: <Error />,
          },
        ],
      },
      // also root children
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "Home",
    element: <Home />,
  },

  // fallback
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
