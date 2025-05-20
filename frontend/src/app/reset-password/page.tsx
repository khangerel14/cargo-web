'use client';

import { FooterSection } from '@/sections/footer-section';
import { ResetPasswordSection } from '@/sections/reset-password-password';
import { SendOtpSection } from '@/sections/send-otp-section';
import { VerifySection } from '@/sections/verify-section';
import { useState } from 'react';

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(0);

  return (
    <>
      <div className='bg-[#EAEBFA] flex items-center justify-center w-full min-h-screen pt-20 dark:bg-[#1a1a2e]'>
        {step === 0 && (
          <SendOtpSection
            step={step}
            setStep={setStep}
            setPhoneNumber={setPhoneNumber}
            phoneNumber={phoneNumber}
          />
        )}
        {step === 1 && (
          <VerifySection
            step={step}
            setStep={setStep}
            phoneNumber={phoneNumber}
          />
        )}
        {step === 2 && <ResetPasswordSection phoneNumber={phoneNumber} />}
      </div>
      <FooterSection />
    </>
  );
};

export default Page;
