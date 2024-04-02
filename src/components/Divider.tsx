import { cn } from '@/lib/utils';

const Divider = ({ className }: { className?: string }) => (
  <div className={cn('h-px bg-slate-300', className)} />
);

export { Divider };
