"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      if (!agreeTerms) {
        setError("You must agree to the terms and conditions");
        setIsSubmitting(false);
        return;
      }

      if (!email || !password || !name) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      setError(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const responseData = await response.json();

      if (response.status === 201 || response.status === 200) {
        setError(null);
        window.location.href = "/login";
      } else {
        setError(responseData.message);
      }
    } catch (error) {
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
            Register
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl text-accent mb-6 text-center"
          >
            Create an account
          </motion.h2>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md mb-4"
            >
              {error}
            </motion.div>
          )}
          <AnimatePresence>
            <motion.form
              key="register"
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
                transition={{ delay: 0.2, duration: 0.5 }}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
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
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mr-2"
                />
                <label>
                  I agree to the{" "}
                  <Link href="/terms" className="text-accent">
                    terms and conditions
                  </Link>
                </label>
              </motion.div>
              <Button
                className="bg-accent hover:bg-primary w-full py-2 px-2 rounded-md text-white font-bold transition-colors duration-500 flex items-center justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : null}
                Register
              </Button>
            </motion.form>
          </AnimatePresence>
          <div className="mt-6 text-center">
            <p>
              Already have an account? &nbsp;
              <Link className="text-accent hover:underline" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
