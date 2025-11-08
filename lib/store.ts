import { create } from "zustand";

export interface UserInfo {
  birthDate: string; // YYYYMMDD
  birthHour: string; // 00-23
  gender: "male" | "female";
}

export interface FortuneResult {
  today: string;
  wealth: string;
  love: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AppState {
  // User Info
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;

  // Current Page (1, 2, 3)
  currentPage: number;
  setPage: (page: number) => void;

  // Fortune Result
  fortuneResult: FortuneResult | null;
  setFortuneResult: (result: FortuneResult) => void;

  // Chat History
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;

  // Reset Store
  resetStore: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  userInfo: null,
  currentPage: 1,
  fortuneResult: null,
  chatHistory: [],

  // Actions
  setUserInfo: (info) => set({ userInfo: info }),
  setPage: (page) => set({ currentPage: page }),
  setFortuneResult: (result) => set({ fortuneResult: result }),
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChatHistory: () => set({ chatHistory: [] }),
  resetStore: () =>
    set({
      userInfo: null,
      currentPage: 1,
      fortuneResult: null,
      chatHistory: [],
    }),
}));

