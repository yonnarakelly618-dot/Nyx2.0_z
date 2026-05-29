import React, { useState, useRef, useEffect } from "react";
import { Search, Pin, MessageSquare, Trash2, Edit2, Check, BadgeInfo, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Conversation, ChatPreferences } from "../types";

interface HistoryScreenProps {
  conversations: Conversation[];
  preferences: ChatPreferences;
  onNavigate: (screen: string) => void;
  onSelectConversation: (id: string) => void;
  onStartNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onTogglePinConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
}

export default function HistoryScreen({
  conversations,
  preferences,
  onNavigate,
  onSelectConversation,
  onStartNewChat,
  onDeleteConversation,
  onTogglePinConversation,
  onRenameConversation,
}: HistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const startPress = (id: string) => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setMenuOpenId(id);
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }, 500);
  };

  const endPress = (id: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    const wasMenuOpen = !!menuOpenId;
    if (menuOpenId) setMenuOpenId(null);

    // If it was a long press, we already opened the menu in startPress/timer
    if (isLongPress.current) return;

    // If we are editing, let the form handles things
    if (editingId) return;

    // Normal click: select the conversation
    // Even if menu was open for another chat, we should probably select this one if it's a quick tap
    onSelectConversation(id);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredConversations.filter((c) => c.isPinned);
  const recentChats = filteredConversations.filter((c) => !c.isPinned);

  const handleStartRename = (e: React.MouseEvent, id: string, originTitle: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(originTitle);
    setMenuOpenId(null);
  };

  const handleSaveRename = (e: React.FormEvent | React.FocusEvent, id: string) => {
    if (e.type === "submit") e.preventDefault();
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const renderChatItem = (chat: Conversation) => (
    <div
      key={chat.id}
      onMouseDown={(e) => {
        if (editingId) return;
        startPress(chat.id);
      }}
      onMouseUp={(e) => {
        if (editingId) return;
        endPress(chat.id);
      }}
      onMouseLeave={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onTouchStart={(e) => {
        if (editingId) return;
        startPress(chat.id);
      }}
      onTouchEnd={(e) => {
        if (editingId) return;
        endPress(chat.id);
      }}
      className={`group relative px-4 py-3.5 mx-2 rounded-xl flex items-center gap-3.5 transition-all cursor-pointer border border-transparent select-none active:scale-[0.98]
        ${menuOpenId === chat.id ? "bg-[#1c1c1c] border-[#333]" : "hover:bg-[#171717] hover:border-[#262626]"}
      `}
    >
      <div className="w-9 h-9 rounded-full bg-[#1c1c1c] border border-[#2d2d2d] flex items-center justify-center text-sm font-semibold shrink-0">
        💬
      </div>
      <div className="flex-1 min-w-0">
        {editingId === chat.id ? (
          <form 
            onClick={(e) => e.stopPropagation()} 
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onSubmit={(e) => handleSaveRename(e, chat.id)}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              className="flex-1 bg-[#262626] border border-[#444] text-white px-2 py-1 rounded text-sm outline-none w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setEditingId(null);
              }}
              autoFocus
            />
            <button type="submit" className="text-green-500 p-1 hover:bg-green-500/10 rounded"><Check className="w-4 h-4" /></button>
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                setEditingId(null);
              }}
              className="text-red-500 p-1 hover:bg-red-500/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="font-medium text-[14.5px] text-[#ececec] truncate">
            {chat.title}
          </div>
        )}
        <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
          <span>{chat.messages.length} msg{chat.messages.length !== 1 && "s"}</span>
          <span>•</span>
          <span>{new Date(chat.updatedAt).toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>

      <AnimatePresence>
        {menuOpenId === chat.id && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpenId(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-[280px] bg-[#1c1c1c] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[#333]">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Nyx Options</p>
                <p className="text-white text-sm font-bold truncate">{chat.title}</p>
              </div>
              
              <div className="p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePinConversation(chat.id);
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#ececec] hover:bg-[#2c2c2c] transition-colors rounded-lg"
                >
                  <Pin className={`w-4 h-4 ${chat.isPinned ? "text-[#3d7cfe] fill-current" : "text-gray-400"}`} />
                  {chat.isPinned ? "Desafixar" : "Fixar"}
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartRename(e, chat.id, chat.title);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#ececec] hover:bg-[#2c2c2c] transition-colors rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                  Renomear
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(chat.id);
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenId(null);
                }}
                className="w-full py-3 bg-[#262626] text-xs font-bold text-gray-400 hover:text-white transition-colors border-t border-[#333]"
              >
                FECHAR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {chat.isPinned && <Pin className="w-3 h-3 text-[#3d7cfe] fill-current opacity-60 shrink-0" />}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-black text-[#ececec] overflow-hidden" id="screen-history">
      <header className="px-5 py-4 flex items-center justify-between border-b border-[#222222] shrink-0">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
            style={{ backgroundColor: preferences.accentColor }}
          >
            N
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white">
            NYX Platinum
          </span>
        </div>
        
        <button 
          onClick={() => onNavigate("screen-settings")}
          className="w-9 h-9 rounded-full overflow-hidden border border-[#333] hover:border-gray-400 transition-all"
        >
          <img src={preferences.userPhoto} alt="User" className="w-full h-full object-cover" />
        </button>
      </header>

      <div className="px-4 py-4 shrink-0">
        <div className="relative flex items-center bg-[#171717] border border-[#262626] rounded-xl focus-within:border-gray-500 transition-all">
          <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm placeholder-gray-500 text-white outline-none"
            placeholder="Pesquisar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {pinnedChats.length > 0 && (
          <div className="mb-4">
            <h2 className="px-5 py-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Pin className="w-3 h-3 text-[#3d7cfe]" /> Fixados
            </h2>
            <div className="space-y-0.5">
              {pinnedChats.map(renderChatItem)}
            </div>
          </div>
        )}

        <div>
          <h2 className="px-5 py-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Conversas Recentes
          </h2>
          {recentChats.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm italic px-10">
              Inicie uma conversa com a Nyx para começar sua jornada! 🌸
            </div>
          ) : (
            <div className="space-y-0.5">
              {recentChats.map(renderChatItem)}
            </div>
          )}
        </div>

        <div className="m-4 p-4 rounded-xl border border-dashed border-[#333] bg-[#0c0c0c] text-xs text-gray-400 flex gap-3">
          <BadgeInfo className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-300">Acesso Rápido</p>
            <p className="mt-1 leading-relaxed">
              Pressione e segure uma conversa para ver as opções de fixar, renomear ou excluir.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onStartNewChat}
        className="fab active:scale-95 transition-all text-sm gap-2 shadow-2xl"
        style={{ backgroundColor: preferences.accentColor }}
      >
        <span>📝</span> Nova Conversa
      </button>
    </div>
  );
}
