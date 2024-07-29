"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Start() {
  return (
    <div className="relative flex-1 p-8 py-10">
      <motion.h1
        initial={{ opacity: 0, scale: 1, x: 0 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-semibold text-green-700 text-nowrap"
      >
        Identify a problem
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-4 text-4xl font-semibold text-blue-800"
      >
        What is the problem? How is that a problem? How is it a problem to you?
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-16 right-8"
      >
        <Link
          className="px-20 py-5 text-xl font-semibold text-white bg-orange-500 rounded-full"
          href="/help"
        >
          Next
        </Link>
      </motion.div>
    </div>
  );
}
