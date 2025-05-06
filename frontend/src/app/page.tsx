'use client';

import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card';
import { FooterSection } from '@/sections/footer-section';

export default function Home() {
  return (
    <>
      <div className='bg-[#dddff7] dark:bg-[#1a1a2e] text-gray-800 dark:text-gray-200 h-screen'>
        <main className='flex items-center justify-between pt-56 space-y-24 h-[700px] max-w-[950px] mx-auto gap-20 max-lg:flex-col'>
          <div className='flex flex-col items-center justify-center mx-5 text-center'>
            <h1 className='text-4xl font-bold'>Star Cargo</h1>
            <p className='mt-4 text-lg'>
              This is the home page of our application.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center mx-5'>
            <Card className='max-w-96'>
              <CardTitle className='text-lg font-medium px-5 py-0'>
                Утасны дугаар эсвэл трак кодоор хайх
              </CardTitle>
              <CardContent>
                <input
                  type='text'
                  className='border border-gray-300 rounded-md p-2 w-full'
                />
              </CardContent>
              <CardAction className='flex justify-end w-full px-5'>
                <button className='bg-black text-white rounded-md p-2 w-full'>
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
