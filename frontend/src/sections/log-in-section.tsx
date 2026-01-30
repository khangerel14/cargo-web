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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Утасны дугаарыг оруулна уу!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/auth`,
        {
          phoneNumber: phoneNumber.trim(),
          role: 'user',
        }
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem(
          'phoneNumber',
          JSON.stringify(response.data.data.user.phoneNumber)
        );
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.data.token || '')
        );

        const message =
          response.status === 200
            ? 'Нэвтэрлээ амжилттай!'
            : 'Хэрэглэгч амжилттай үүсгэгдлээ!';

        toast.success(message);

        setTimeout(() => {
          router.push('/information');
        }, 1500);
      } else {
        toast.error(response?.data?.message ?? 'Алдаа гарлаа!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message || 'Алдаа гарлаа. Дахин оролдоно уу.';
        toast.error(message);
      } else {
        console.error('Unexpected error:', error);
        toast.error('Ямар нэг алдаа гарлаа.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-3 px-3 w-full max-w-[450px]'>
      <ToastContainer
        position='top-right'
        className={'z-50'}
        autoClose={3000}
      />
      <Card className={cn('max-w-[450px] w-full', className)} {...props}>
        <CardHeader>
          <CardTitle>Та нэвтэрнэ үү!</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <h1>Утасны дугаар</h1>
              <input
                type='number'
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Утасны дугаар'
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                onKeyDown={handleKeyDown}
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </CardContent>
          <CardFooter className='mt-3'>
            <Button className='w-full' onClick={handleLogin}>
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Боловсруулж байна...
                </>
              ) : (
                <>
                  <Check className='w-4 h-4 mr-2' />
                  Нэвтрэх
                </>
              )}{' '}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
