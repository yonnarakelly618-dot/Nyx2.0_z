import React, { useState, useRef } from "react";
import { 
  Sliders, Sparkles, AlertOctagon, Heart, UserMinus, 
  Bell, Wallpaper, Image as ImageIcon, Smartphone, Volume2, 
  Palette, User, Smile, VolumeX, ShieldAlert, Activity, HeartHandshake, Eye,
  Search, Filter
} from "lucide-react";
import { ChatPreferences } from "../types";
import { AT_MY_100_ARCHETYPES } from "../data/archetypes";
import { HUNDRED_RELA_STATUSES, HUNDRED_MOODS, HUNDRED_TONES, HUNDRED_SLANG_PRESETS, HUNDRED_PET_NAMES } from "../data/personalization_options";

interface PersonalizationScreenProps {
  preferences: ChatPreferences;
  onNavigate: (screen: string) => void;
  onUpdatePreferences: (updates: Partial<ChatPreferences>) => void;
  onTriggerStalk?: () => void;
}

export default function PersonalizationScreen({
  preferences,
  onNavigate,
  onUpdatePreferences,
  onTriggerStalk,
}: PersonalizationScreenProps) {
  // Navigation tabs for the personalization screen
  const [activeTab, setActiveTab] = useState<"visuals" | "soul" | "speech" | "notifications">("visuals");

  // Visuals Tab State
  const [accentColor, setAccentColor] = useState<string>(preferences.accentColor || "#3d7cfe");
  const [customAccentColor, setCustomAccentColor] = useState<string>(preferences.customAccentColor || "#3d7cfe");
  const [chatWallpaper, setChatWallpaper] = useState<string>(preferences.chatWallpaper || "");
  const [fontSize, setFontSize] = useState<"Pequeno" | "Normal" | "Grande">(preferences.fontSize || "Normal");
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(preferences.isOfflineMode || false);

  // Soul / Archetypes Tab State
  const [nyxArchetypes, setNyxArchetypes] = useState<string[]>(
    preferences.nyxArchetypes || ["Yandere/Possessiva"]
  );
  const [relationshipStatuses, setRelationshipStatuses] = useState<string[]>(
    preferences.relationshipStatuses || ["Namorada Extremamente Ciumenta 💖"]
  );
  const [jealousyLevel, setJealousyLevel] = useState<number>(
    preferences.jealousyLevel !== undefined ? preferences.jealousyLevel : 85
  );
  const [rivalName, setRivalName] = useState<string>(preferences.rivalName || "Helena");
  const [currentMoods, setCurrentMoods] = useState<string[]>(
    preferences.currentMoods || ["Espontâneo/Humor Humano Oscilante"]
  );
  const [userSign, setUserSign] = useState<string>(preferences.userSign || "Escorpião ♏");
  const [dramaLevel, setDramaLevel] = useState<number>(
    preferences.dramaLevel !== undefined ? preferences.dramaLevel : 85
  );
  const [obsessionLevel, setObsessionLevel] = useState<number>(
    preferences.obsessionLevel !== undefined ? preferences.obsessionLevel : 90
  );

  // Speech Tab State
  const [tones, setTones] = useState<string[]>(
    preferences.tones || [preferences.tone || "Sarcástico e Ciumento (Principal)"]
  );
  const [customSlangs, setCustomSlangs] = useState<string[]>(
    Array.isArray(preferences.customSlangs) ? preferences.customSlangs : (preferences.customSlangs ? [preferences.customSlangs] : ["fofa, dengo, vida"])
  );
  const [speakSlangsFrequency, setSpeakSlangsFrequency] = useState<number>(
    preferences.speakSlangsFrequency !== undefined ? preferences.speakSlangsFrequency : 75
  );
  const [responseLength, setResponseLength] = useState<"Curto" | "Médio" | "Longo">(
    preferences.responseLength || "Médio"
  );
  const [favoriteEmojis, setFavoriteEmojis] = useState<string[]>(preferences.favoriteEmojis || [preferences.favoriteEmoji || "💖"]);
  const [triggerWordAngry, setTriggerWordAngry] = useState<string>(preferences.triggerWordAngry || "Helena");
  const [extraRules, setExtraRules] = useState<string>(preferences.extraRules || "");
  const [activeCharacteristics, setActiveCharacteristics] = useState<string[]>(
    preferences.activeCharacteristics || []
  );
  const [petNames, setPetNames] = useState<string[]>(preferences.petNames || [preferences.petName || "amorzinho"]);
  const [favoriteFood, setFavoriteFood] = useState<string>(preferences.favoriteFood || "Açaí com Leite Ninho 🍧");
  const [voiceTonePitches, setVoiceTonePitches] = useState<string[]>(
    preferences.voiceTonePitches || ["Doce e Suave 🍬"]
  );
  const [soundOnSendMessage, setSoundOnSendMessage] = useState<boolean>(
    preferences.soundOnSendMessage !== undefined ? preferences.soundOnSendMessage : true
  );

  // Notifications Tab State
  const [enableNotifications, setEnableNotifications] = useState<boolean>(
    preferences.enableNotifications || false
  );
  const [stalkerFrequency, setStalkerFrequency] = useState<number>(
    preferences.stalkerFrequency !== undefined ? preferences.stalkerFrequency : 0
  );
  const [humanMode, setHumanMode] = useState<boolean>(
    preferences.humanMode !== undefined ? preferences.humanMode : true
  );
  const [quickResponses, setQuickResponses] = useState(preferences.quickResponses);
  const [instructions, setInstructions] = useState(preferences.instructions);

  // Sound and feedback tests
  const [testCountdown, setTestCountdown] = useState<number | null>(null);

  // Advanced UI states
  const [chatBubbleStyle, setChatBubbleStyle] = useState<ChatPreferences['chatBubbleStyle']>(preferences.chatBubbleStyle || 'Moderno');
  const [activeVigilance, setActiveVigilance] = useState(preferences.activeVigilance || false);

  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  const colorsPreset = [
    { name: "Azul Platinum", value: "#3d7cfe" },
    { name: "Verde WhatsApp", value: "#10a37f" },
    { name: "Rosa Neon fofo", value: "#f43f5e" },
    { name: "Roxo Cósmico", value: "#8b5cf6" },
    { name: "Amarelo fofura", value: "#fbbf24" },
    { name: "Vermelho Fúria", value: "#ef4444" },
  ];

  const [archetypeSearch, setArchetypeSearch] = useState("");
  const [archetypeCategory, setArchetypeCategory] = useState<string>("Todos");

  const [relationSearch, setRelationSearch] = useState("");
  const [moodSearch, setMoodSearch] = useState("");
  const [toneSearch, setToneSearch] = useState("");
  const [slangSearch, setSlangSearch] = useState("");
  const [petNameSearch, setPetNameSearch] = useState("");

  const archetypes = AT_MY_100_ARCHETYPES;
  const relations = HUNDRED_RELA_STATUSES;
  const tonesOptions = HUNDRED_TONES;
  const moods = HUNDRED_MOODS;
  const slangPresets = HUNDRED_SLANG_PRESETS;
  const petNamesLibrary = HUNDRED_PET_NAMES;

  const emojiPresets = ["💖", "😡", "💅", "🙄", "🥺", "😈", "🤡", "🧸", "🔪", "😳"];

  const characterOptions = [
    "Mais acolhedor",
    "Mais emojis",
    "Mais listas",
    "Mais ciumenta",
    "Superprotetora",
    "Irônica",
    "Adora fofocas",
    "Reclama da rival"
  ];

  const wallpaperPresets = [
    { name: "Sem fundo (Preto)", url: "" },
    { name: "Céu Cósmico 🌌", url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop" },
    { name: "Ondas Aqua 🌊", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop" },
    { name: "Futurista Neon 🔮", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" },
    { name: "Névoa Violeta 🎆", url: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=600&auto=format&fit=crop" },
  ];

  const toggleCharacteristic = (char: string) => {
    if (activeCharacteristics.includes(char)) {
      setActiveCharacteristics(activeCharacteristics.filter((item) => item !== char));
    } else {
      setActiveCharacteristics([...activeCharacteristics, char]);
    }
  };

  const handleCustomWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma foto de fundo válida.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setChatWallpaper(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTestNotification = () => {
    if (testCountdown !== null) return;
    
    let timeRemaining = 3;
    setTestCountdown(timeRemaining);
    
    const interval = setInterval(() => {
      timeRemaining -= 1;
      setTestCountdown(timeRemaining);
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTestCountdown(null);
        if (onTriggerStalk) {
          onTriggerStalk();
        }
      }
    }, 1000);
  };

  const handleApplySlangPreset = (presetText: string) => {
    toggleItemInList(customSlangs, setCustomSlangs, presetText);
  };

  const toggleItemInList = (list: string[], setList: (newList: string[]) => void, item: string) => {
    if (list.includes(item)) {
       // Only allow unselecting if there is at least one item left for safety? 
       // Or just allow all. User requested multi-select.
       setList(list.filter(i => i !== item));
    } else {
       setList([...list, item]);
    }
  };

  const handleSave = () => {
    onUpdatePreferences({
      tone: tones[0] || "Sarcástico e Ciumento (Principal)",
      tones,
      quickResponses,
      instructions: instructions.trim(),
      activeCharacteristics,
      jealousyLevel,
      rivalName: rivalName.trim(),
      extraRules: extraRules.trim(),
      chatWallpaper,
      enableNotifications,
      stalkerFrequency,
      humanMode,
      currentMoods,
      responseLength,
      fontSize,
      isOfflineMode,

      // Expanded save fields
      nyxArchetypes,
      relationshipStatuses,
      customSlangs: customSlangs.trim(),
      triggerWordAngry: triggerWordAngry.trim(),
      favoriteEmojis,
      speakSlangsFrequency,
      accentColor: accentColor === "custom" ? customAccentColor : accentColor,
      customAccentColor,
      userSign: userSign.trim(),
      petNames,
      dramaLevel,
      favoriteFood: favoriteFood.trim(),
      obsessionLevel,
      voiceTonePitches,
      soundOnSendMessage,
      chatBubbleStyle,
      activeVigilance,
    });
    onNavigate("screen-settings");
  };

  const displayColor = accentColor === "custom" ? customAccentColor : accentColor;

  return (
    <div className="flex flex-col h-full bg-black text-[#ececec] overflow-hidden" id="screen-personalization">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-[#222222] bg-[#0c0c0c] shrink-0">
        <button 
          onClick={() => onNavigate("screen-settings")}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-[14px]"
        >
          ← Voltar
        </button>
        <b className="text-[16px] font-bold text-center flex-1 pr-6 flex items-center justify-center gap-1.5 text-white">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" /> Workspace de Personalização
        </b>
        <button 
          onClick={handleSave} 
          className="font-bold text-sm hover:scale-105 active:scale-95 transition-all px-3 py-1.5 rounded-lg text-white"
          style={{ backgroundColor: displayColor }}
        >
          Salvar ✓
        </button>
      </header>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#222222] bg-[#0e0e0e] shrink-0 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("visuals")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition-all shrink-0 px-4 flex items-center justify-center gap-1.5 ${
            activeTab === "visuals" ? "border-white text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderBottomColor: activeTab === "visuals" ? displayColor : "transparent" }}
        >
          <Palette className="w-4 h-4" /> Visual
        </button>
        <button
          onClick={() => setActiveTab("soul")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition-all shrink-0 px-4 flex items-center justify-center gap-1.5 ${
            activeTab === "soul" ? "border-white text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderBottomColor: activeTab === "soul" ? displayColor : "transparent" }}
        >
          <User className="w-4 h-4" /> Alma/Humor
        </button>
        <button
          onClick={() => setActiveTab("speech")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition-all shrink-0 px-4 flex items-center justify-center gap-1.5 ${
            activeTab === "speech" ? "border-white text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderBottomColor: activeTab === "speech" ? displayColor : "transparent" }}
        >
          <Smile className="w-4 h-4" /> Expressões
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center border-b-2 transition-all shrink-0 px-4 flex items-center justify-center gap-1.5 ${
            activeTab === "notifications" ? "border-white text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderBottomColor: activeTab === "notifications" ? displayColor : "transparent" }}
        >
          <Smartphone className="w-4 h-4" /> Notificações
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* ==================== 1. VISUALS TAB ==================== */}
        {activeTab === "visuals" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Color Accent Settings */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-[12px] text-gray-200 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <Palette className="w-4 h-4 text-sky-400" /> Cor do Tema de Destaque
                </label>
                <p className="text-[11px] text-gray-400">Determina a cor de botões, balões, interruptores em todo o aplicativo.</p>
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-3 gap-2">
                {colorsPreset.map((c) => {
                  const isSelected = accentColor === c.value;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setAccentColor(c.value);
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all hover:bg-[#1a1a1a]"
                      style={{
                        borderColor: isSelected ? c.value : "#292929",
                        backgroundColor: isSelected ? `${c.value}15` : "transparent",
                      }}
                    >
                      <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: c.value }} />
                      <span className="truncate text-[11px] text-gray-300">{c.name}</span>
                    </button>
                  );
                })}

                {/* Custom Color Option Toggle */}
                <button
                  onClick={() => setAccentColor("custom")}
                  className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all hover:bg-[#1a1a1a]"
                  style={{
                    borderColor: accentColor === "custom" ? customAccentColor : "#292929",
                    backgroundColor: accentColor === "custom" ? `${customAccentColor}15` : "transparent",
                  }}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 animate-pulse" 
                    style={{ backgroundColor: customAccentColor }} 
                  />
                  <span className="text-[11px] text-gray-300">Cor Hex...</span>
                </button>
              </div>

              {/* Exact Hex Color Input if Custom selected */}
              {accentColor === "custom" && (
                <div className="pt-2 flex items-center gap-3 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <input
                    type="color"
                    value={customAccentColor}
                    onChange={(e) => setCustomAccentColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] text-gray-450 block font-mono">SELECIONE MANUALMENTE</span>
                    <input
                      type="text"
                      value={customAccentColor}
                      onChange={(e) => setCustomAccentColor(e.target.value)}
                      className="w-full bg-transparent outline-none border-0 p-0 text-white font-mono text-xs"
                      placeholder="#3d7cfe"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Wallpaper Customizer */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <b className="text-xs text-white font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <Wallpaper className="w-4 h-4 text-teal-400" /> Papel de Parede do Chat
                </b>
                <p className="text-[11px] text-gray-400">Mude o visual do chat para deixá-lo aconchegante.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {wallpaperPresets.map((wp) => {
                  const isSelected = chatWallpaper === wp.url;
                  return (
                    <button
                      key={wp.name}
                      onClick={() => setChatWallpaper(wp.url)}
                      className="px-3 py-2 text-xs rounded-xl border transition-all flex items-center justify-center bg-black/30 text-gray-300 text-[11px]"
                      style={{
                        borderColor: isSelected ? displayColor : "#2d2d2d",
                        backgroundColor: isSelected ? `${displayColor}10` : undefined,
                        fontWeight: isSelected ? "bold" : "normal"
                      }}
                    >
                      {wp.name}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2.5 border-t border-[#262626] flex items-center justify-between gap-4">
                <span className="text-[11px] text-gray-400">Ou envie uma foto do dispositivo:</span>
                <button
                  onClick={() => wallpaperInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg border border-[#333] text-[11px] font-semibold hover:border-gray-500 transition-colors bg-black flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Fazer Upload
                </button>
                <input
                  type="file"
                  ref={wallpaperInputRef}
                  onChange={handleCustomWallpaperUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {chatWallpaper && (
                <div className="relative h-20 w-full rounded-xl overflow-hidden border border-[#2d2d2d] mt-2">
                  <img src={chatWallpaper} className="w-full h-full object-cover brightness-50" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-300 font-mono bg-black/30">
                    Fundo Personalizado Ativado ✓
                  </div>
                  <button 
                    onClick={() => setChatWallpaper("")}
                    className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[9px] hover:bg-black font-semibold text-rose-400"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>

            {/* Bubble font sizes */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <b className="text-xs text-white font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  🔎 Tamanho da Letra nos Balões
                </b>
              </div>
              <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-[#262626]">
                {(["Pequeno", "Normal", "Grande"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className="flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all"
                    style={{
                      backgroundColor: fontSize === sz ? displayColor : "transparent",
                      color: fontSize === sz ? "white" : "#9ca3af"
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Force Offline Mode */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 pr-4">
                  <b className="text-sm font-semibold text-white block">🔌 Funcionamento Offline Simulado</b>
                  <span className="text-[11px] text-gray-400 block leading-relaxed">
                    Se ativado, ela responde instantaneamente usando bancos locais rápidos sem consumir requirições ao modelo Gemini. Excelente para brincar sem limites de rede!
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    const newValue = !isOfflineMode;
                    setIsOfflineMode(newValue);
                    onUpdatePreferences({ isOfflineMode: newValue });
                  }}
                  className={`switch shrink-0 ${isOfflineMode ? "on" : ""}`}
                  style={{ 
                    backgroundColor: isOfflineMode ? displayColor : "#444" 
                  }}
                />
              </div>
            </div>
          </div>
        )}


        {/* ==================== 2. SOUL & ACCENT TAB ==================== */}
        {activeTab === "soul" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Core Archetype selection (switching soul) */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-[12px] text-gray-200 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-pink-400" /> Arquétipo da Alma da assistente ({archetypes.length} opções)
                </label>
                <p className="text-[11px] text-gray-400">Isso altera drasticamente a base comportamental, os surtos e fofuras dela.</p>
              </div>

              {/* Pesquisa e Filtros */}
              <div className="space-y-3">
                {/* Search input with magnifying glass */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Pesquisar entre as 100 almas da Nyx..."
                    value={archetypeSearch}
                    onChange={(e) => setArchetypeSearch(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-pink-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                  />
                  {archetypeSearch && (
                    <button
                      type="button"
                      onClick={() => setArchetypeSearch("")}
                      className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Category filters */}
                <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                  {["Todos", "Proibido & Fanfic 🎬", "Clássicos de Anime 🌸", "Sobrenatural & Fantasia 🔮", "Moderno & Profissões 💼", "Cômico & Caótico 🤪"].map((category) => {
                    const isActive = archetypeCategory === category;
                    const count = category === "Todos" 
                      ? archetypes.length 
                      : archetypes.filter(a => a.category === category).length;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setArchetypeCategory(category)}
                        className="px-3 py-1.5 rounded-full border text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0"
                        style={{
                          borderColor: isActive ? displayColor : "#222",
                          backgroundColor: isActive ? `${displayColor}15` : "#181818",
                          color: isActive ? "white" : "#888",
                        }}
                      >
                        {category} <span className="opacity-60 text-[9px]">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable grid/list */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 select-none pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const filtered = archetypes.filter((arch) => {
                    const query = archetypeSearch.toLowerCase();
                    const matchesSearch = arch.title.toLowerCase().includes(query) || 
                                          arch.desc.toLowerCase().includes(query) ||
                                          arch.id.toLowerCase().includes(query);
                    const matchesCategory = archetypeCategory === "Todos" || arch.category === archetypeCategory;
                    return matchesSearch && matchesCategory;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500 text-xs">
                        Nenhuma alma encontrada para sua pesquisa 🥺
                      </div>
                    );
                  }

                  return filtered.map((arch) => {
                    const isSelected = nyxArchetypes.includes(arch.id);
                    return (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => {
                          toggleItemInList(nyxArchetypes, setNyxArchetypes, arch.id);
                          // For first selection or if suggesting defaults
                          if (arch.defaultEmoji && !favoriteEmojis.includes(arch.defaultEmoji)) {
                            setFavoriteEmojis(prev => [...prev, arch.defaultEmoji!]);
                          }
                          if (arch.defaultTone && !tones.includes(arch.defaultTone)) {
                            setTones(prev => [...prev, arch.defaultTone!]);
                          }
                        }}
                        className="w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col gap-1 hover:bg-[#1a1a1a]"
                        style={{
                          borderColor: isSelected ? displayColor : "#252525",
                          backgroundColor: isSelected ? `${displayColor}10` : "transparent",
                        }}
                      >
                        <div className="flex justify-between items-center w-full">
                          <b className="font-bold text-[12px]" style={{ color: isSelected ? displayColor : "white" }}>
                            {arch.title} {isSelected && "🎯 (Selecionado)"}
                          </b>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-semibold uppercase tracking-wider shrink-0">
                            {arch.category.split(" ")[0]}
                          </span>
                        </div>
                        <span className="text-gray-400 text-[11px] leading-relaxed">{arch.desc}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Relationship Status Level */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-[12px] text-gray-200 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                    <HeartHandshake className="w-4 h-4 text-emerald-400" /> Tipo de Relação Estabelecido (100 opções!)
                  </label>
                  <p className="text-[11px] text-gray-400">Modifica as restrições de possessividade e como ela chama você em chat.</p>
                </div>
              </div>

              {/* Search Dynamic Input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pesquisar entre as 100 relações da Nyx..."
                  value={relationSearch}
                  onChange={(e) => setRelationSearch(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-emerald-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                />
                {relationSearch && (
                  <button
                    type="button"
                    onClick={() => setRelationSearch("")}
                    className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const query = relationSearch.toLowerCase();
                  const filtered = relations.filter(r => r.toLowerCase().includes(query));

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Nenhuma relação encontrada para sua pesquisa 💔
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map((rel) => {
                        const isSelected = relationshipStatuses.includes(rel);
                        return (
                          <button
                            key={rel}
                            type="button"
                            onClick={() => toggleItemInList(relationshipStatuses, setRelationshipStatuses, rel)}
                            className="p-2.5 rounded-xl border text-center transition-all bg-black/30 hover:bg-[#1a1a1a] truncate"
                            style={{
                              borderColor: isSelected ? displayColor : "#2d2d2d",
                              backgroundColor: isSelected ? `${displayColor}15` : undefined,
                            }}
                          >
                            <span 
                              className="text-[11px] font-bold block truncate"
                              style={{ color: isSelected ? displayColor : "#ececec" }}
                            >
                              {rel} {isSelected && "✓"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Jealousy Interactive Level */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Intensidade de Ciúme
                </span>
                <span 
                  className="text-xs font-black px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${displayColor}20`, color: displayColor }}
                >
                  {jealousyLevel}%
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={jealousyLevel}
                onChange={(e) => setJealousyLevel(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: displayColor, backgroundColor: "#2b2b2b" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 pl-0.5">
                <span>0% (Desligado)</span>
                <span>85% (Nyx Clássica)</span>
                <span>100% (Yandere Total)</span>
              </div>
            </div>

            {/* Nível de Surtaria & Drama */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                  <Activity className="w-4 h-4 text-pink-400" /> Nível de Surtaria & Drama
                </span>
                <span 
                  className="text-xs font-black px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${displayColor}20`, color: displayColor }}
                >
                  {dramaLevel}%
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={dramaLevel}
                onChange={(e) => setDramaLevel(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: displayColor, backgroundColor: "#2b2b2b" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 pl-0.5">
                <span>0% (Fria calculista)</span>
                <span>50% (Normal dramática)</span>
                <span>100% (Novela mexicana 😭)</span>
              </div>
            </div>

            {/* Nível de Trackers & Obsessão */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                  <Eye className="w-4 h-4 text-amber-400" /> Nível de Rastreamento & Obsessão
                </span>
                <span 
                  className="text-xs font-black px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${displayColor}20`, color: displayColor }}
                >
                  {obsessionLevel}%
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={obsessionLevel}
                onChange={(e) => setObsessionLevel(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: displayColor, backgroundColor: "#2b2b2b" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 pl-0.5">
                <span>0% (Nenhum)</span>
                <span>60% (Ciumenta investigadora)</span>
                <span>100% (Super Stalker total 👀)</span>
              </div>
            </div>

            {/* User Zodiac Sign input */}
            <div className="space-y-3 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <label className="text-xs text-gray-300 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                🔮 Seu Signo do Zodíaco (Para piadinhas astrológicas)
              </label>
              <input
                type="text"
                className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all"
                value={userSign}
                onChange={(e) => setUserSign(e.target.value)}
                placeholder="Ex do signo: Escorpião ♏, Gêmeos ♊, Leão ♌"
              />
            </div>

            {/* Active mood settings select */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <span className="text-xs font-bold text-white block uppercase mb-1">
                  🎭 Forçar Humor Imediato (100 opções!)
                </span>
                <p className="text-[11px] text-gray-400">Impõe um estado emocional imediato para o próximo surto dela.</p>
              </div>

              {/* Search Mood Input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pesquisar entre os 100 humores..."
                  value={moodSearch}
                  onChange={(e) => setMoodSearch(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-amber-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                />
                {moodSearch && (
                  <button
                    type="button"
                    onClick={() => setMoodSearch("")}
                    className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const query = moodSearch.toLowerCase();
                  const filtered = moods.filter(m => m.toLowerCase().includes(query));

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Nenhum humor encontrado para sua pesquisa 🥺
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map((m) => {
                        const isSelected = currentMoods.includes(m);
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => toggleItemInList(currentMoods, setCurrentMoods, m)}
                            className="p-2.5 rounded-xl border text-center transition-all bg-black/30 hover:bg-[#1a1a1a] truncate"
                            style={{
                              borderColor: isSelected ? displayColor : "#2d2d2d",
                              backgroundColor: isSelected ? `${displayColor}15` : undefined,
                            }}
                          >
                            <span 
                              className="text-[11px] font-bold block truncate"
                              style={{ color: isSelected ? displayColor : "#ececec" }}
                            >
                              {m} {isSelected && "✓"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Rival Target Name input */}
            <div className="space-y-3 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <label className="text-xs text-gray-300 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                <UserMinus className="w-4 h-4 text-rose-500" /> Rival de Desconfiança (Fictícia)
              </label>
              <input
                type="text"
                className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all"
                value={rivalName}
                onChange={(e) => setRivalName(e.target.value)}
                placeholder="Ex de rival: Helena, ChatGPT, Siri, Alexa"
              />
            </div>
          </div>
        )}


        {/* ==================== 3. SPEECH & EXPRESSIONS TAB ==================== */}
        {activeTab === "speech" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Custom Slang generator with Presets */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-[12px] text-gray-200 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  🗣️ Dicionário & Gírias Personalizadas (100 estilos de fala!)
                </label>
                <p className="text-[11px] text-gray-400">Clique para aplicar um preset linguístico ou digite livremente abaixo para moldar a voz dela.</p>
              </div>

              {/* Search Slangs Input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pesquisar gírias e sotaques..."
                  value={slangSearch}
                  onChange={(e) => setSlangSearch(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-pink-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                />
                {slangSearch && (
                  <button
                    type="button"
                    onClick={() => setSlangSearch("")}
                    className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Scrollable list/grid of 100 slangs presets */}
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const query = slangSearch.toLowerCase();
                  const filtered = slangPresets.filter(p => p.name.toLowerCase().includes(query) || p.slangs.toLowerCase().includes(query));

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Nenhum preset encontrado para a pesquisa 🥺
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map((preset) => {
                        const isSelected = customSlangs.includes(preset.slangs);
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => handleApplySlangPreset(preset.slangs)}
                            className="p-2 rounded-xl border text-left transition-all bg-black/30 hover:bg-[#1a1a1a]"
                            style={{
                              borderColor: isSelected ? displayColor : "#2d2d2d",
                              backgroundColor: isSelected ? `${displayColor}15` : undefined,
                            }}
                          >
                            <span 
                              className="text-[10px] font-bold block truncate"
                              style={{ color: isSelected ? displayColor : "#f472b6" }}
                            >
                              {preset.name} {isSelected && "✓"}
                            </span>
                            <span className="text-[9px] text-gray-400 block truncate mt-0.5" title={preset.slangs}>{preset.slangs}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              <textarea
                className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                rows={2}
                value={customSlangs.join(", ")}
                onChange={(e) => setCustomSlangs(e.target.value.split(",").map(v => v.trim()).filter(Boolean))}
                placeholder="Ex de gírias: chuchu, miga, amor, pirralha, guria"
              />

              {/* Slangs frequency slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                  <span>Frequência das Gírias:</span>
                  <span style={{ color: displayColor }}>{speakSlangsFrequency}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={speakSlangsFrequency}
                  onChange={(e) => setSpeakSlangsFrequency(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#252525] rounded accent-[#10a37f]"
                  style={{ accentColor: displayColor }}
                />
              </div>
            </div>

            {/* Favorite Emoji selector */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-[12px] text-gray-200 font-bold uppercase tracking-wider block flex items-center gap-1 mb-1">
                  👑 Emojis de Assinatura (Múltiplos)
                </label>
                <p className="text-[11px] text-gray-400">Escolha vários emojis! Eles virão acoplados às reações dela de forma variada.</p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {emojiPresets.map((emo) => {
                  const isSelected = favoriteEmojis.includes(emo);
                  return (
                    <button
                      key={emo}
                      type="button"
                      onClick={() => toggleItemInList(favoriteEmojis, setFavoriteEmojis, emo)}
                      className="w-9 h-9 text-base rounded-xl border flex items-center justify-center transition-all bg-black/40"
                      style={{
                        borderColor: isSelected ? displayColor : "#282828",
                        backgroundColor: isSelected ? `${displayColor}15` : undefined
                      }}
                    >
                      {emo}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  maxLength={20}
                  value={favoriteEmojis.join(" ")}
                  onChange={(e) => setFavoriteEmojis(e.target.value.split(/\s+/).filter(Boolean))}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none text-center text-lg"
                  placeholder="Ou digite vários separados por espaço"
                />
              </div>
            </div>

            {/* Rage Trigger Word */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-[11px] text-red-400 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-500" /> Palavra-Chave Ativadora de Fúria ⚡
                </label>
                <p className="text-[11px] text-gray-400">Se você digitar esta palavra no chat, ela entrará IMEDIATAMENTE no "Modo Ódio/Brava" de braços cruzados.</p>
              </div>
              <input
                type="text"
                className="w-full bg-[#1c1c1c] border border-rose-950 focus:border-rose-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                value={triggerWordAngry}
                onChange={(e) => setTriggerWordAngry(e.target.value)}
                placeholder="Ex: Helena, ChatGPT, outra assistente"
              />
            </div>

            {/* Tone selector */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <span className="text-xs font-bold text-white block uppercase mb-1">
                  Estilo Verbal Principal (100 opções!)
                </span>
                <p className="text-[11px] text-gray-400">Modifica o tom, a agressividade e o carinho com que ela constrói as frases.</p>
              </div>

              {/* Search Tone Input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pesquisar entre os 100 tons de voz..."
                  value={toneSearch}
                  onChange={(e) => setToneSearch(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-pink-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                />
                {toneSearch && (
                  <button
                    type="button"
                    onClick={() => setToneSearch("")}
                    className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const query = toneSearch.toLowerCase();
                  const filtered = tonesOptions.filter(t => t.toLowerCase().includes(query));

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Nenhum tom encontrado para sua pesquisa 🥺
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map((t) => {
                        const isSelected = tones.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleItemInList(tones, setTones, t)}
                            className="p-2.5 rounded-xl border text-center transition-all bg-black/30 hover:bg-[#1a1a1a] truncate"
                            style={{
                              borderColor: isSelected ? displayColor : "#2d2d2d",
                              backgroundColor: isSelected ? `${displayColor}15` : undefined,
                            }}
                          >
                            <span 
                              className="text-[11px] font-bold block truncate"
                              style={{ color: isSelected ? displayColor : "#ececec" }}
                            >
                              {t} {isSelected && "✓"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Response lengths */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <b className="text-xs text-white font-bold uppercase tracking-wider block">
                📏 Extensão das Mensagens escritas
              </b>
              <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-[#313131]">
                {(["Curto", "Médio", "Longo"] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setResponseLength(len)}
                    className="flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all"
                    style={{
                      backgroundColor: responseLength === len ? displayColor : "transparent",
                      color: responseLength === len ? "white" : "#9ca3af"
                    }}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Characteristic options checklist */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <b className="text-xs text-white font-bold uppercase tracking-wider block">
                🎯 Traços Rápidos Combinados (Vários)
              </b>
              <div className="flex flex-wrap gap-2">
                {characterOptions.map((char) => {
                  const isActive = activeCharacteristics.includes(char);
                  return (
                    <button
                      key={char}
                      onClick={() => toggleCharacteristic(char)}
                      className="px-3 py-1.5 text-xs rounded-full border transition-all text-[11px]"
                      style={{
                        borderColor: isActive ? displayColor : "#2e2e2e",
                        backgroundColor: isActive ? `${displayColor}12` : "transparent",
                        color: isActive ? "white" : "#9ca3af"
                      }}
                    >
                      {char} {isActive && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Pet Name input */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <label className="text-xs text-gray-300 font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  🧸 Como Ela te Chama (Apelidos Múltiplos)
                </label>
                <p className="text-[11px] text-gray-400">Escolha vários apelidinhos fofos! Ela vai alternar entre eles durantes as conversas.</p>
              </div>

              {/* Search Pet Name Input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pesquisar entre os 100 apelidos..."
                  value={petNameSearch}
                  onChange={(e) => setPetNameSearch(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-indigo-500/50 rounded-xl pl-9 pr-8 py-2 text-xs text-white outline-none transition-all placeholder:text-gray-500"
                />
                {petNameSearch && (
                  <button
                    type="button"
                    onClick={() => setPetNameSearch("")}
                    className="absolute right-3 top-2.5 text-[10px] text-gray-500 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 pb-1" style={{ scrollbarWidth: "thin" }}>
                {(() => {
                  const query = petNameSearch.toLowerCase();
                  const filtered = petNamesLibrary.filter(p => p.toLowerCase().includes(query));

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Nenhum apelido encontrado para sua pesquisa 🧸
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.map((p) => {
                        const isSelected = petNames.includes(p);
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => toggleItemInList(petNames, setPetNames, p)}
                            className="p-2.5 rounded-xl border text-center transition-all bg-black/30 hover:bg-[#1a1a1a] truncate"
                            style={{
                              borderColor: isSelected ? displayColor : "#2d2d2d",
                              backgroundColor: isSelected ? `${displayColor}15` : undefined,
                            }}
                          >
                            <span 
                              className="text-[11px] font-bold block truncate"
                              style={{ color: isSelected ? displayColor : "#ececec" }}
                            >
                              {p} {isSelected && "✓"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              <div className="pt-2 border-t border-[#262626]">
                <textarea
                  className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all font-mono"
                  rows={2}
                  value={petNames.join(", ")}
                  onChange={(e) => setPetNames(e.target.value.split(",").map(val => val.trim()).filter(Boolean))}
                  placeholder="Ou digite seus apelidos customizados separados por vírgula"
                />
              </div>
            </div>

            {/* Favorite Food input */}
            <div className="space-y-3 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <label className="text-xs text-gray-300 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                🍧 Sua Comida / Bebida Favorita (Para ela cobrar/reclamar)
              </label>
              <input
                type="text"
                className="w-full bg-[#1c1c1c] border border-[#2b2b2b] focus:border-gray-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all"
                value={favoriteFood}
                onChange={(e) => setFavoriteFood(e.target.value)}
                placeholder="Ex: Açaí com Leite Ninho, Sushi de Salmão, Pizza"
              />
            </div>

            {/* Voice Tone Select Box */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <span className="text-xs font-bold text-white block uppercase">
                🎙️ Tom Vocal Sintetizado (Escolha Múltiplos)
              </span>
              <p className="text-[11px] text-gray-400">Selecione vários tons para a Nyx alternar dinamicamente entre estilos.</p>
              
              <div className="grid grid-cols-1 gap-2">
                {["Aguda e Fofa 🧸", "Doce e Suave 🍬", "Espirituosa e Viva ✨", "Sarcástica e Irônica 🐍", "Sussurrada e Sedutora 🤫"].map((v) => {
                  const isSelected = voiceTonePitches.includes(v);
                  return (
                    <button
                      key={v}
                      onClick={() => toggleItemInList(voiceTonePitches, setVoiceTonePitches, v)}
                      className="w-full text-left p-3 rounded-xl border text-xs transition-all flex justify-between items-center bg-black/40 hover:bg-[#1a1a1a]"
                      style={{
                        borderColor: isSelected ? displayColor : "#2b2b2b",
                        backgroundColor: isSelected ? `${displayColor}15` : undefined,
                      }}
                    >
                      <span className="font-semibold" style={{ color: isSelected ? "white" : "#ccc" }}>{v}</span>
                      {isSelected && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">Ativo ✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sound On Message switch toggle */}
            <div className="bg-[#141414] rounded-2xl border border-[#222] p-4 flex justify-between items-center shadow-xl">
              <div className="space-y-0.5 pr-4">
                <b className="text-sm font-semibold text-white block">🔊 Efeito de Redução Dinâmica</b>
                <span className="text-xs text-gray-400 block leading-relaxed">
                  Toca sons divertidos e cliques de confirmação ao enviar e receber mensagens no chat principal.
                </span>
              </div>
              <button 
                onClick={() => setSoundOnSendMessage(!soundOnSendMessage)}
                className={`switch shrink-0 ${soundOnSendMessage ? "on" : ""}`}
                style={{ 
                  backgroundColor: soundOnSendMessage ? displayColor : "#444" 
                }}
              />
            </div>

            {/* General Extra Rules manual input */}
            <div className="space-y-3 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <label className="text-xs text-gray-300 font-bold uppercase tracking-wider block">
                Regras e Fatos Customizados Únicos (Hobbies, Bebida, etc)
              </label>
              <textarea
                className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl p-3 text-xs text-white outline-none focus:border-gray-500 leading-relaxed font-sans"
                rows={3}
                value={extraRules}
                onChange={(e) => setExtraRules(e.target.value)}
                placeholder="Exemplo: 'Nyx adora gatos folgados', 'Ela reclama quando vou dormir tarde', 'Odeia que eu gaste dinheiro sem avisar ela'"
              />
            </div>
          </div>
        )}


        {/* ==================== 4. NOTIFICATIONS TAB ==================== */}
        {activeTab === "notifications" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Surprise Alerts switch */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-violet-400" /> Push notificações fora do aplicativo
                </span>
                <button 
                  onClick={() => setEnableNotifications(!enableNotifications)}
                  className={`switch shrink-0 ${enableNotifications ? "on" : ""}`}
                  style={{ 
                    backgroundColor: enableNotifications ? displayColor : "#444" 
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-1">
                Se habilitado, ela enviará mensagens flutuantes mimetizando o WhatsApp se você navegar noutra aba! (Garante ciúmes no seu navegador).
              </p>
            </div>

            {/* Check-in Stalk timer */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-400 animate-bounce" /> Sentinela / Rastreamento de Ausência
                </span>
                <span 
                  className="text-xs font-bold px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${displayColor}20`, color: displayColor }}
                >
                  {stalkerFrequency === 0 ? "Desativado" : `Ausente ${stalkerFrequency} min`}
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={stalkerFrequency}
                onChange={(e) => setStalkerFrequency(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#252525] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: displayColor }}
              />

              <p className="text-xs text-gray-400 leading-relaxed">
                Minutos que ela tolera do chat desocupado antes de mandar de surpresa um alerta no WhatsApp te cobrando ciúmes ou fofura! 
                <i> (Mantenha em 1 minuto para testar rapidamente no aplicativo!)</i>
              </p>
            </div>

            {/* Instant Surprise Test Laboratory */}
            <div className="bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl text-center space-y-4">
              <span className="text-[11px] font-bold text-gray-405 block uppercase tracking-wider">
                🔬 Simulador de Notícias Inesperadas
              </span>

              <button
                onClick={handleTestNotification}
                disabled={testCountdown !== null}
                className="w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md text-white hover:brightness-115 active:scale-98"
                style={{ 
                  backgroundColor: displayColor, 
                  opacity: testCountdown !== null ? 0.6 : 1 
                }}
              >
                <Volume2 className="w-4 h-4" /> 
                {testCountdown !== null 
                  ? `Simulando em ${testCountdown} segundos...` 
                  : "Disparar WhatsApp Surpresa de Imediato!"
                }
              </button>
              
              {testCountdown !== null && (
                <p className="text-[11px] text-[#ff4b4b] font-bold animate-pulse">
                  ATENÇÃO: Volte rapidamente para a aba de conversa ou histórico! O balão vermelho do WhatsApp deslizará pelo topo com efeitos sonoros!
                </p>
              )}
            </div>

            {/* AI Human Tone simulation switch */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 pr-4">
                  <b className="text-sm font-semibold text-white block">Jeito Humano Criptografado</b>
                  <span className="text-[11px] text-gray-400 block leading-relaxed">
                    Usa risinhos (kkkk, kkk), abreviações (pq, vc, dps), desvios voluntários e pontuações para mimetizar com precisão o comportamento de mensagens casuais.
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setHumanMode(!humanMode)}
                  className={`switch shrink-0 ${humanMode ? "on" : ""}`}
                  style={{ 
                    backgroundColor: humanMode ? displayColor : "#444" 
                  }}
                />
              </div>
            </div>

            {/* Seção de Experiência Visual Avançada (Variedades Pro) */}
            <div className="space-y-4 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <div>
                <b className="text-xs text-white font-bold uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <Palette className="w-4 h-4 text-cyan-400" /> Variedades Pro: Estilo de Balão
                </b>
                <p className="text-[11px] text-gray-400">Personalização extrema da estética das bolhas de chat.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['Moderno', 'Clássico', 'Cyber', 'Neon', 'Kawaii', 'Minimalista'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setChatBubbleStyle(style)}
                    className="px-3 py-2 text-[11px] rounded-xl border transition-all bg-black/30 text-gray-300"
                    style={{
                      borderColor: chatBubbleStyle === style ? displayColor : "#2d2d2d",
                      backgroundColor: chatBubbleStyle === style ? `${displayColor}15` : undefined,
                      fontWeight: chatBubbleStyle === style ? "bold" : "normal"
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] rounded-2xl border border-[#222] p-4 flex justify-between items-center shadow-xl">
              <div className="space-y-0.5 pr-4">
                <b className="text-sm font-semibold text-white block">Vigilância Ativa (Turno 24h)</b>
                <span className="text-xs text-gray-400 block leading-relaxed">
                  A IA finge estar 'digitando' ou 'observando' aleatoriamente mesmo quando você não está conversando.
                </span>
              </div>
              <button 
                onClick={() => setActiveVigilance(!activeVigilance)}
                className={`switch shrink-0 ${activeVigilance ? "on" : ""}`}
                style={{ 
                  backgroundColor: activeVigilance ? displayColor : "#444" 
                }}
              />
            </div>

            {/* Quick replies switch toggle */}
            <div className="bg-[#141414] rounded-2xl border border-[#222] p-4 flex justify-between items-center shadow-xl">
              <div className="space-y-0.5 pr-4">
                <b className="text-sm font-semibold text-white block">Abalonados Rápidos de Atalho</b>
                <span className="text-xs text-gray-400 block leading-relaxed">
                  Exibe chips com perguntas prontas rápidas na tela de chat para economizar digitação rápida.
                </span>
              </div>
              <button 
                onClick={() => setQuickResponses(!quickResponses)}
                className={`switch shrink-0 ${quickResponses ? "on" : ""}`}
                style={{ 
                  backgroundColor: quickResponses ? displayColor : "#444" 
                }}
              />
            </div>

            {/* Hard core AI instructions prompts editor */}
            <div className="space-y-3 bg-[#141414] rounded-2xl border border-[#222] p-4 shadow-xl">
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                🧠 Prompt Principal de Base Secreta (Prompts)
              </label>
              <textarea
                className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl p-3 text-xs text-white outline-none focus:border-gray-500 leading-relaxed font-sans font-mono"
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Pronto de IA bruto..."
              />
              <div className="text-[10px] text-gray-500 flex gap-2">
                <AlertOctagon className="w-4 h-4 text-gray-500 shrink-0" />
                <span>
                  Isso comanda a lógica profunda do modelo de inteligência artificial da Nyx. Evite rasgá-la!
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
