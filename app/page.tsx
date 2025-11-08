"use client";

import { useAppStore } from "@/lib/store";
import Page1Input from "@/components/Page1Input";
import Page2Fortune from "@/components/Page2Fortune";
import Page3Chat from "@/components/Page3Chat";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const currentPage = useAppStore((state) => state.currentPage);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <div className="h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="h-full"
          >
            <Page1Input />
          </motion.div>
        )}
        {currentPage === 2 && (
          <motion.div
            key="page2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="h-full"
          >
            <Page2Fortune />
          </motion.div>
        )}
        {currentPage === 3 && (
          <motion.div
            key="page3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="h-full"
          >
            <Page3Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

