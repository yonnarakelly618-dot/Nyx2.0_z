import React, { useState, useRef } from "react";
import { User, Settings, Palette, Key, Sliders, ChevronRight, RotateCcw, Image, Save, Upload } from "lucide-react";
import { ChatPreferences } from "../types";

interface SettingsScreenProps {
  preferences: ChatPreferences;
  onNavigate: (screen: string) => void;
  onUpdatePreferences: (updates: Partial<ChatPreferences>) => void;
  onResetToFactory: () => void;
}

export default function SettingsScreen({
  preferences,
  onNavigate,
  onUpdatePreferences,
  onResetToFactory,
}: SettingsScreenProps) {
  const [userName, setUserName] = useState(preferences.userName);
  const [userEmail, setUserEmail] = useState(preferences.userEmail);
  const [userPhoto, setUserPhoto] = useState(preferences.userPhoto);
  const [nyxPhoto, setNyxPhoto] = useState(preferences.nyxPhoto);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const userPhotoInputRef = useRef<HTMLInputElement>(null);
  const nyxPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleUserPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setUserPhoto(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNyxPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setNyxPhoto(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Pre-loaded avatar ideas
  const presetUserAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Yonnara",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Yonnara",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Yonnara",
  ];

  const presetNyxAvatars = [
    "https://i.pinimg.com/736x/8a/1b/3c/8a1b3c9d6f5b9d3e8e2b8f8e8f8e8f8e.jpg", // Romantic Anime
    "https://api.dicebear.com/7.x/lorelei/svg?seed=Nyx", // Lorelei anime
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Nyx",
  ];

  const accentColors = [
    { name: "Azul Oficial", hex: "#3d7cfe" },
    { name: "Verde Inteligente", hex: "#10a37f" },
    { name: "Rosa Paixão/Ciúme", hex: "#ec4899" },
    { name: "Roxo Platinum", hex: "#a855f7" },
    { name: "Cereja Intenso", hex: "#f43f5e" }
  ];

  const handleSaveProfile = () => {
    onUpdatePreferences({
      userName: userName.trim() || "Yonnara Kelly",
      userEmail: userEmail.trim() || "yonnarakelly43@gmail.com",
      userPhoto,
      nyxPhoto,
    });
    setIsEditingProfile(false);
  };

  const handleSelectColor = (hex: string) => {
    onUpdatePreferences({ accentColor: hex });
  };

  return (
    <div className="flex flex-col h-full bg-black text-[#ececec] slide-in-right" id="screen-settings">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-[#222222]">
        <button 
          onClick={() => onNavigate("screen-history")}
          className="text-2xl text-gray-400 hover:text-white cursor-pointer px-1 focus:outline-none"
        >
          ✕
        </button>
        <b className="text-[17px] font-semibold text-center flex-1 pr-6">Configurações</b>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center py-4 bg-[#111] rounded-2xl border border-[#1f1f1f] p-4 relative">
          <div className="relative group cursor-pointer">
            <img 
              src={preferences.userPhoto} 
              alt={preferences.userName} 
              className="w-20 h-20 rounded-full object-cover border-2 border-[#333333] shadow-md group-hover:brightness-75 transition-all"
              referrerPolicy="no-referrer"
            />
            <div 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-full transition-all"
            >
              <Image className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <h3 className="text-lg font-bold mt-3 text-white flex items-center gap-1.5">
            {preferences.userName}
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{preferences.userEmail}</p>

          {!isEditingProfile && (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="text-xs mt-3 px-3 py-1.5 rounded-lg bg-[#222] border border-[#333] hover:bg-[#333] text-gray-300 transition-all focus:outline-none"
            >
              Editar Avatar e Nome
            </button>
          )}

          {/* Inline Profile Editor */}
          {isEditingProfile && (
            <div className="w-full mt-4 p-3 bg-black/50 border border-[#262626] rounded-xl space-y-3 text-left">
              <div>
                <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1">Nome do Usuário</label>
                <input
                  type="text"
                  className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1">Gmail cadastrado</label>
                <input
                  type="email"
                  className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1">Foto de Perfil (Seu Avatar)</label>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    {presetUserAvatars.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setUserPhoto(url)}
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${userPhoto === url ? "border-blue-500 scale-105" : "border-transparent opacity-80"}`}
                      >
                        <img src={url} className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => userPhotoInputRef.current?.click()}
                      className="px-3.5 py-2.5 h-10 rounded-xl border border-[#333] text-xs font-semibold hover:border-gray-500 transition-colors bg-black flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-400" /> Galeria...
                    </button>
                    <input
                      type="file"
                      ref={userPhotoInputRef}
                      onChange={handleUserPhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Ou cole o link da foto de perfil..."
                    value={userPhoto}
                    onChange={(e) => setUserPhoto(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1">Foto da Nyx (Companheira)</label>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    {presetNyxAvatars.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNyxPhoto(url)}
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${nyxPhoto === url ? "border-pink-500 scale-105" : "border-transparent opacity-80"}`}
                      >
                        <img src={url} className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => nyxPhotoInputRef.current?.click()}
                      className="px-3.5 py-2.5 h-10 rounded-xl border border-[#333] text-xs font-semibold hover:border-gray-500 transition-colors bg-black flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-pink-400" /> Galeria...
                    </button>
                    <input
                      type="file"
                      ref={nyxPhotoInputRef}
                      onChange={handleNyxPhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-600 outline-none"
                    placeholder="Ou cole o link da foto da Nyx..."
                    value={nyxPhoto}
                    onChange={(e) => setNyxPhoto(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 rounded-lg bg-transparent text-xs text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-3 py-1.5 rounded-lg text-white font-medium text-xs flex items-center gap-1.5 hover:brightness-110"
                  style={{ backgroundColor: preferences.accentColor }}
                >
                  <Save className="w-3.5 h-3.5" /> Salvar Alterações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section: Meu ChatGPT */}
        <div>
          <h4 className="px-1.5 pb-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Meu ChatGPT
          </h4>
          <div className="bg-[#171717] rounded-[18px] border border-[#212121] overflow-hidden">
            <div 
              onClick={() => onNavigate("screen-personalization")}
              className="px-4 py-4 flex justify-between items-center bg-[#171717] hover:bg-[#1a1a1a] transition-all cursor-pointer border-b border-[#262626]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div className="font-semibold text-[15px]">Personalização</div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="text-xs">{preferences.tone}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate("screen-memories")}
              className="px-4 py-4 flex justify-between items-center bg-[#171717] hover:bg-[#1a1a1a] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div className="font-semibold text-[15px]">Memórias</div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="text-xs">{preferences.nickname}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Conta */}
        <div>
          <h4 className="px-1.5 pb-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Instância & Estética
          </h4>
          <div className="bg-[#171717] rounded-[18px] border border-[#212121] overflow-hidden divide-y divide-[#262626]">
            
            {/* Display Email */}
            <div className="px-4 py-4 flex justify-between items-center bg-transparent">
              <span className="text-gray-400 font-semibold text-[14px]">E-mail principal</span>
              <span className="text-gray-400 text-sm font-mono truncate max-w-[200px]">{preferences.userEmail}</span>
            </div>

            {/* Display Dark Theme */}
            <div className="px-4 py-4 flex justify-between items-center bg-transparent">
              <span className="text-gray-400 font-semibold text-[14px]">Aparência</span>
              <span className="text-gray-400 text-sm">Escuro OLED</span>
            </div>

            {/* Offline Mode Toggle */}
            <div className="px-4 py-4 flex justify-between items-center bg-transparent">
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold text-[14px]">Modo Offline</span>
                <span className="text-[10px] text-gray-500">Respostas locais instantâneas</span>
              </div>
              <button 
                type="button"
                onClick={() => onUpdatePreferences({ isOfflineMode: !preferences.isOfflineMode })}
                className={`switch shrink-0 ${preferences.isOfflineMode ? "on" : ""}`}
                style={{ 
                  backgroundColor: preferences.isOfflineMode ? preferences.accentColor : "#444" 
                }}
              />
            </div>

            {/* Change Accent Color */}
            <div className="p-4 bg-transparent space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Palette className="w-4 h-4" />
                <span className="font-semibold text-[14px]">Cor de Destaque</span>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {accentColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleSelectColor(color.hex)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all focus:outline-none"
                    style={{ 
                      backgroundColor: preferences.accentColor === color.hex ? `${color.hex}15` : "#1e1e1e",
                      borderColor: preferences.accentColor === color.hex ? color.hex : "#2c2c2c",
                      color: preferences.accentColor === color.hex ? color.hex : "#9ca3af"
                    }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full block" 
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-gray-500 leading-relaxed pt-1 select-none">
                Mudando a cor de destaque, toda a interface móvel do ChatGPT Platinum, botões flutuantes, sliders e contornos recebem a nova harmonia imediatamente.
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Area */}
        <div className="pt-2">
          <button
            onClick={onResetToFactory}
            className="w-full py-4 rounded-[18px] border border-red-500/20 hover:border-red-500/50 bg-red-500/5 hover:bg-red-500/10 text-red-400 flex items-center justify-center gap-2 text-sm font-semibold transition-all focus:outline-none"
          >
            <RotateCcw className="w-4 h-4" /> Redefinir Dados Originais de Fábrica
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-3">
            Isso limpará todas as conversas e redefinirá os prompts e o ciúmes da Nyx para o estado inicial.
          </p>
        </div>

      </div>
    </div>
  );
}
