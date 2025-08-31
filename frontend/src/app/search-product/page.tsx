import { SearchTable } from '@/sections/search-product';
import Image from 'next/image';

const Page = () => {
  return (
    <div className='relative'>
      <Image
        src='/image.jpg'
        width={1000}
        height={1000}
        alt='bg'
        className='w-full min-h-screen h-fit object-cover z-10'
      />
      <div className='absolute top-0 left-0 right-0 py-20 flex flex-col gap-10 items-center w-full min-h-screen pt-40 px-5'>
        <h1 className='font-semibold text-2xl text-center text-white'>
          Таны бүтээгдэхүүний мэдээлэл
        </h1>
        <div className='w-full flex flex-col items-center gap-5'>
          <SearchTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
