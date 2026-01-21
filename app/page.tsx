"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: EASE.out }}
          className="mb-16 relative w-36 h-16"
        >
          {/* Light Mode Logo */}
          <div className="dark:hidden block relative w-full h-full">
            <Image
              src="/logo-black.png"
              alt="Memørtium Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Dark Mode Logo */}
          <div className="hidden dark:block relative w-full h-full">
            <Image
              src="/logo-white.png"
              alt="Memørtium Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: EASE.out }}
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-3 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                  Enter
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute bottom-12"
      >
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400/30 dark:text-white/10">
          Powered by COSMO Orchestrator
        </p>
      </motion.div>
    </main>
  );
}
