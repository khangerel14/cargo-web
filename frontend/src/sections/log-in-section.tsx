'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

type CardProps = React.ComponentProps<typeof Card>;

export const LogInSection = ({ className, ...props }: CardProps) => {
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          phoneNumber,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.data.role));
        localStorage.setItem(
          'phoneNumber',
          JSON.stringify(response.data.data.user.phoneNumber)
        );
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        toast.success(response.data?.data?.message ?? 'Login successful!');
        router.push('/information');
      } else {
        toast.error(response?.data?.message ?? 'Login failed!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        toast.error(message ?? 'Login failed. Please check your credentials.');
      } else {
        console.error('Unexpected error:', error);
        toast.error('Something went wrong.');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-3 px-3'>
      <ToastContainer
        position='top-right'
        className={'z-50'}
        autoClose={3000}
      />
      <Card className={cn('max-w-[480px] w-full', className)} {...props}>
        <CardHeader>
          <CardTitle>Та нэвтэрнэ үү!</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='flex flex-col gap-2'>
            <h1>Утасны дугаар</h1>
            <input
              type='number'
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Утасны дугаар'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h1>Нууц үг</h1>
            <input
              type='text'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Нууц үг'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={handleLogin}>
            <Check /> Нэвтрэх
          </Button>
        </CardFooter>
      </Card>
      <div className='flex items-center text-sm text-gray-500 gap-2'>
        <p>Хэрэв та бүртгэлгүй бол бүртгүүлнэ үү!</p>
        <button
          className='text-black decoration-1 dark:text-white'
          onClick={() => router.push('/sign-up')}
        >
          Бүртгүүлэх
        </button>
      </div>
    </div>
  );
};
