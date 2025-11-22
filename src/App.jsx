import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
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
      element: (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome!</h1>
            <p className="text-gray-400 mb-8">
              Home page will be created later
            </p>
            <a
              href="/auth"
              className="px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              Go to Auth
            </a>
          </div>
        </div>
      ),
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
