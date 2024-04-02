import {
  currentStopAtom,
  deliveryAtom,
  hasStopsAtom,
  secondsSinceLastStopAtom,
} from '@/delivery-helper';
import { useAtomValue, useSetAtom } from 'jotai/react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from './ui/button';

const CompleteStopButton = () => {
  const setState = useSetAtom(deliveryAtom);

  const currentStop = useAtomValue(currentStopAtom);
  const hasStops = useAtomValue(hasStopsAtom);
  const secondsSinceLastStop = useAtomValue(secondsSinceLastStopAtom);
  const requireDialog = secondsSinceLastStop < 10;

  const handleClick = (confirmed: boolean = false) => {
    if (requireDialog && !confirmed) return;

    setState((state) => ({
      ...state,
      remainingStops: state.remainingStops - 1,
      completedStops: [{ time: Date.now() }, ...state.completedStops],
    }));
  };

  const button = (
    <Button
      variant={hasStops ? 'yellow' : 'secondary'}
      size="jumbo"
      disabled={!hasStops}
      onClick={() => handleClick(false)}
    >
      {hasStops ? `Complete Stop ${currentStop}` : 'No stops remaining'}
    </Button>
  );

  return secondsSinceLastStop < 10 ? (
    <ConfirmDialog
      titleText="Less than 10 seconds since last stop"
      confirmText="Complete stop anyway"
      onConfirm={() => handleClick(true)}
    >
      {button}
    </ConfirmDialog>
  ) : (
    button
  );
};

export { CompleteStopButton };
