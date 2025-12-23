import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Auth from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Home from "./pages/Home";

import OverView from "./pages/Dashboard/OverView";
import AIConf from "./pages/Dashboard/AI-Conf";
import KnowledgeBase from "./pages/Dashboard/KnowledgeBase";
import CallHistory from "./pages/Dashboard/CallHistory";
import Analytics from "./pages/Dashboard/Analytics";
import Settings from "./pages/Dashboard/Settings";
import LiveCalls from "./pages/Dashboard/LiveCalls";
import MainOnboarding from "./pages/Onboarding/MainOnBoarding";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <Error />,
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
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },

  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "onBoarding",
    element: <MainOnboarding />,
  },

  // fallback
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
