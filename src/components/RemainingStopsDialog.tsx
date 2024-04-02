import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

const RemainingStopsDialog = ({
  remainingStops,
  onSubmit,
}: {
  remainingStops: number;
  onSubmit: (remainingStops: number) => void;
}) => {
  const [value, setValue] = useState(remainingStops);

  useEffect(() => {
    setValue(remainingStops);
  }, [remainingStops]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit remaining stops</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            id="remaining-stops"
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
          />
        </div>
        <DialogFooter className="flex flex-row justify-end">
          <DialogClose asChild className="mr-2">
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onSubmit(value)}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { RemainingStopsDialog };
