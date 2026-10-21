// Sauvegarde locale des scores et de la progression (localStorage, aucun compte).

const KEY = "modelquest:scores:v1";

export interface LevelRecord {
  good: number;
  total: number;
  date: string;
}

export interface ScoreState {
  quizBest: { score: number; max: number; date: string } | null;
  quizRuns: number;
  parcoursUnlocked: number;
  parcoursBest: Record<number, LevelRecord>;
}

const DEFAULT_STATE: ScoreState = {
  quizBest: null,
  quizRuns: 0,
  parcoursUnlocked: 1,
  parcoursBest: {},
};

export function loadScores(): ScoreState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ScoreState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function save(state: ScoreState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // stockage plein ou indisponible : on ignore silencieusement
  }
}

export function recordQuizRun(score: number, max: number): ScoreState {
  const state = loadScores();
  state.quizRuns += 1;
  if (!state.quizBest || score > state.quizBest.score) {
    state.quizBest = { score, max, date: new Date().toISOString() };
  }
  save(state);
  return state;
}

export function recordLevelResult(
  levelId: number,
  good: number,
  total: number,
  passed: boolean,
): ScoreState {
  const state = loadScores();
  const prev = state.parcoursBest[levelId];
  if (!prev || good > prev.good) {
    state.parcoursBest[levelId] = { good, total, date: new Date().toISOString() };
  }
  if (passed && levelId >= state.parcoursUnlocked) {
    state.parcoursUnlocked = Math.min(levelId + 1, 99);
  }
  save(state);
  return state;
}

export function resetScores(): ScoreState {
  save(DEFAULT_STATE);
  return DEFAULT_STATE;
}
