import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";

export default function Welcome() {
  const nextStep = useFormStore((state) => state.nextStep);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease:"easeInOut"}}
      className="flex flex-col items-center text-center space-y-6 py-12"
    >

      <h1 className="text-4xl font-bold text-brand-maroon">
        Welcome
      </h1>
      <p className="text-lg text-gray-600 max-w-lg">
        Let’s build your website the right way. This takes just a few minutes.
      </p>
      <button
        onClick={nextStep}
        className="mt-8 px-8 py-3 w-48 bg-brand-maroon text-white font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        Get Started
      </button>
    </motion.div>
  );
}
