"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaPhone } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { StyleThirteen } from "@/components/custom-ui/CustomTitle";
import Link from "next/link";
import axios from "axios";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setSubmitStatus(null);
    try {
      setIsSubmitting(true);
      axios.post("/api/contact", data).then((res) => {
        if (res.status === 200) {
          setSubmitStatus("success");
        } else {
          setSubmitStatus("error");
        }
      }).catch((error) => {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      }).finally(() => {
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto rounded-lg shadow-xl container p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StyleThirteen
        title="Get in Touch"
        className="text-accent !p-2 !px-4 mb-8"
      />
      <div className="flex flex-col md:flex-row gap-12">
        <motion.div className="md:w-1/3 space-y-8" variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-accent mb-6">
            Contact Information
          </h3>
          <motion.div
            className="flex items-center space-x-4 text-white hover:text-accent transition-colors duration-300 origin-left"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="w-6 h-6" />
            <Link href={`mailto:saikatroydot@gmail.com`}>
              saikatroydot@gmail.com
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-4 text-white hover:text-accent transition-colors duration-300 origin-left"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-6 h-6" />
            <Link href={"https://github.com/sculptorofcode"} target="_blank">
              github.com/sculptorofcode
            </Link>
          </motion.div>
        </motion.div>
        <motion.div className="md:w-2/3" variants={itemVariants}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  id="name"
                  className="block w-full rounded-md border-primary shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 transition-all duration-300 h-[42px] text-primary ps-3"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className="block w-full rounded-md border-primary shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 transition-all duration-300 h-[42px] text-primary ps-3"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-white mb-2"
              >
                Subject
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register("subject", { required: "Subject is required" })}
                type="text"
                id="subject"
                className="block w-full rounded-md border-primary shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 transition-all duration-300 h-[42px] text-primary ps-3"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-2"
              >
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                {...register("message", { required: "Message is required" })}
                id="message"
                rows={4}
                className="block w-full rounded-md border-primary shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 transition-all duration-300 text-primary ps-3 pt-1"
              ></motion.textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <span>Submit</span>
                  <IoIosSend className="ml-2 w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-4 p-4 ${
                submitStatus === "success"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } border rounded`}
            >
              {submitStatus === "success"
                ? "Thank you for your message. We'll get back to you soon!"
                : "An error occurred. Please try again later."}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
