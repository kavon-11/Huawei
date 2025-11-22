import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../Store";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else if (!hasFetchedProfile.current) {
      // Fetch latest profile data only once
      hasFetchedProfile.current = true;
      dispatch(getProfile());
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition"
            >
              Logout
            </button>
          </div>

          {user && (
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  User ID
                </label>
                <p className="text-lg text-white">{user.id || user.sub}</p>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <p className="text-lg text-white">{user.email}</p>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <p className="text-lg text-white">{user.firstName}</p>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <p className="text-lg text-white">{user.lastName}</p>
              </div>

              {user.iat && (
                <div className="border-b border-gray-700 pb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Token Issued At
                  </label>
                  <p className="text-lg text-white">
                    {new Date(user.iat * 1000).toLocaleString()}
                  </p>
                </div>
              )}

              {user.exp && (
                <div className="pb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Token Expires At
                  </label>
                  <p className="text-lg text-white">
                    {new Date(user.exp * 1000).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
