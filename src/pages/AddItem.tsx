import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCollections } from '../context/CollectionsContext';
import { useForm } from '../hooks/useForm';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  X, Save, Star, Calendar, ImageIcon, 
  Upload, Camera, Sparkles, Trash2
} from 'lucide-react';

export default function AddItem() {
  const { id } = useParams(); // collectionId
  const navigate = useNavigate();
  const { addItem } = useCollections();
  const [fileLoading, setFileLoading] = useState(false);

  const { values, handleChange, handleCustomChange, handleSubmit, loading } = useForm({
    initialValues: {
      name: '',
      description: '',
      imageUrl: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    },
    onSubmit: async (v) => {
      if (id) {
        await addItem(id, v);
        navigate('/');
      }
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCustomChange('imageUrl', reader.result as string);
        setFileLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center p-6 sm:p-10 font-['Segoe_UI',sans-serif]">
      <div className="w-[65%] min-w-[320px] flex flex-col relative animate-in fade-in zoom-in-95 duration-500">
        
        <div className="bg-white w-full rounded-[60px] shadow-2xl shadow-blue-900/10 flex flex-col overflow-hidden relative border border-white">
          
          <button 
            onClick={() => navigate('/')}
            className="absolute top-8 right-8 w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 z-[50] cursor-pointer"
            type="button"
          >
            <X size={28} strokeWidth={3} />
          </button>

          <div className="flex flex-col py-20 px-12 sm:px-24">
            
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4 text-[#3f5efb]">
                <Sparkles size={32} />
                <span className="text-xs font-black uppercase tracking-[5px]">Nuevo Elemento</span>
              </div>
              <h1 className="text-6xl font-black text-[#1a1a2e] mb-3 tracking-tighter leading-tight">Añadir Pieza</h1>
              <p className="text-gray-400 font-medium text-xl leading-relaxed">Registra los detalles de tu nuevo objeto</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-3xl mx-auto space-y-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <div className="space-y-10">
                  <Input 
                    label="Nombre"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Ej. Primera edición 1954"
                    required
                  />

                  <Input 
                    label="Descripción / Notas"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Cuéntanos más sobre este objeto..."
                    type="textarea"
                  />
                  
                  <div className="space-y-4">
                    <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[5px] text-center">Valoración</label>
                    <div className="flex justify-center gap-4 bg-gray-50 py-6 rounded-[30px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleCustomChange('rating', star)}
                          className={`transition-all hover:scale-125 cursor-pointer ${values.rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                          <Star size={36} fill={values.rating >= star ? 'currentColor' : 'none'} strokeWidth={values.rating >= star ? 0 : 2} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[5px] text-center">Fecha</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#3f5efb]">
                        <Calendar size={24} />
                      </div>
                      <input 
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-transparent focus:border-[#3f5efb] focus:bg-white rounded-[30px] outline-none transition-all font-bold text-xl shadow-sm cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[12px] font-black text-gray-400 uppercase tracking-[5px] text-center">Imagen</label>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* Botón para subir archivo local */}
                      <button 
                        type="button"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="w-full py-6 bg-[#3f5efb] hover:bg-[#1a1a2e] text-white rounded-[30px] flex items-center justify-center gap-4 transition-all shadow-lg active:scale-95 group cursor-pointer"
                      >
                        <Upload size={24} className="group-hover:bounce" />
                        <span className="font-black text-lg">Subir desde dispositivo</span>
                      </button>
                      <input 
                        type="file" 
                        id="file-upload"
                        onChange={handleFileUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />

                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#3f5efb]">
                          <ImageIcon size={24} />
                        </div>
                        <input 
                          type="text"
                          name="imageUrl"
                          value={values.imageUrl.startsWith('data:') ? 'Imagen cargada desde archivo' : values.imageUrl}
                          onChange={handleChange}
                          placeholder="O pega la URL de una imagen..."
                          className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-transparent focus:border-[#3f5efb] focus:bg-white rounded-[30px] outline-none transition-all font-bold text-lg shadow-sm"
                        />
                      </div>
                    </div>
                    
                    {/* Vista previa de la imagen */}
                    <div className="mt-4 w-full h-56 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                      {values.imageUrl ? (
                        <>
                          <img src={values.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => handleCustomChange('imageUrl', '')}
                            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <div className="text-center text-gray-300">
                          <Camera size={64} className="mx-auto mb-2 opacity-30" />
                          <p className="text-sm font-bold uppercase tracking-widest">Sin Imagen</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center pt-8">
                <Button type="submit" className="px-24 py-8 text-2xl">
                  <Save size={32} />
                  {loading ? 'Guardando...' : 'Añadir a la Colección'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
