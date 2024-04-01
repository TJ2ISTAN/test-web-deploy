import { State } from '@/delivery-helper';
import { useRef } from 'react';
import { Button } from '../ui/button';

const LoadState = ({ onLoad }: { onLoad: (data: State) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result as string);
        console.log(data);
        onLoad(data);
      };

      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFile}
      />
      <Button variant="default" onClick={() => inputRef.current?.click()}>
        Load data from file
      </Button>
    </>
  );
};

export { LoadState };
