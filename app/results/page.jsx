"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
export default function Deck() {
  const [step, setStep] = useState(0);

  return (
    <div className="relative flex flex-col justify-center flex-1 gap-20 p-8 py-10">
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 1, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-4xl font-semibold leading-normal text-center text-blue-800"
        >
          Now that you know these presuppositions, what can you do now?
        </motion.div>
      )}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 1, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-4xl font-semibold leading-normal text-center text-blue-800"
        >
          From now on, how are you going to act differently?
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 1, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-4xl font-semibold leading-normal text-center text-blue-800"
        >
          How can you ensure that you will follow through? What’s your promise?
          How do you want to keep yourself committed?
        </motion.div>
      )}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="fixed inset-x-0 flex items-center mx-auto text-4xl font-semibold text-center top-10"
        >
          <Image
            src="/logo.jpeg"
            className="mx-auto"
            alt="NLP"
            width={200}
            height={100}
          />
        </motion.div>
      )}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="mt-4 text-4xl font-semibold leading-normal text-center text-blue-800"
        >
          <Link
            href="/"
            className="px-20 py-5 text-xl font-semibold text-white bg-orange-500 rounded-full"
            onClick={() => setStep(step + 1)}
          >
            Practice Again
          </Link>
        </motion.div>
      )}

      {step < 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="fixed inset-x-0 w-full text-center bottom-16"
        >
          <button
            className="px-20 py-5 text-xl font-semibold text-white bg-orange-500 rounded-full"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
}
