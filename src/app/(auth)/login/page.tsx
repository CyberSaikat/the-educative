"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      setError(null);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/educative/dashboard",
          redirect: true,
        });
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="login_form_container sm:w-full md:w-[40%] lg:w-[30%] bg-white shadow-lg"
    >
      <div className="p-4 md:p-12 w-full">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block text-2xl md:text-3xl font-bold"
          >
            <span>
              The Educative<span className="text-accent">.</span>
            </span>
          </Link>
        </div>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl mb-3 text-center font-bold"
          >
            {showRegister ? "Register" : "Login"}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl text-accent mb-6 text-center"
          >
            {showRegister ? "Create an account" : "Sign in to continue"}
          </motion.h2>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md mb-4"
            >
              {error}
            </motion.div>
          )}
          <AnimatePresence>
            <motion.form
              key={showRegister ? "register" : "login"}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <Button
                className="bg-accent hover:bg-primary w-full py-2 px-2 rounded-md text-white font-bold transition-colors duration-500 flex items-center justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : null}
                Login
              </Button>
            </motion.form>
          </AnimatePresence>
          <div className="mt-6 flex justify-between">
            <p>
              {showRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link className="text-accent hover:underline" href="/register">
                {showRegister ? "Login" : "Register"}
              </Link>
            </p>
            <p>
              <Link className="text-accent hover:underline" href="/forgot-password">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
