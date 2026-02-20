import { motion, AnimatePresence } from 'framer-motion';

interface AlertProps {
  message: string;
  type: 'error' | 'success';
  onDismiss?: () => void;
}

export default function Alert({ message, type, onDismiss }: AlertProps) {
  const isError = type === 'error';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${
          isError
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}
      >
        <span>{message}</span>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-lg font-bold hover:opacity-80 transition-opacity"
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
