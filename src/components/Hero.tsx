import { motion } from 'framer-motion';
import { ChevronDown, Car } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[60vh] flex items-start justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-600)_0%,_transparent_50%)] opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-emerald-500)_0%,_transparent_50%)] opacity-10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 pt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-dark-800/80 border border-dark-600/50 text-sm text-dark-200 mb-8"
        >
          <Car size={18} className="text-accent-400" />
          Gestión de vehículos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
        >
          <span className="text-white block mb-2">Jujo</span>
          <span className="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent block">
            Cars
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-dark-200 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Administra tu catálogo de autos con operaciones CRUD completas.
          Crea, edita y elimina vehículos de forma sencilla.
        </motion.p>

        <motion.a
          href="#autos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/25"
        >
          Ver catálogo
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <a href="#autos" className="text-dark-400 hover:text-white transition-colors">
          <ChevronDown size={30} />
        </a>
      </motion.div>
    </section>
  );
}
