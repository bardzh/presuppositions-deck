"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Deck() {
  return (
    <div className="relative flex flex-col justify-center flex-1 gap-20 p-8 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
        className="mt-4 text-4xl font-semibold leading-normal text-center text-blue-800"
      >
        Now pick up five positions that you think can help you solve your
        problem. <br />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-between mt-4 text-lg font-medium text-gray-600"
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <span>Swipe left to discard</span>
        </div>
        <div className="flex items-center gap-3 text-right">
          <span>Swipe right to pick</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed inset-x-0 w-full text-center bottom-16"
        >
          <Link
            className="px-20 py-5 text-xl font-semibold text-white bg-orange-500 rounded-full"
            href="/deck"
          >
            Got it!
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
