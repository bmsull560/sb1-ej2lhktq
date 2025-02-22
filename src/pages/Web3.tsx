import { motion } from 'framer-motion';

export function Web3() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8"
      >
        Web3 Privacy & Monetization
      </motion.h1>
    </div>
  );
}