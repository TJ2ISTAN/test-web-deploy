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

export const currentTimeAtom = atom(new Date());

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

export const secondsSinceLastStopAtom = atom((get) => {
  const state = get(deliveryAtom);
  const lastStop = state.completedStops[0];
  if (!lastStop) {
    return 0;
  }

  return (get(currentTimeAtom).valueOf() - lastStop.time) / 1000;
});

export const minutesSinceLastStopAtom = atom((get) => {
  return get(secondsSinceLastStopAtom) / 60;
});

export const isWithinTimeLimitAtom = atom((get) => {
  const minutesSinceLastStop = get(minutesSinceLastStopAtom);
  return minutesSinceLastStop < 15;
});

// calculations like stops/hour estimates, etc, should all go in here.
