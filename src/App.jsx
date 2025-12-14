import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import Auth from "./pages/Login";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Home from "./pages/Home";

import MainOnboarding from "./pages/Onboarding/mainOnBoarding";

import OverView from "./pages/Dashboard/OverView";
import AIConf from "./pages/Dashboard/AI-Conf";
import KnowledgeBase from "./pages/Dashboard/KnowledgeBase";
import CallHistory from "./pages/Dashboard/CallHistory";
import Analytics from "./pages/Dashboard/Analytics";
import Settings from "./pages/Dashboard/Settings";
import LiveCalls from "./pages/Dashboard/LiveCalls";

const queryClient = new QueryClient(); // Create a client

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
    index: true,
    element: <Home />,
  },
  {
    path: "settings",
    element: <Settings />,
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
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis globally
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wrapper: window,
      content: document.documentElement,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
