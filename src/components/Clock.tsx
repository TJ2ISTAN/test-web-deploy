import { currentTimeAtom } from '@/delivery-helper';
import { useAtom } from 'jotai/react';
import { useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime.toLocaleTimeString();
};

export { Clock };
