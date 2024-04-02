import { percentCompletionAtom, startTimeAtom } from '@/delivery-helper';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai/react';
import { Clock } from './Clock';

const Header = () => {
  const startTime = useAtomValue(startTimeAtom);
  const percentCompletion = useAtomValue(percentCompletionAtom);

  return (
    <div
      className="flex h-16 items-center p-5 text-black"
      style={{
        background: `linear-gradient(
              to right,
              #9ac88f ${percentCompletion}%,
              #e5e5e5 ${percentCompletion}%
            )`,
      }}
    >
      {startTime && (
        <div className="flex flex-col items-center">
          <span className="block font-bold">Start time</span>
          <span>{format(startTime, 'p')}</span>
        </div>
      )}
      <div className="flex-grow text-center text-3xl font-bold">
        <Clock />
      </div>
      {startTime && (
        <div className="flex flex-col items-center">
          <span className="block font-bold">Est. end</span>
          <span>{format(startTime + 500000, 'p')}</span>
        </div>
      )}
    </div>
  );
};

export { Header };
