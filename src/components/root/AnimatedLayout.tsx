'use client'

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

export default function AnimatedLayout({ children }: { children: ReactNode }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-background text-foreground"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}