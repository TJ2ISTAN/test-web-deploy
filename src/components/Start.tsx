import { deliveryAtom, hasStopsAtom } from '@/delivery-helper';
import { useAtom, useAtomValue } from 'jotai/react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Start = () => {
  const [state, setState] = useAtom(deliveryAtom);
  const hasStops = useAtomValue(hasStopsAtom);
  return (
    <>
      <div className="p-4">
        <Input
          id="remaining-stops"
          type="number"
          placeholder="Number of stops"
          onChange={(e) => {
            setState({
              startTime: undefined,
              remainingStops: parseInt(e.target.value),
              completedStops: [],
            });
          }}
        />
      </div>
      <div className="p-4">
        <Button
          variant={hasStops ? 'yellow' : 'secondary'}
          size="jumbo"
          disabled={!hasStops}
          onClick={() => {
            setState({
              startTime: Date.now(),
              remainingStops: state.remainingStops,
              completedStops: state.completedStops,
            });
          }}
        >
          Start
        </Button>
      </div>
    </>
  );
};

export { Start };
