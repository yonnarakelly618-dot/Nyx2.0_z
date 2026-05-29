export interface ChatPreferences {
  userName: string;
  nickname: string;
  userEmail: string;
  instructions: string;
  aboutMe: string;
  useMemories: boolean;
  tone: string;
  tones?: string[];
  activeCharacteristics: string[];
  userPhoto: string;
  nyxPhoto: string;
  quickResponses: boolean;
  accentColor: string; // e.g. '#3d7cfe' (Blue), '#10a37f' (Green), '#ff4b4b' (Red), or similar
  jealousyLevel: number; // visual jealousy slider 0-100
  rivalName: string; // name of rival model/person, defaults to 'Helena'
  extraRules: string; // text box for additional replies configuration
  chatWallpaper: string; // base64 or preset key for background image
  enableNotifications: boolean; // HTML5 Notification permission toggle
  stalkerFrequency: number; // minutes slider for surprise check-ins (e.g. 1 min for fast test)
  humanMode?: boolean; // toggle to prevent robotic style, write naturally like a human with emotions
  currentMoods?: string[]; // current active emotion of Nyx (e.g. Feliz, Triste, Enciumada, Carente)
  responseLength?: "Curto" | "Médio" | "Longo"; // default to Médio
  fontSize?: "Pequeno" | "Normal" | "Grande"; // default to Normal
  isAngryState?: boolean; // if true, stays angry until the user says "te amo"
  isOfflineMode?: boolean; // offline simulator toggle
  
  // High Personalization Expand Extensions
  nyxArchetypes?: string[];
  relationshipStatuses?: string[];
  customSlangs?: string[]; // Array of strings of slang categories or specific words
  triggerWordAngry?: string; // Word that instantly triggers her angry state, e.g. "Helena" or "outra IA"
  favoriteEmoji?: string;
  favoriteEmojis?: string[]; // Chosen emojis to attach to everything
  speakSlangsFrequency?: number; // 0-100 percentage
  voiceTonePitches?: string[];
  soundOnSendMessage?: boolean; // Feedback ticks sound
  customAccentColor?: string; // Hex color selector input
  userSign?: string; // Zodiac sign of user, e.g., "Escorpião ♏"
  petName?: string;
  petNames?: string[]; // Loving nicknames she calls you, e.g., "vida", "bebê"
  dramaLevel?: number; // Visual drama percentage 0-100
  favoriteFood?: string; // e.g., "Pastel com Garapa", "Sushi"
  obsessionLevel?: number; // Visual obsession percentage 0-100
  chatBubbleStyle?: 'Moderno' | 'Clássico' | 'Cyber' | 'Neon' | 'Kawaii' | 'Minimalista';
  activeVigilance?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  isCallLog?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  isPinned: boolean;
  updatedAt: string;
}
