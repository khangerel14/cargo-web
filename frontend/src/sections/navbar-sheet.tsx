'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { UserDialog } from './user-dialog';

type Props = Readonly<{
  logOut: () => void;
  phone: string | null;
  user: string | null;
}>;

export function NavbarSheet({ logOut, phone, user }: Props) {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <Icon icon='ant-design:more-outlined' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className='hidden'></SheetTitle>
        <SheetHeader>
          <div className='flex items-start flex-col gap-6'>
            {!user ? (
              <button
                className='text-md border border-black py-1 px-3 rounded-sm'
                onClick={() => router.push('/log-in')}
              >
                Нэвтрэх
              </button>
            ) : (
              <UserDialog logOut={logOut} phone={phone} />
            )}
            <button
              className='text-md hover:text-[#284CE5]'
              onClick={() => router.push('/connect-address')}
            >
              Хаяг холбох
            </button>
            <button
              className='text-md hover:text-[#284CE5]'
              onClick={() => router.push('/service-situation')}
            >
              Санамж
            </button>
            <button
              className='text-md hover:text-[#284CE5]'
              onClick={() => router.push('/link-order')}
            >
              Линк захиалага
            </button>
            <ModeToggle />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
