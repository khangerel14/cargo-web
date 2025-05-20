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

interface ResetPasswordSectionProps extends CardProps {
  phoneNumber: string;
}

export const ResetPasswordSection = ({
  className,
  phoneNumber,
  ...props
}: ResetPasswordSectionProps) => {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          phone: phoneNumber,
          newPassword,
        }
      );
      if (response.status === 200) {
        toast.success(response.data?.data?.message ?? 'Login successful!');
        router.push('/');
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
      <Card className={cn('sm:w-[450px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Та нууц үг ээ шинэчлэнэ үү!</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='flex flex-col gap-2'>
            <h1>Шинэ нууц үг</h1>
            <input
              type='number'
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='Шинэ нууц үг'
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={handleResetPassword}>
            <Check /> Хадгалах
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
