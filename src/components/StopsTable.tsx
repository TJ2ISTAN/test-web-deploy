import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Stop } from '@/delivery-helper';
import { ConfirmDialog } from './dialog/ConfirmDialog';
import { Button } from './ui/button';

const StopsTable = ({
  stops,
  // onEdit,
  onDelete,
}: {
  stops: Stop[];
  onEdit?: (index: number, stop: Stop) => void;
  onDelete?: (index: number) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-right font-bold">#</TableHead>
          <TableHead className="font-bold">Time</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stops.map((stop, index) => (
          <TableRow key={index}>
            <TableCell className="text-right font-medium">
              {stops.length - index}
            </TableCell>
            <TableCell>{new Date(stop.time).toLocaleTimeString()}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {/* Todo: Edit dialog */}
                {onDelete && (
                  <ConfirmDialog
                    titleText="Delete stop"
                    confirmText="Delete"
                    trigger={
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    }
                    onConfirm={() => onDelete(index)}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StopsTable;
