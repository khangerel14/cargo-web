import { FooterSection } from '@/sections/footer-section';
import { LogInSection } from '@/sections/log-in-section';

const Page = () => {
  return (
    <>
      <div className='bg-[#EAEBFA] flex items-center justify-center w-full min-h-screen pt-20 dark:bg-[#1a1a2e]'>
        <LogInSection />
      </div>
      <FooterSection />
    </>
  );
};

export default Page;
