'use client';

import { useCallback, useEffect, useState } from 'react';
import { ROLE } from '../../types/common';
import { UserTable } from './user-table';
import { AdminTable } from './admin-table';

export const InformationSection = () => {
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/users/user?phoneNumber=${encodeURIComponent(phoneNumber)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const formattedData = Array.isArray(data) ? data : data ? [data] : [];
      console.log(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='bg-[#EAEBFA] py-20 flex flex-col gap-10 items-center w-full min-h-screen pt-40 max-lg:px-5 dark:bg-[#070845]'>
      <h1 className='font-semibold text-2xl text-center'>
        Таны бүтээгдэхүүний мэдээлэл
      </h1>
      <div className='w-full md:w-[900px] flex flex-col gap-5'>
        {error && <p className='text-red-500'>{error}</p>}
        {userRole === ROLE.USER ? (
          <UserTable phoneNumber={phoneNumber} />
        ) : (
          <AdminTable />
        )}
      </div>
    </div>
  );
};
