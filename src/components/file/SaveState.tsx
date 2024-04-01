import { State } from '@/delivery-helper';
import { Button } from '../ui/button';

const SaveState = ({ state }: { state: State }) => {
  const handleClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, '');
    const name = `Delivery Helper - ${formattedDate} ${formattedTime}.json`;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(state, null, 2)], {
        type: 'application/json',
      }),
    );

    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    link.remove();
  };

  return (
    <Button variant="default" onClick={handleClick}>
      Save data to file
    </Button>
  );
};

export { SaveState };
