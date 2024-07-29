"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 gap-8 p-8 py-10">
      <div className="flex justify-center">
        <Image src="/logo.jpeg" alt="NLP" width={250} height={100} />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20 text-4xl font-semibold leading-relaxed text-center text-blue-800 "
      >
        The Presuppositions of NLP
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-16 right-8"
      >
        <Link
          className="px-20 py-5 text-xl font-semibold text-white bg-orange-500 rounded-full"
          href="/start"
        >
          Start
        </Link>
      </motion.div>
    </div>
  );
}
