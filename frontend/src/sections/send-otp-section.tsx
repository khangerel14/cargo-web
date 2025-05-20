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
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

type CardProps = React.ComponentProps<typeof Card>;

interface SendOtpSectionProps extends CardProps {
  step: number;
  setStep: (value: number) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

export const SendOtpSection = ({
  step,
  setStep,
  className,
  phoneNumber,
  setPhoneNumber,
  ...props
}: SendOtpSectionProps) => {
  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
        {
          phone: phoneNumber,
        }
      );
      if (response.status === 200) {
        toast.success(response.data?.data?.message ?? 'Login successful!');
        setStep(step + 1);
      } else {
        toast.error(response?.data?.message ?? 'Login failed!');
      }
    } catch (error: unknown) {
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
          <CardTitle>Та нэвтрэх нууц үг солино уу!</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='flex flex-col gap-2'>
            <h1>Утасны дугаар</h1>
            <input
              type='number'
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Утасны дугаар'
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={handleSendOtp}>
            <Check /> Баталгаажуулах код илгээх
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
