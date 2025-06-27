'use client';

import { useEffect, useState } from 'react';
import { ROLE } from '../../types/common';
import { UserTable } from './user-table';
import { AdminTable } from './admin-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArchivedTable } from './archived-table';
import Image from 'next/image';

export const InformationSection = () => {
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('user');
      const storedPhone = localStorage.getItem('phoneNumber');

      if (storedPhone) {
        try {
          const parsedPhone = JSON.parse(storedPhone);
          if (typeof parsedPhone === 'string' && /^\+?\d+$/.exec(parsedPhone)) {
            setPhoneNumber(parsedPhone);
          } else {
            setError('Invalid phone number format.');
          }
        } catch (err) {
          console.error('Error parsing localStorage data:', err);
          setError('Failed to load phone number.');
        }
      }

      if (storedRole) {
        setUserRole(JSON.parse(storedRole));
      }
    } catch (err) {
      console.error('Error parsing localStorage data:', err);
      setError('Failed to load user data. Please try again.');
    }
  }, []);

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='relative'>
      <Image
        src='/image.jpg'
        width={1000}
        height={1000}
        alt='bg'
        className='w-full min-h-screen h-fit object-cover z-10'
      />
      <div className='absolute top-0 left-0 right-0 py-20 flex flex-col gap-10 items-center w-full pt-40 max-lg:px-5'>
        <h1 className='font-semibold text-2xl text-center text-white'>
          Таны бүтээгдэхүүний мэдээлэл
        </h1>
        <div className='w-full md:w-[1000px] flex flex-col gap-5'>
          {error && <p className='text-red-500'>{error}</p>}
          {userRole === ROLE.USER ? (
            <Tabs defaultValue='product'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='product'>Бүтээгдэхүүн</TabsTrigger>
                <TabsTrigger value='archive'>Архивласан</TabsTrigger>
              </TabsList>
              <TabsContent value='product'>
                <UserTable phoneNumber={phoneNumber} />
              </TabsContent>
              <TabsContent value='archive'>
                <ArchivedTable userRole={userRole} phoneNumber={phoneNumber} />
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs defaultValue='product'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='product'>Бүтээгдэхүүн</TabsTrigger>
                <TabsTrigger value='archive'>Архивласан</TabsTrigger>
              </TabsList>
              <TabsContent value='product'>
                <AdminTable />
              </TabsContent>
              <TabsContent value='archive'>
                <ArchivedTable userRole={userRole} phoneNumber={phoneNumber} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};
