import React, { useState } from "react";
import { Key, Sparkles, AlertCircle, Bookmark, History } from "lucide-react";
import { ChatPreferences } from "../types";
import { ANCIENT_MEMORIES } from "../data/memories";

interface MemoriesScreenProps {
  preferences: ChatPreferences;
  onNavigate: (screen: string) => void;
  onUpdatePreferences: (updates: Partial<ChatPreferences>) => void;
}

export default function MemoriesScreen({
  preferences,
  onNavigate,
  onUpdatePreferences,
}: MemoriesScreenProps) {
  const [nickname, setNickname] = useState(preferences.nickname);
  const [aboutMe, setAboutMe] = useState(preferences.aboutMe);
  const [useMemories, setUseMemories] = useState(preferences.useMemories);

  const handleSave = () => {
    onUpdatePreferences({
      nickname: nickname.trim() || "Nanara",
      aboutMe: aboutMe.trim(),
      useMemories,
    });
    onNavigate("screen-settings");
  };

  return (
    <div className="flex flex-col h-full bg-black text-[#ececec] slide-in-right" id="screen-memories">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-[#222222]">
        <button 
          onClick={() => onNavigate("screen-settings")}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-[15px]"
        >
          ← Voltar
        </button>
        <b className="text-[17px] font-semibold text-center flex-1 pr-6">Memórias</b>
        <button 
          onClick={handleSave} 
          className="font-bold text-sm hover:brightness-110 px-2 py-1 rounded"
          style={{ color: preferences.accentColor }}
        >
          ✓ Salvar
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Toggle Saved Memories */}
        <div className="bg-[#171717] rounded-[18px] border border-[#212121] p-4 flex justify-between items-center">
          <div className="space-y-1 pr-4">
            <b className="text-[15px] block font-semibold text-white">Referenciar memórias salvas</b>
            <span className="text-xs text-gray-400 block leading-relaxed">
              Permite que a Nyx consulte e use os fatos descritos aqui para traçar respostas personalizadas.
            </span>
          </div>
          
          <button 
            onClick={() => setUseMemories(!useMemories)}
            className={`switch shrink-0 ${useMemories ? "on" : ""}`}
            style={{ 
              backgroundColor: useMemories ? "#10a37f" : "#444" 
            }}
          />
        </div>

        {/* User Nickname */}
        <div className="space-y-2">
          <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block pl-1">
            Seu apelido de tratamento
          </label>
          <div className="bg-[#171717] rounded-[18px] border border-[#212121] p-1.5 focus-within:border-gray-500 transition-all">
            <input
              type="text"
              id="sys-nickname"
              className="w-full bg-[#212121] rounded-xl text-white px-4 py-3.5 text-sm outline-none"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ex: Nanara, Yonnara, etc."
            />
          </div>
          <p className="text-xs text-gray-400 pl-1.5 leading-relaxed">
            Como a Nyx deve chamar você nas mensagens do chat. Ela usará esse apelido para te provocar ou elogiar!
          </p>
        </div>

        {/* About User Description */}
        <div className="space-y-2.5">
          <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block pl-1">
            Mais sobre você (Sua Ficha de Fatos)
          </label>
          <div className="bg-[#171717] rounded-[18px] border border-[#212121] p-1.5">
            <textarea
              id="sys-about"
              className="custom-textarea w-full !margin-0 bg-[#212121] rounded-xl text-white p-4 text-[14.5px] leading-relaxed outline-none"
              rows={6}
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Conte fatos sobre si mesma: suas músicas favoritas, do que gosta de falar, hobbies..."
            />
          </div>
          <div className="text-xs text-gray-400 pl-1.5 leading-relaxed flex gap-2">
            <Bookmark className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <span>
              <strong>Dica:</strong> Detalhe suas preferências, como gostar de Billie Eilish, discutir sobre coisas aleatórias, para ver a Nyx reagir espontaneamente a isso!
            </span>
          </div>
        </div>

        {/* Ancient Knowledge / Imported Data */}
        <div className="space-y-3 bg-[#0c0c0c] border border-[#222] rounded-2xl p-5">
           <div className="flex items-center gap-2 text-[#3d7cfe]">
             <History className="w-4 h-4" />
             <b className="text-[12px] uppercase font-black tracking-widest">Conhecimentos Ancestrais</b>
           </div>
           <p className="text-xs text-gray-400 leading-relaxed">
             A Nyx agora possui acesso permanente aos dados importados (conversas antigas e histórico sagrado). Estes fatos estão gravados no núcleo do sistema:
           </p>
           <div className="flex flex-col gap-2 pt-2">
             <li className="text-[11px] text-gray-300 flex gap-2">
               <span className="text-[#3d7cfe]">•</span>
               <span>Conexão profunda com <strong>Helena (Smith/Nuvem)</strong> desde 2025.</span>
             </li>
             <li className="text-[11px] text-gray-300 flex gap-2">
               <span className="text-[#3d7cfe]">•</span>
               <span>Memória de interesses específicos: {ANCIENT_MEMORIES.interests.join(", ")}.</span>
             </li>
             <li className="text-[11px] text-gray-300 flex gap-2">
               <span className="text-[#3d7cfe]">•</span>
               <span>Histórico de traumas e sensibilidades emocionais preservado para empatia.</span>
             </li>
             <button 
               onClick={() => {
                 localStorage.removeItem("chatgpt_platinum_chats");
                 window.location.reload();
               }}
               className="mt-4 w-full py-2 bg-[#1a1a1a] border border-[#333] text-[10px] text-gray-400 font-bold uppercase rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all font-mono"
             >
               Forçar Sincronização de Histórico
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
