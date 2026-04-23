import { motion } from"framer-motion";
import { CheckCircle, Calendar } from"lucide-react";
import { useEffect, useState } from"react";
import { useFormStore } from"@/store/useFormStore";

export function Success() {
  const [showConfetti, setShowConfetti] = useState(false);
  const resetForm = useFormStore((state) => state.resetForm);

  useEffect(() => {
    // Trigger the confetti animation shortly after mount
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease:"easeOut"}}
      className="text-center py-10 relative"
    >
      {/* CSS Confetti Effect Container */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-4 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: ['#4A151B', '#F9F9F9', '#2D2D2D', '#D4AF37', '#800000'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type:"spring", stiffness: 200, delay: 0.2 }}
        className="w-24 h-24 bg-brand-maroon/10 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-12 h-12 text-brand-maroon"/>
      </motion.div>

      <h2 className="text-4xl font-black text-brand-maroon  mb-4">
        Thank you! We will reach out within 24 hours.
      </h2>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">

        <button
          onClick={resetForm}
          className="text-sm text-gray-500 hover:text-brand-maroon   transition-colors underline-offset-4 hover:underline mt-2"
        >
          Start New Test
        </button>
      </div>

      {/* Embedded CSS for Confetti Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}} />
    </motion.div>
  );
}
