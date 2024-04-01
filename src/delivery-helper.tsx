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

// calculations like stops/hour estimates, etc, should all go in here.
