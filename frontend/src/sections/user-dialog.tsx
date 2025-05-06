import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = Readonly<{
  logOut: () => void;
  phone: string | null;
}>;

export function UserDialog({ logOut, phone }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Хэрэглэгч</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Хэрэглэгчийн мэдээлэл</DialogTitle>
          <DialogDescription>Хэрэглэгчийн дугаар: {phone}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={logOut}>Гарах</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
