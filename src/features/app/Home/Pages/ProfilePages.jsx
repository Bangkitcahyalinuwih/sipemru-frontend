import { motion } from "framer-motion";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import { Profile } from "../components/profile";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -30,
  },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const AnimatedProfile = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
        px-4
        py-8
      "
    >
      <div className="max-w-6xl mx-auto">
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => navigate(-1)}
          className="
            mb-6
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            text-white
            hover:bg-white/10
            transition-all
            shadow-lg
          "
        >
          <ArrowLeft className="w-5 h-5" />

          <span className="font-medium">
            Kembali
          </span>
        </motion.button>

        <Profile />
      </div>
    </motion.div>
  );
};

const ProfilePages = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AnimatedProfile />}
      />
    </Routes>
  );
};

export default ProfilePages;