import { useRouteError, Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientText from "../components/GradientText";

export default function Error() {
  const error = useRouteError();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 font-manrope"
      style={{ backgroundColor: "#060606" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">⚠️</div>
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          <GradientText>Oops!</GradientText>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Something went wrong
        </h2>

        {/* Error Message */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-8">
          <p className="text-white/70 text-lg">
            {error?.statusText ||
              error?.message ||
              "An unexpected error occurred"}
          </p>
          {error?.status && (
            <p className="text-white/50 text-sm mt-2">
              Error Code: {error.status}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              className="px-8 py-3 rounded-full text-white font-bold text-sm transition-all border-2"
              style={{ borderColor: "#A93E17" }}
              whileHover={{ scale: 1.05, backgroundColor: "#A93E17" }}
              whileTap={{ scale: 0.95 }}
            >
              Go Home
            </motion.button>
          </Link>

          <Link to="/dashboard">
            <motion.button
              className="px-8 py-3 rounded-full text-white font-bold text-sm transition-all"
              style={{
                background: "linear-gradient(90deg, #A93E17 0%, #15399A 100%)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard
            </motion.button>
          </Link>
        </div>

        {/* Additional Help */}
        <p className="text-white/60 text-sm mt-8">
          Need help?{" "}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-400 transition"
          >
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
