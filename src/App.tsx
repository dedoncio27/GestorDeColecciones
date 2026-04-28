import { useState, useMemo, useEffect } from 'react'
import { Plus, LayoutGrid, Book, Coins, Gamepad2, Search, Trash2, X, Folder, Music, Film, Camera, Heart, Star, Watch, Coffee, PenTool, Globe, PackagePlus, Calendar, SearchX, Filter } from 'lucide-react'
import { useCollections } from './context/CollectionsContext'
import { settingsApi } from './api/client'
import { useNavigate, useLocation } from 'react-router-dom'

const IconComponent = ({ name, size = 24 }: { name: string, size?: number }) => {
  const icons: Record<string, any> = {
    Book, Coins, Gamepad2, Folder, Music, Film, Camera, Heart, Star, Watch, Coffee, PenTool, Globe
  };
  const Icon = icons[name] || Folder;
  return <Icon size={size} />;
}

const getContrastColor = (hex: string) => {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.length === 3 ? normalized[0] + normalized[0] : normalized.slice(0, 2), 16);
  const g = parseInt(normalized.length === 3 ? normalized[1] + normalized[1] : normalized.slice(2, 4), 16);
  const b = parseInt(normalized.length === 3 ? normalized[2] + normalized[2] : normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#ffffff';
}

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [selectedColId, setSelectedColId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [exactRating, setExactRating] = useState(0)
  const [themeColor, setThemeColor] = useState(() => {
    if (typeof window === 'undefined') return '#3f5efb'
    return localStorage.getItem('gc_themeColor') ?? '#3f5efb'
  })
  const [collectionBgColor, setCollectionBgColor] = useState(() => {
    if (typeof window === 'undefined') return '#f0f2f5'
    return localStorage.getItem('gc_collectionBgColor') ?? '#f0f2f5'
  })
  const [settingsLoaded, setSettingsLoaded] = useState(false)
  const [showThemeControls, setShowThemeControls] = useState(false)
  const { collections, loading, removeCollection, removeItem } = useCollections()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.selectedColId) {
      setSelectedColId(location.state.selectedColId)
    }
  }, [location.state?.selectedColId])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await settingsApi.get();
        if (settings.themeColor) setThemeColor(settings.themeColor);
        if (settings.collectionBgColor) setCollectionBgColor(settings.collectionBgColor);
      } catch (error) {
        console.error('Error loading theme settings:', error);
      } finally {
        setSettingsLoaded(true);
      }
    };

    loadSettings();
  }, [])

  useEffect(() => {
    if (!settingsLoaded) return;
    settingsApi.save({ themeColor, collectionBgColor }).catch((error) => {
      console.error('Error saving theme settings:', error);
    });
  }, [themeColor, collectionBgColor, settingsLoaded])

  useEffect(() => {
    localStorage.setItem('gc_themeColor', themeColor)
  }, [themeColor])

  useEffect(() => {
    localStorage.setItem('gc_collectionBgColor', collectionBgColor)
  }, [collectionBgColor])

  const themeTextColor = useMemo(() => getContrastColor(themeColor), [themeColor])
  const collectionBgTextColor = useMemo(() => getContrastColor(collectionBgColor), [collectionBgColor])
  const themeTextSecondaryColor = themeTextColor === '#ffffff' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)'
  const themeTextMutedColor = themeTextColor === '#ffffff' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'

  const activeCollection = collections.find(c => c.id === (selectedColId || (collections.length > 0 ? collections[0].id : null)))

  const filteredItems = useMemo(() => {
    if (!activeCollection?.items) return [];
    
    return activeCollection.items.filter(item => {
      const matchesSearch = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      const matchesRating = exactRating === 0 || item.rating === exactRating;
      
      return matchesSearch && matchesRating;
    });
  }, [activeCollection, searchQuery, exactRating]);

  const handleDeleteItem = async (e: React.MouseEvent, collectionId: string, itemId: string, itemName: string) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar el elemento "${itemName}"?`)) {
      await removeItem(collectionId, itemId);
    }
  }

  const handleDeleteCollection = async (e: React.MouseEvent, collectionId: string, collectionName: string) => {
    e.stopPropagation();
    if (window.confirm(`¿Seguro que quieres borrar la colección "${collectionName}" y todos sus elementos?`)) {
      await removeCollection(collectionId);
      if (selectedColId === collectionId) {
        setSelectedColId(null);
      }
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f2f5] font-['Segoe_UI',sans-serif]">
      {/* --- BARRA LATERAL --- */}
      <aside 
        className={`flex-shrink-0 flex flex-col z-[1000] shadow-[4px_0_20px_rgba(63,94,251,0.2)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isSidebarExpanded ? 'w-[30%]' : 'w-[80px]'}`}
        style={{ backgroundColor: themeColor, color: themeTextColor }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="p-6 flex items-center gap-4 border-b border-white/20 flex-shrink-0">
            <div className="min-w-[40px] h-[40px] bg-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg cursor-pointer" style={{ color: themeColor }}>
              GC
            </div>
            <span className={`text-xl font-black whitespace-nowrap transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'}`} style={{ color: themeTextColor }}>
              Gestor de Colecciones
            </span>
        </div>

        <nav className="flex-grow py-6 px-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <h2 className={`text-[0.7rem] uppercase tracking-[2px] mb-4 px-3 font-black transition-opacity duration-300 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`} style={{ color: themeTextColor }}>
            Tus Bloques
          </h2>
          <div className="space-y-2">
            {loading ? (
              <div className="px-3 text-sm animate-pulse font-bold" style={{ color: themeTextSecondaryColor }}>Cargando...</div>
            ) : (
              collections.map((col) => {
                const isSelected = activeCollection?.id === col.id;
                return (
                  <div 
                    key={col.id} 
                    className="relative px-3 group/sidebar-item"
                  >
                    <button 
                      onClick={() => {
                        setSelectedColId(col.id);
                        setSearchQuery(''); 
                        setExactRating(0);
                      }}
                      className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${isSelected ? 'bg-white shadow-xl scale-[1.02]' : 'hover:bg-white/10'}`}
                      style={{ color: isSelected ? themeColor : themeTextColor }}
                    >
                      <div className="min-w-[32px] flex justify-center transition-transform duration-300 group-hover/sidebar-item:scale-110">
                        <IconComponent name={col.icon} />
                      </div>
                      
                      <div className={`ml-4 text-left transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 w-0 overflow-hidden'}`}>
                        <p className="font-black text-sm leading-tight whitespace-nowrap text-inherit">{col.name}</p>
                        <p className="text-[10px] mt-0.5 font-bold" style={{ color: isSelected ? `${themeColor}99` : themeTextMutedColor }}>
                          {col.items?.length || 0} elementos
                        </p>
                      </div>
                    </button>
                    
                    {/* PAPELERA: Ahora SOLO se muestra si la barra lateral está EXPANDIDA */}
                    {isSidebarExpanded && (
                      <button 
                        onClick={(e) => handleDeleteCollection(e, col.id, col.name)}
                        className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 transition-all duration-300 cursor-pointer z-[10] ${isSelected ? 'opacity-100 hover:text-red-500' : 'opacity-0 group-hover/sidebar-item:opacity-100 hover:text-red-400'}`}
                        style={{ color: isSelected ? themeColor : themeTextMutedColor }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <button 
            onClick={() => navigate('/create')}
            className={`w-full bg-white rounded-xl cursor-pointer flex items-center transition-all duration-300 group hover:scale-[1.05] active:scale-95 shadow-2xl ${isSidebarExpanded ? 'p-5 justify-start' : 'p-5 justify-center'}`}
            style={{ color: themeColor }}
          >
            <Plus size={28} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className={`ml-4 font-black text-lg whitespace-nowrap transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 w-0 overflow-hidden'}`}>
              Nueva Colección
            </span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main 
        className={`flex-grow h-screen flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isSidebarExpanded ? 'brightness-95' : ''}`}
        style={{ backgroundColor: collectionBgColor }}
      >
        {collections.length > 0 && activeCollection ? (
          <>
            <div className="flex-grow overflow-y-auto scroll-smooth">
              <div className="max-w-full">
                
                {/* --- TOPBAR --- */}
                <div className="px-16 py-6 pb-8 shadow-lg mb-[10px]" style={{ backgroundColor: themeColor, color: themeTextColor }}>
                  <div className="max-w-6xl mx-auto flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6 animate-in slide-in-from-left-4 duration-500">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner" style={{ color: themeTextColor }}>
                          <IconComponent name={activeCollection.icon} size={32} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter leading-none" style={{ color: themeTextColor }}>
                          {activeCollection.name}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-3 rounded-[40px] bg-white/10 border border-white/20 px-5 py-4 shadow-xl backdrop-blur-md" style={{ minWidth: '280px' }}>
                        <button
                          onClick={() => setShowThemeControls((current) => !current)}
                          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black shadow-lg transition-all hover:bg-white/20"
                          style={{ color: themeTextColor }}
                        >
                          <span
                            className="inline-flex h-9 w-9 rounded-full border border-white/20"
                            style={{ background: `conic-gradient(${themeColor} 0deg 180deg, ${collectionBgColor} 180deg 360deg)` }}
                          />
                          <span>Cambiar tema</span>
                        </button>

                        {showThemeControls && (
                          <div className="grid grid-cols-1 gap-3 pt-2">
                            <label className="text-[10px] uppercase tracking-[2px] opacity-80" style={{ color: themeTextSecondaryColor }}>
                              Color topbar & sidebar
                            </label>
                            <input
                              type="color"
                              value={themeColor}
                              onChange={(e) => setThemeColor(e.target.value)}
                              className="h-11 w-full rounded-2xl border border-white/20 p-0 cursor-pointer"
                              style={{ backgroundColor: themeColor, color: themeTextColor }}
                            />
                            <label className="text-[10px] uppercase tracking-[2px] opacity-80" style={{ color: themeTextSecondaryColor }}>
                              Color fondo colección
                            </label>
                            <input
                              type="color"
                              value={collectionBgColor}
                              onChange={(e) => setCollectionBgColor(e.target.value)}
                              className="h-11 w-full rounded-2xl border border-white/20 p-0 cursor-pointer"
                              style={{ backgroundColor: collectionBgColor, color: collectionBgTextColor }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
                      <div className="flex-grow flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-[25px] shadow-xl hover:bg-white/20 transition-all group focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-white/30">
                        <Search size={18} className="transition-colors" style={{ color: themeTextSecondaryColor }} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={`Buscar en ${activeCollection.name.toLowerCase()}...`}
                          className="bg-transparent border-none outline-none w-full text-sm font-bold placeholder:text-current"
                          style={{ color: themeTextColor, caretColor: themeTextColor }}
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="transition-colors cursor-pointer" style={{ color: themeTextMutedColor }}>
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-[25px] shadow-xl whitespace-nowrap">
                        <Filter size={14} className="transition-colors" style={{ color: themeTextSecondaryColor }} />
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setExactRating(exactRating === star ? 0 : star)}
                              className="transition-all hover:scale-125 cursor-pointer relative"
                              style={{ color: exactRating === star ? '#FACC15' : themeTextMutedColor }}
                            >
                              <Star size={20} fill={exactRating === star ? 'currentColor' : 'none'} strokeWidth={exactRating === star ? 0 : 2} />
                              {exactRating === star && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                        {exactRating > 0 && (
                          <button 
                            onClick={() => setExactRating(0)}
                            className="ml-2 text-[10px] font-black uppercase hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ color: themeTextMutedColor }}
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-full px-8 pt-0 pb-20 flex flex-col items-center">
                  {!searchQuery && exactRating === 0 && (
                    <div className="w-fit max-w-4xl bg-white/60 backdrop-blur-md px-12 py-5 rounded-[40px] shadow-sm animate-in fade-in slide-in-from-top-2 duration-700">
                      <div className="flex flex-col items-center text-center gap-1">
                        <h3 className="text-[10px] font-black uppercase tracking-[4px] text-[#3f5efb] opacity-60">Sobre esta colección</h3>
                        <p className="text-xl font-bold italic text-gray-500 leading-tight">
                          {activeCollection.description || `Esta es tu galería personalizada de ${activeCollection.name.toLowerCase()}.`}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="w-full max-w-7xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => navigate(`/collection/${activeCollection.id}/edit/${item.id}`)}
                          className="bg-white rounded-[40px] overflow-hidden shadow-xl hover:scale-[1.03] transition-all group border border-white relative cursor-pointer"
                        >
                          <button 
                            onClick={(e) => handleDeleteItem(e, activeCollection.id, item.id, item.name)}
                            className="absolute top-4 left-4 z-50 bg-red-600 text-white p-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 shadow-lg cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>

                          <div className="h-56 bg-gray-100 overflow-hidden relative">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Camera size={48} />
                              </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-yellow-500 font-black text-xs shadow-lg">
                              <Star size={12} fill="currentColor" />
                              {item.rating}
                            </div>
                          </div>
                          <div className="p-8">
                            <div className="flex items-center gap-2 text-[10px] font-black text-[#3f5efb] uppercase tracking-widest mb-2 opacity-60">
                              <Calendar size={12} />
                              {item.date}
                            </div>
                            <h3 className="text-2xl font-black text-[#1a1a2e] mb-2 leading-tight">{item.name}</h3>
                            <p className="text-gray-400 font-medium text-sm line-clamp-2 italic">{item.description}</p>
                          </div>
                        </div>
                      ))
                    ) : activeCollection.items && activeCollection.items.length > 0 ? (
                      <div className="col-span-full text-center py-20 animate-in fade-in zoom-in duration-300">
                        <div className="inline-block p-10 bg-white text-gray-300 rounded-[40px] mb-6 shadow-sm">
                          <SearchX size={72} />
                        </div>
                        <h2 className="text-4xl font-black text-[#1a1a2e] mb-3 tracking-tighter">
                          Sin resultados para {searchQuery ? `"${searchQuery}"` : ""} {exactRating > 0 ? `con exactamente ${exactRating} estrellas` : ""}
                        </h2>
                        <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
                          Intenta ajustar los filtros para encontrar lo que buscas.
                        </p>
                        <button 
                          onClick={() => { setSearchQuery(''); setExactRating(0); }}
                          className="mt-8 text-[#3f5efb] font-black text-lg underline underline-offset-8 decoration-2 hover:opacity-70 transition-all cursor-pointer"
                        >
                          Limpiar todos los filtros
                        </button>
                      </div>
                    ) : (
                      <div className="col-span-full text-center py-20 bg-[#f0f2f5] rounded-[70px] transition-all">
                        <div className="inline-block p-10 bg-white text-gray-300 rounded-[40px] mb-6 shadow-sm">
                          <LayoutGrid size={72} />
                        </div>
                        <h2 className="text-4xl font-black text-[#1a1a2e] mb-3 tracking-tighter">Tu galería está lista</h2>
                        <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
                          Añade tus primeros elementos para empezar a gestionar tu colección de forma profesional.
                        </p>
                      </div>
                    )}
                  </div>

                  {!searchQuery && exactRating === 0 && (
                    <div className="flex justify-center mt-12">
                      <button 
                        onClick={() => navigate(`/collection/${activeCollection.id}/add`)}
                        className="bg-[#1a1a2e] hover:bg-[#3f5efb] text-white px-16 py-7 rounded-full flex items-center gap-5 transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(26,26,46,0.3)] font-black text-2xl group cursor-pointer"
                      >
                        <div className="p-1.5 bg-white/20 rounded-xl group-hover:rotate-90 transition-transform">
                          <Plus size={32} />
                        </div>
                        Añadir elemento
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-10 bg-white">
            <div className="text-center max-w-xl animate-in zoom-in-95 duration-700">
              <div className="inline-block p-12 bg-blue-50 text-[#3f5efb] rounded-[60px] mb-12 shadow-2xl shadow-blue-500/10 animate-bounce-subtle">
                <PackagePlus size={100} strokeWidth={1.5} />
              </div>
              <h1 className="text-6xl font-black text-[#1a1a2e] mb-6 tracking-tighter">Tu Galería está vacía</h1>
              <p className="text-gray-400 font-medium text-2xl leading-relaxed mb-12 max-w-lg mx-auto">
                Crea tu primer bloque de gestión para empezar a organizar tus tesoros de forma profesional.
              </p>
              <button
                onClick={() => navigate('/create')}
                className="bg-[#3f5efb] hover:bg-[#1a1a2e] text-white px-16 py-8 rounded-[40px] flex items-center gap-6 transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(63,94,251,0.3)] font-black text-3xl group mx-auto cursor-pointer"
              >
                <div className="p-2 bg-white/20 rounded-2xl group-hover:rotate-90 transition-transform">
                  <Plus size={40} />
                </div>
                Crear mi primera colección
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
