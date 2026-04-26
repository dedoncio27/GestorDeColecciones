import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '../context/CollectionsContext';
import { useForm } from '../hooks/useForm';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  X, Book, Coins, Gamepad2, Folder,
  Music, Film, Camera, Heart, Star,
  Watch, Coffee, PenTool, Globe, Save, ChevronDown
} from 'lucide-react';

const ICON_LIST = [
  { name: 'Book', label: 'Libro', Icon: Book },
  { name: 'Coins', label: 'Monedas', Icon: Coins },
  { name: 'Gamepad2', label: 'Videojuegos', Icon: Gamepad2 },
  { name: 'Folder', label: 'Carpeta', Icon: Folder },
  { name: 'Music', label: 'Música', Icon: Music },
  { name: 'Film', label: 'Cine', Icon: Film },
  { name: 'Camera', label: 'Fotografía', Icon: Camera },
  { name: 'Heart', label: 'Favoritos', Icon: Heart },
  { name: 'Star', label: 'Especial', Icon: Star },
  { name: 'Watch', label: 'Relojes', Icon: Watch },
  { name: 'Coffee', label: 'Café', Icon: Coffee },
  { name: 'PenTool', label: 'Arte', Icon: PenTool },
  { name: 'Globe', label: 'Viajes', Icon: Globe },
];

const CATEGORIES = [
  'Libros', 'Monedas', 'Videojuegos', 'Películas',
  'Música', 'Arte', 'Sellos', 'Relojes', 'Cartas', 'Otro'
];

export default function CreateCollection() {
  const navigate = useNavigate();
  const { addCollection } = useCollections();
  const [showIconPicker, setShowIconPicker] = useState(false);

  const { values, handleChange, handleCustomChange, handleSubmit, loading } = useForm({
    initialValues: {
      name: '',
      description: '',
      category: CATEGORIES[0],
      customCategory: '',
      icon: 'Folder'
    },
    onSubmit: async (v) => {
      await addCollection(v.name, v.icon, v.description);
      navigate('/');
    }
  });

  const SelectedIconComponent = ICON_LIST.find(i => i.name === values.icon)?.Icon || Folder;

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center p-6 sm:p-10 font-['Segoe_UI',sans-serif]">
      {/* Contenedor principal: Ancho fijo al 60% y altura generosa */}
      <div className="w-[60%] min-w-[320px] flex flex-col relative animate-in fade-in zoom-in-95 duration-500">

        {/* Tarjeta central: padding vertical aumentado para ser más alta */}
        <div className="bg-white w-full rounded-[60px] shadow-2xl shadow-blue-900/10 flex flex-col overflow-hidden relative">

          {/* Botón de cerrar DENTRO de la tarjeta en la esquina superior derecha */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-8 right-8 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/30 transition-all hover:scale-110 active:scale-90 z-[50]"
            type="button"
          >
            <X size={28} strokeWidth={3} />
          </button>

          {/* Contenido con padding vertical extra para que sea más alto */}
          <div className="flex flex-col py-24 px-12 sm:px-24">

            <div className="text-center mb-16 flex-shrink-0">
              <h1 className="text-6xl font-black text-[#1a1a2e] mb-4 tracking-tighter leading-tight">Nueva Colección</h1>
              <p className="text-gray-400 font-medium text-xl leading-relaxed">Crea un nuevo espacio para tus mejores piezas</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl mx-auto space-y-16">

              <Input
                label="Nombre de la colección"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Ej. Mi Biblioteca"
                required
              />

              <Input
                label="Descripción detallada"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="¿Qué hace especial a esta colección?"
                type="textarea"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full">
                <div className="space-y-6">
                  <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[5px] text-center">Categoría</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      className="w-full px-8 py-6 bg-gray-50 border-2 border-transparent focus:border-[#3f5efb] focus:bg-white rounded-[30px] outline-none transition-all font-bold text-xl shadow-sm appearance-none cursor-pointer text-center"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={24} />
                  </div>
                  {values.category === 'Otro' && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <input
                        type="text"
                        name="customCategory"
                        value={values.customCategory}
                        onChange={handleChange}
                        placeholder="Escribe el tipo aquí..."
                        className="w-full px-6 py-4 bg-white border-2 border-[#3f5efb] rounded-[20px] outline-none font-bold text-center text-lg shadow-lg shadow-blue-500/10"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-6 relative">
                  <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[5px] text-center">Icono</label>
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className={`w-full flex items-center justify-center gap-4 px-8 py-6 bg-gray-50 border-2 transition-all rounded-[30px] shadow-sm hover:bg-white ${showIconPicker ? 'border-[#3f5efb] bg-white' : 'border-transparent'}`}
                  >
                    <div className="text-[#3f5efb]">
                      <SelectedIconComponent size={36} />
                    </div>
                    <ChevronDown className={`text-gray-400 transition-transform duration-300 ${showIconPicker ? 'rotate-180' : ''}`} size={24} />
                  </button>

                  {showIconPicker && (
                    <div className="absolute bottom-full left-0 w-full mb-4 bg-white border border-gray-100 rounded-[35px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] p-8 z-[200] grid grid-cols-4 gap-4 animate-in zoom-in-95 duration-200">
                      {ICON_LIST.map(({ name, Icon }) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            handleCustomChange('icon', name);
                            setShowIconPicker(false);
                          }}
                          className={`p-5 rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${values.icon === name ? 'bg-[#3f5efb] text-white shadow-lg shadow-blue-500/40' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                          <Icon size={28} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-center pt-10">
                <Button type="submit" className="px-24 py-8 text-3xl">
                  <Save size={36} />
                  {loading ? 'Guardando...' : 'Crear Colección'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
