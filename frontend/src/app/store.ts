import { create } from 'zustand';

type User = { id: string; name: string; token: string };
type MatchState = { matchId?: string; gold: number; lives: number };

type Store = {
  user?: User;
  setUser: (u: User) => void;
  match: MatchState;
  setMatch: (p: Partial<MatchState>) => void;
};

export const useStore = create<Store>((set) => ({
  user: undefined,
  setUser: (u) => set({ user: u }),
  match: { gold: 100, lives: 20 },
  setMatch: (p) => set((s) => ({ match: { ...s.match, ...p } })),
}));