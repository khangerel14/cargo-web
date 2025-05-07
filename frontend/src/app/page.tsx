'use client';

import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card';
import { FooterSection } from '@/sections/footer-section';
import { useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState<
    { phoneNumber: string; trackingCode: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSearch = async ({ phoneNumber }: { phoneNumber: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/user/home?phoneNumber=${phoneNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const formattedData = Array.isArray(data) ? data : data ? [data] : [];
      setUserData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error}`);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='bg-[#dddff7] dark:bg-[#1a1a2e] text-gray-800 dark:text-gray-200 h-screen'>
        <main className='flex items-center justify-between pt-56 space-y-24 h-fit max-w-[950px] mx-auto gap-20 max-lg:flex-col'>
          <div className='flex flex-col items-center justify-center mx-5 text-center'>
            <h1 className='text-4xl font-bold text-yellow-300'>Star Cargo</h1>
            <p className='mt-4 text-lg'></p>
          </div>
          <div className='flex flex-col items-center justify-center mx-5'>
            <Card className='max-w-96 z-20'>
              <CardTitle className='text-lg font-medium px-5 py-0'>
                Утасны дугаар эсвэл трак кодоор хайх
              </CardTitle>
              <CardContent>
                <input
                  type='text'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='border border-gray-300 rounded-md p-2 w-full'
                />
                {error && <p className='text-red-500'>{error}</p>}
                {userData.length > 0 && (
                  <div className='mt-4'>
                    {userData.map(
                      (
                        user: { phoneNumber: string; trackingCode: string },
                        index: number
                      ) => (
                        <div key={index} className='mb-2'>
                          <p>Утасны дугаар: {user.phoneNumber}</p>
                          <p>Трак код: {user.trackingCode}</p>
                        </div>
                      )
                    )}
                    {userData.length === 0 && <p>Мэдээлэл олдсонгүй</p>}
                  </div>
                )}
                {loading && <p>Ачаалалж байна...</p>}
              </CardContent>
              <CardAction className='flex justify-end w-full px-5'>
                <button
                  className='bg-black text-white rounded-md p-2 w-full'
                  onClick={() => handleSearch({ phoneNumber })}
                >
                  Хайх
                </button>
              </CardAction>
            </Card>
          </div>
        </main>
      </div>
      <FooterSection />
    </>
  );
}
