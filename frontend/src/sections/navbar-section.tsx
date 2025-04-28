'use client';

import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NavbarSheet } from './navbar-sheet';

export const NavbarSection = () => {
  const router = useRouter();
  return (
    <div className='container flex items-center justify-between fixed inset-0 h-20 z-50 bg-transparent backdrop-blur-sm dark:bg-[#09125a] dark:bg-opacity-50'>
      <div>
        <button onClick={() => router.push('/')}>
          <Image src='/star.png' alt='star cargoo' width={80} height={24} />
        </button>
      </div>
      <div className='flex items-center gap-6 max-lg:hidden'>
        <button
          className='text-md hover:text-[#284CE5]'
          onClick={() => router.push('/connect-address')}
        >
          Хаяг холбох
        </button>
        <button
          className='text-md hover:text-[#284CE5]'
          onClick={() => router.push('/contact')}
        >
          Холбоо барих
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
      </div>
      <div className='flex items-center gap-6 h-10'>
        <div className='lg:hidden'>
          <NavbarSheet />
        </div>
        <div className='flex items-center gap-6 h-10 max-lg:hidden'>
          <button
            className='text-md border border-black py-1 px-3 rounded-sm'
            onClick={() => router.push('/log-in')}
          >
            Нэвтрэх
          </button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
