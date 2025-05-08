'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { NavbarSheet } from './navbar-sheet';
import { useState, useEffect } from 'react';
import { UserDialog } from './user-dialog';
import { useTheme } from 'next-themes';

export const NavbarSection = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Ensure theme-dependent rendering only happens client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('token');
    setUser(null);
    setPhoneNumber(null);
    router.push('/');
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedPhone = localStorage.getItem('phoneNumber');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedPhone) setPhoneNumber(JSON.parse(storedPhone));
    } catch (error) {
      console.error('Failed to parse localStorage data:', error);
    }
  }, [path]);

  // Default classes during SSR to avoid mismatch
  const buttonClasses = mounted
    ? `text-md hover:text-[#657bdb] ${
        path === '/' && theme === 'light'
          ? 'text-white'
          : 'text-black dark:text-white'
      }`
    : 'text-md hover:text-[#657bdb] text-black'; // Fallback for SSR

  return (
    <div className='container flex items-center justify-between fixed inset-0 h-20 z-50 bg-transparent backdrop-blur-sm dark:bg-[#3c479a40] dark:bg-opacity-50'>
      <div>
        <button
          onClick={() => router.push('/')}
          aria-label='Go to homepage'
          className='text-2xl font-medium text-yellow-400'
        >
          Star Cargo
        </button>
      </div>
      <div className='flex items-center gap-6 max-lg:hidden'>
        {user && (
          <button
            className={buttonClasses}
            onClick={() => router.push('/information')}
          >
            Захиалгууд
          </button>
        )}
        <button
          className={buttonClasses}
          onClick={() => router.push('/connect-address')}
        >
          Хаяг холбох
        </button>
        <button
          className={buttonClasses}
          onClick={() => router.push('/service-situation')}
        >
          Санамж
        </button>
        <button
          className={buttonClasses}
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
