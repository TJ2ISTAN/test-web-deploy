import { useAtom, useAtomValue } from 'jotai/react';
import { Divider } from './components/Divider';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { RemainingStopsDialog } from './components/RemainingStopsDialog';
import { Start } from './components/Start';
import { StopsTable } from './components/StopsTable';
import { Button } from './components/ui/button';
import {
  State,
  currentStopAtom,
  deliveryAtom,
  hasStopsAtom,
} from './delivery-helper';
import { CompleteStopButton } from './components/CompleteStopButton';

// The main UI Screen
function App() {
  const [state, setState] = useAtom<State>(deliveryAtom);

  const currentStop = useAtomValue(currentStopAtom);
  const hasStops = useAtomValue(hasStopsAtom);

  if (state.startTime === undefined) {
    return (
      <div className="m-auto max-w-screen-sm px-5">
        <div className="bg-white">
          <Start />
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-screen-sm px-5">
      <div className="bg-white">
        <Header />

        <Divider />

        <div className="p-4">
          <CompleteStopButton />
        </div>

        <Divider />

        <div className="flex items-center justify-between p-5 text-xl font-bold">
          <span>
            {state.remainingStops}{' '}
            {state.remainingStops === 1 ? 'stop' : 'stops'} remaining
          </span>
          <RemainingStopsDialog
            remainingStops={state.remainingStops}
            onSubmit={(remainingStops) => {
              setState((state) => ({
                ...state,
                remainingStops,
              }));
            }}
          />
        </div>

        <Divider className="mb-5" />

        <div className="p-4">
          <StopsTable
            stops={state.completedStops}
            onDelete={(index) => {
              setState((state) => ({
                ...state,
                completedStops: state.completedStops.filter(
                  (_, i) => i !== index,
                ),
              }));
            }}
          />
        </div>

        <Divider />

        <Footer />
      </div>
    </div>
  );
}

export default App;
