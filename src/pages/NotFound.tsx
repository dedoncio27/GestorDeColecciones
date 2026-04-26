import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#f0f2f5] flex items-center justify-center p-6 font-['Segoe_UI',sans-serif]">
      <div className="text-center max-w-md">
        <div className="inline-block p-10 bg-red-50 text-red-500 rounded-[50px] mb-8 shadow-xl shadow-red-500/10 animate-bounce">
          <AlertCircle size={80} />
        </div>
        <h1 className="text-8xl font-black text-[#1a1a2e] mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Bloque No Encontrado!</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          Parece que te has perdido buscando en tus tesoros. Esta colección o página no existe todavía.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#1a1a2e] hover:bg-[#3f5efb] text-white px-10 py-5 rounded-full font-black text-lg shadow-2xl shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
        >
          <Home size={24} />
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
