import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai/vanilla';

export type Stop = {
  time: number;
  latitude?: number;
  longitude?: number;
};

export type State = {
  startTime?: number;
  remainingStops: number;
  completedStops: Stop[];
};

export const deliveryAtom = atomWithStorage<State>('deliveryState', {
  startTime: undefined,
  remainingStops: 0,
  completedStops: [],
});

export const startTimeAtom = atom((get) => get(deliveryAtom).startTime);

export const currentStopAtom = atom(
  (get) => get(deliveryAtom).completedStops.length + 1,
);

export const remainingStopsAtom = atom(
  (get) => get(deliveryAtom).remainingStops,
);

export const hasStopsAtom = atom((get) => get(remainingStopsAtom) > 0);

export const percentCompletionAtom = atom((get) => {
  const state = get(deliveryAtom);
  return (
    (state.completedStops.length /
      (state.completedStops.length + state.remainingStops)) *
    100
  );
});

// calculations like stops/hour estimates, etc, should all go in here.
