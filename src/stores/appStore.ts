import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentModule: string | null;
  setCurrentModule: (moduleId: string | null) => void;
  completedModules: string[];
  completeModule: (moduleId: string) => void;
  assessmentScores: Record<string, number>;
  setAssessmentScore: (assessmentId: string, score: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: true, // Default to dark mode as per requirements
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      currentModule: null,
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      completedModules: [],
      completeModule: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
      assessmentScores: {},
      setAssessmentScore: (assessmentId, score) =>
        set((state) => ({
          assessmentScores: { ...state.assessmentScores, [assessmentId]: score },
        })),
    }),
    {
      name: 'lab-intelligence-storage',
    }
  )
);
