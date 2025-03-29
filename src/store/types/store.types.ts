export interface CounterStore {
  count: number;
  increment: () => void;
  reset: () => void;
}