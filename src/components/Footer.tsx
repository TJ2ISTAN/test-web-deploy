import { deliveryAtom } from '@/delivery-helper';
import { useAtom } from 'jotai/react';
import { ConfirmDialog } from './dialog/ConfirmDialog';
import { LoadState } from './file/LoadState';
import { SaveState } from './file/SaveState';
import { Divider } from './Divider';

const Footer = () => {
  const [state, setState] = useAtom(deliveryAtom);

  return (
    <>
      <div className="flex px-5 py-2">
        <div className="mr-2">
          <LoadState onLoad={() => {}} />
        </div>
        <div>
          <SaveState state={state} />
        </div>
      </div>

      <Divider />

      <div className="flex px-5 py-2">
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
    </>
  );
};

export { Footer };
