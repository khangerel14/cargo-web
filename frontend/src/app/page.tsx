'use client';

import { ConnectAddressSection } from '@/sections/connect-address-section';
import { LinkOrder } from '@/sections/link-order';
import { ServiceSituationSection } from '@/sections/service-situation-section';

export default function Home() {
  return (
    <div className='bg-[#EAEBFA]'>
      <main className='pt-20 space-y-24'>
        <ServiceSituationSection />

        <ConnectAddressSection />

        <LinkOrder />
      </main>
    </div>
  );
}
