import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import small from "../../assets/img/small.svg";
import large from "../../assets/img/large.svg";
import logo from "../../assets/img/icons/logo.png";
import { ChevronRightCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import { signInUser } from "../../firebase/auth"; // Import Firebase auth function

function SignIn() {
  // State for form fields and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError("");
    setLoading(true);

    // Attempt to sign in with Firebase
    const { user, error } = await signInUser(email, password);

    // Handle errors
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Successful login - navigate to dashboard
    setLoading(false);
    navigate("/events"); // Navigate to the events page
  };

  return (
      <div className="flex h-screen bg-[url(./assets/img/pink-gradient.png)] bg-cover font-['Poppins'] text-white overflow-hidden">
        {/* Left Section - Image & Text */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[40%] flex flex-col"
        >
          <h2 className="absolute flex gap-3 mt-5 font-['Extra'] ms-3">
            <img src={logo} className="size-12 -mt-3" alt="" /> LBC ADMIN PAGE
          </h2>
          <img src={small} className="h-[22rem] -ms-6" alt="" />
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="hero ms-12 w-max -mt-8"
          >
            <p className="text-6xl leading-[6rem]">
              Whatever happens <br /> here,{" "}
              <span className="font-['Extra']">stays </span>here
            </p>
            <p className="text-lg mt-2">Please fill the form on the right side</p>
          </motion.div>
        </motion.div>

        {/* Right Section - Large Image & Form */}
        <div className="relative w-[60%] flex items-center justify-center">
          <motion.img
              src={large}
              className="w-full h-auto"
              alt=""
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Animated Form */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="absolute ms-[22rem] bg-white/20 backdrop-blur-md p-8 rounded-2xl w-[60%] h-[32rem] border-2 border-white max-w-md shadow-lg"
          >
            <h2 className="text-3xl font-['Extra'] text-white">Login</h2>

            {/* Display error message if any */}
            {error && (
                <div className="bg-red-500/40 backdrop-blur-sm text-white p-2 rounded-md mt-2 text-sm">
                  {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
              <label htmlFor="email" className="text-xs">
                Your Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="p-3 rounded-md bg-white/30 placeholder-white text-white outline-none"
                  required
              />
              <label htmlFor="password" className="text-xs">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-3 rounded-md bg-white/30 placeholder-white text-white outline-none"
                  required
              />
              <a href="" className="text-xs ms-auto">
                Forgot your password?
              </a>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="bg-[#dc389d] hover:bg-[#370036] mt-8 p-3 flex gap-5 place-content-center rounded-md text-white font-semibold"
              >
                {loading ? "Signing In..." : "Let's Go"} <ChevronRightCircle />
              </motion.button>
            </form>
          </motion.div>
        </div>
        <Outlet />
      </div>
  );
}

export default SignIn;