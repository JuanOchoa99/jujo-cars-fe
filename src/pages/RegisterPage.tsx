import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { register, confirmSignUp, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'register' | 'confirm' | 'success'>('register');
  const [confirmCode, setConfirmCode] = useState('');

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      setStep('confirm');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al registrarse';
      if (msg.includes('UsernameExistsException')) {
        setError('Ya existe una cuenta con este email.');
      } else if (msg.includes('InvalidPasswordException')) {
        setError(
          'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números.'
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await confirmSignUp(email, confirmCode);
      setStep('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al confirmar';
      if (msg.includes('CodeMismatchException')) {
        setError('Código incorrecto. Revisa tu email.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-dark-800/90 backdrop-blur-xl border border-dark-600/50 rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-2 text-center">
            Confirmar email
          </h2>
          <p className="text-dark-300 text-sm mb-6 text-center">
            Ingresa el código de 6 dígitos que enviamos a {email}
          </p>
          <form onSubmit={handleConfirm} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}
            <input
              type="text"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-accent-500 outline-none"
              placeholder="000000"
              maxLength={6}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-medium rounded-xl"
            >
              {loading ? 'Confirmando...' : 'Confirmar'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-dark-800/90 backdrop-blur-xl border border-dark-600/50 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Car size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            ¡Cuenta creada!
          </h2>
          <p className="text-dark-300 mb-6">
            Revisa tu email para confirmar tu cuenta. Luego podrás iniciar sesión.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-all"
          >
            Ir a iniciar sesión
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-600)_0%,_transparent_50%)] opacity-15" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-dark-800/90 backdrop-blur-xl border border-dark-600/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Car size={32} className="text-accent-400" />
            <span className="text-2xl font-bold text-white">Jujo Cars</span>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2 text-center">
            Crear cuenta
          </h1>
          <p className="text-dark-300 text-sm mb-6 text-center">
            Regístrate para gestionar tu catálogo de autos
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Nombre (opcional)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                Contraseña (mín. 8 caracteres, mayúsculas, minúsculas y números)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </form>

          <p className="mt-6 text-center text-dark-300 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-accent-400 hover:text-accent-300 font-medium"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
