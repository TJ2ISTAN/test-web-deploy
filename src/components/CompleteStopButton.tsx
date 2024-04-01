const CompleteStopButton = ({
  currentStop,
  remainingStops,
  onClick,
}: {
  currentStop: number;
  remainingStops: number;
  onClick: () => void;
}) =>
  remainingStops > 0 ? (
    <button
      className="block w-full rounded bg-yellow-300 py-8 text-3xl font-bold text-black hover:bg-yellow-400 active:bg-yellow-500"
      onClick={onClick}
    >
      Complete Stop {currentStop}
    </button>
  ) : (
    <button className="block w-full rounded bg-gray-400 py-8 text-3xl font-bold text-gray-500">
      No stops remaining
    </button>
  );

export { CompleteStopButton };
