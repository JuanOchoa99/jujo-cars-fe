import { Car } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-800 py-10">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-dark-400 text-sm">
          <Car size={18} className="text-accent-400" />
          <span className="text-dark-200">&copy; {year} Jujo Cars</span>
        </div>
      </div>
    </footer>
  );
}
