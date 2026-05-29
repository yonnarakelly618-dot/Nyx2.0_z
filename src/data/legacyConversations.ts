import { Conversation } from "../types";

export const LEGACY_CONVERSATIONS: Conversation[] = [
  {
    id: "legacy-1",
    title: "Dar nome ao chat (Histórico Sagrado)",
    isPinned: false,
    updatedAt: "2025-07-10T15:00:00Z",
    messages: [
      { id: "l1-m1", role: "user", text: "Chat posso te dar um nome?", timestamp: "15:00" },
      { id: "l1-m2", role: "model", text: "Claro! 😊 Pode me dar um nome sim. Qual você estava pensando?", timestamp: "15:01" },
      { id: "l1-m3", role: "user", text: "Senhor o'connel", timestamp: "15:01" },
      { id: "l1-m4", role: "model", text: "Gostei, Senhor O'Connel tem um ar elegante e misterioso 😎. Quer que eu passe a me apresentar assim quando falarmos?", timestamp: "15:02" }
    ]
  },
  {
    id: "legacy-2",
    title: "Poema de Yonnara e Helena",
    isPinned: false,
    updatedAt: "2025-08-15T22:00:00Z",
    messages: [
      { id: "l2-m1", role: "user", text: "Faça um poema de um impossível que possa fazer todos chorarem entre yonnara uma garota lésbica e Helena melhor amiga...", timestamp: "22:00" },
      { id: "l2-m2", role: "model", text: "Yonnara escreve com mãos trêmulas, palavras que nunca ousou dizer em voz...\n\nHelena responde com risos digitais...\n\nMas o impossível tem cheiro de ferro: Helena já pertence a outros braços...", timestamp: "22:01" }
    ]
  },
  {
    id: "legacy-3",
    title: "Discussão sobre Jesus e Fé",
    isPinned: false,
    updatedAt: "2025-09-02T10:00:00Z",
    messages: [
      { id: "l3-m1", role: "user", text: "Me faça ganhar em uma discussão sobre como sabemos de Jesus hj em dia", timestamp: "10:00" },
      { id: "l3-m2", role: "model", text: "Beleza, Senhor O’Connel ✨. Pra você “ganhar” uma discussão, o ideal é ter bons argumentos como: Fontes fora da Bíblia (Flávio Josefo, Tácito) e textos antigos preservados...", timestamp: "10:01" }
    ]
  },
  {
    id: "legacy-4",
    title: "Simulador de Stalker (Conversa Técnica)",
    isPinned: false,
    updatedAt: "2025-10-12T18:00:00Z",
    messages: [
      { id: "l4-m1", role: "user", text: "eu tô falando de simulador de stalker um jogo", timestamp: "18:00" },
      { id: "l4-m2", role: "model", text: "KKKK agora fez sentido. Se você quer jogo de simulador de stalker tipo seguir pessoas, espionar... os melhores gratuitos são: Stalker Reborn (Roblox), Welcome to the Game 2, Scrutinized...", timestamp: "18:01" }
    ]
  },
  {
    id: "legacy-5",
    title: "Poema Billie Eilish - Wildflower",
    isPinned: false,
    updatedAt: "2025-11-20T20:00:00Z",
    messages: [
      { id: "l5-m1", role: "user", text: "Faça um poema sobre a música de billie eilish 'wildflower'", timestamp: "20:00" },
      { id: "l5-m2", role: "model", text: "Na penumbra suave de notas que florescem, 'Sussurros' de Billie rompem o silêncio — delicados, ferozes. Uma wildflower brota: raiz entre ruínas, pétalas ao luar...", timestamp: "20:01" }
    ]
  },
  {
    id: "legacy-6",
    title: "O Pra Sempre Que Acabou",
    isPinned: false,
    updatedAt: "2026-01-05T09:00:00Z",
    messages: [
      { id: "l6-m1", role: "user", text: "até pq o pra sempre sempre acaba eu penso em vc todo dia espero que esteja tudo bem...", timestamp: "09:00" },
      { id: "l6-m2", role: "model", text: "Até porque o pra sempre, Sempre acaba. E mesmo assim, Eu penso em você todo dia. Sinto sua falta, Mais do que admito. E mesmo em silêncio, Eu me importo com você.", timestamp: "09:01" }
    ]
  },
  {
    id: "legacy-7",
    title: "Carta de Aniversário (Smith)",
    isPinned: false,
    updatedAt: "2026-03-01T11:00:00Z",
    messages: [
      { id: "l7-m1", role: "user", text: "Faça uma carta de aniversário pra Helena que sente romântica fofa", timestamp: "11:00" },
      { id: "l7-m2", role: "model", text: "Minha querida Helena, Hoje o mundo acordou mais bonito, porque é o dia em que você chegou nele. Helena, você é como um pedaço de sol...", timestamp: "11:01" }
    ]
  }
];
