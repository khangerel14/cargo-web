'use client';

import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { NavbarSheet } from './navbar-sheet';
import { useState, useEffect } from 'react';
import { UserDialog } from './user-dialog';

export const NavbarSection = () => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('token');
    setUser(null);
    setPhoneNumber(null);
    router.push('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPhone = localStorage.getItem('phoneNumber');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedPhone) {
      setPhoneNumber(JSON.parse(storedPhone));
    }
  }, [path]);

  return (
    <div className='container flex items-center justify-between fixed inset-0 h-20 z-50 bg-transparent backdrop-blur-sm dark:bg-[#3c479a40] dark:bg-opacity-50'>
      <div>
        <button onClick={() => router.push('/')}>
          <Image src='/star.png' alt='star cargoo' width={80} height={24} />
        </button>
      </div>
      <div className='flex items-center gap-6 max-lg:hidden'>
        {user && (
          <button
            className='text-md hover:text-[#657bdb]'
            style={{
              textDecoration: path === 'information' ? '#284CE5' : 'black',
            }}
            onClick={() => router.push('/information')}
          >
            Захиалгууд
          </button>
        )}
        <button
          className='text-md hover:text-[#657bdb]'
          style={{
            textDecoration: path === 'connect-address' ? '#284CE5' : 'black',
          }}
          onClick={() => router.push('/connect-address')}
        >
          Хаяг холбох
        </button>
        <button
          className='text-md hover:text-[#657bdb]'
          style={{
            textDecoration: path === 'service-situation' ? '#284CE5' : 'black',
          }}
          onClick={() => router.push('/service-situation')}
        >
          Санамж
        </button>
        <button
          className='text-md hover:text-[#657bdb]'
          style={{
            textDecoration: path === '/link-order' ? '#284CE5' : 'black',
          }}
          onClick={() => router.push('/link-order')}
        >
          Линк захиалага
        </button>
      </div>
      <div className='flex items-center gap-6 h-10'>
        <div className='lg:hidden'>
          <NavbarSheet logOut={handleLogout} phone={phoneNumber} user={user} />
        </div>
        <div className='flex items-center gap-6 h-10 max-lg:hidden'>
          {!user ? (
            <button
              className='text-md border border-black py-1 px-3 rounded-sm'
              onClick={() => router.push('/log-in')}
            >
              Нэвтрэх
            </button>
          ) : (
            user && <UserDialog logOut={handleLogout} phone={phoneNumber} />
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
