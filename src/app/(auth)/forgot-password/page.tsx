"use client";

import { Button } from "@/components/ui/button";
import toastMsg from "@/utils/toaster";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        if(!email){
            setError("Please fill in all fields");
            setIsSubmitting(false);
            return;
        }
        setError(null);
        if(email){
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                setError(null);
                toastMsg("success", responseData.message);
                setTimeout(() => {
                  route.push("/login");
                }, 1000);
            } else {
                setError(responseData.message);
            }
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
      className="login_form_container w-screen sm:w-full md:w-[40%] lg:w-[30%] bg-white shadow-lg"
    >
      <div className="p-4 md:p-12 w-full">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block text-2xl md:text-3xl font-bold text-primary"
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
            className="text-3xl mb-5 text-center font-bold"
          >
            Forgot Password ?
          </motion.h1>
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
              <Button
                className="bg-accent hover:bg-primary w-full py-2 px-2 rounded-md text-white font-bold transition-colors duration-500 flex items-center justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : null}
                Submit
              </Button>
            </motion.form>
          </AnimatePresence>
          <div className="mt-6 flex justify-between">
            <p className="text-nowrap">
              Already have an account?{" "}
              <Link className="text-accent hover:underline" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
