import { useAtom, useAtomValue } from 'jotai/react';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Header } from './components/Header';
import { RemainingStopsDialog } from './components/RemainingStopsDialog';
import { StopsTable } from './components/StopsTable';
import { LoadState } from './components/file/LoadState';
import { SaveState } from './components/file/SaveState';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  State,
  currentStopAtom,
  deliveryAtom,
  hasStopsAtom,
} from './delivery-helper';

// The main UI Screen
function App() {
  const [state, setState] = useAtom<State>(deliveryAtom);

  const currentStop = useAtomValue(currentStopAtom);
  const hasStops = useAtomValue(hasStopsAtom);

  if (state.startTime === undefined) {
    return (
      <div className="m-auto max-w-screen-sm px-5">
        <div className="bg-white">
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
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-screen-sm px-5">
      <div className="bg-white">
        <Header />
        <div className="h-px bg-slate-300"></div>

        <div className="p-4">
          <Button
            variant={hasStops ? 'yellow' : 'secondary'}
            size="jumbo"
            disabled={!hasStops}
            onClick={() => {
              const time = Date.now();
              setState((state) => ({
                ...state,
                remainingStops: state.remainingStops - 1,
                completedStops: [{ time }, ...state.completedStops],
              }));
            }}
          >
            {hasStops ? `Complete Stop ${currentStop}` : 'No stops remaining'}
          </Button>
        </div>

        <div className="h-px bg-slate-300"></div>

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

        <div className="mb-5 h-px bg-slate-300"></div>

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

        <div className="flex border-t border-t-slate-300 px-5 py-2">
          <div className="mr-2">
            <LoadState onLoad={() => {}} />
          </div>
          <div>
            <SaveState state={state} />
          </div>
        </div>

        <div className="flex border-t border-t-slate-300 px-5 py-2">
          <ConfirmDialog
            titleText="Reset"
            confirmText="Reset"
            onConfirm={() => {
              setState({
                startTime: undefined,
                remainingStops: 0,
                completedStops: [],
              });
            }}
          >
            <button className="w-full rounded bg-red-500 py-2 font-bold text-white">
              Reset
            </button>
          </ConfirmDialog>
        </div>

        <div className="p-4">
          <div className="text-center text-sm text-slate-500">
            <p>
              <a
                href="https://github.com/zwazi/DeliveryHelper"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </p>
            <p id="copyright">&copy; {new Date().getFullYear()} Zwazi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
